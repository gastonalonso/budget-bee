import { AccountType, CategoryType, TransactionType } from '@prisma/client'
import { FastifyPluginAsync } from 'fastify'
import { google } from 'googleapis'

import { GoogleSheetsError } from '../../../errors/GoogleSheetsError'
import { prisma } from '../../../prisma'

const credentials = JSON.parse(process.env.GOOGLE_SHEETS_CREDENTIALS ?? '{}')

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
})

const sheets = google.sheets({ version: 'v4', auth })

const spreadsheetId = '1jVy_nHP8CMXmb_RZaxoi2_Mnnu0SSxSTffrLqsyXjzM'
const expenseCategoriesRange = 'START HERE!DR4:DX230'
const incomeCategoriesRange = 'START HERE!FN7:GB26'
const bankAccountsRange = 'START HERE!BD7:BO37'
const creditAccountsRange = 'START HERE!CH7:CS45'
const transactionsRange = 'Transactions!B5:G'
const budgetDatesRange = 'Budget!G6:6'
const budgetsRange = 'Budget!F13:S'

const sync: FastifyPluginAsync = async (fastify, opts) => {
  async function fetchMatrixData(range: string, errorMessage: string) {
    try {
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range,
      })

      if (!response.data.values) {
        throw new GoogleSheetsError(`No data found for range: ${range}`, range)
      }

      return response.data.values.filter((value) => value.length)
    } catch (error) {
      if (error instanceof GoogleSheetsError) {
        throw error
      }
      throw new GoogleSheetsError(errorMessage, range, error)
    }
  }

  const fetchFlattenedData = async (range: string, errorMessage: string) => {
    const matrix = await fetchMatrixData(range, errorMessage)
    return matrix.flat()
  }

  fastify.post(
    '/',
    { onRequest: fastify.authenticate },
    async (request, reply) => {
      try {
        const [
          expenseCategories,
          incomeCategories,
          bankAccounts,
          creditAccounts,
          transactions,
          budgetDates,
          budgetsMatrix,
        ] = await Promise.all([
          fetchFlattenedData(
            expenseCategoriesRange,
            'Failed to fetch categories',
          ),
          fetchFlattenedData(
            incomeCategoriesRange,
            'Failed to fetch income categories',
          ),
          fetchFlattenedData(
            bankAccountsRange,
            'Failed to fetch bank accounts',
          ),
          fetchFlattenedData(
            creditAccountsRange,
            'Failed to fetch credit accounts',
          ),
          fetchMatrixData(transactionsRange, 'Failed to fetch transactions'),
          fetchFlattenedData(budgetDatesRange, 'Failed to fetch budget dates'),
          fetchMatrixData(budgetsRange, 'Failed to fetch budgets'),
        ])

        const budgets = budgetsMatrix
          .map((budget) => {
            const [category, ...amounts] = budget
            return amounts.map((amount, index) => ({
              category,
              date: budgetDates[index],
              amount,
            }))
          })
          .filter((budget) => budget.length)
          .flat()

        const accounts = [...bankAccounts, ...creditAccounts]

        const userId = request.user.userId

        await prisma.$transaction(async (tx) => {
          // Delete existing categories and accounts
          await tx.transaction.deleteMany({ where: { userId } })
          await tx.budget.deleteMany({ where: { userId } })
          await tx.category.deleteMany({ where: { userId } })
          await tx.account.deleteMany({ where: { userId } })

          const categories = [
            ...expenseCategories.map((name) => ({
              name,
              type: CategoryType.EXPENSE,
            })),
            ...incomeCategories.map((name) => ({
              name: `-- Income -- ${name}`,
              type: CategoryType.INCOME,
            })),
            // hardcoded categories
            ...['-- Credit Card Bill Payment --'].map((name) => ({
              name,
              type: CategoryType.EXPENSE,
            })),
          ]

          // Bulk create categories
          const categoryData = categories.map(({ name, type }) => ({
            name,
            type,
            userId,
          }))

          await tx.category.createMany({
            data: categoryData,
          })

          // Bulk create accounts
          const accountData = accounts
            .filter((name): name is string => Boolean(name.trim()))
            .map((name) => ({
              name,
              userId,
              type: bankAccounts.includes(name)
                ? AccountType.BANK
                : AccountType.CREDIT_CARD,
              initialBalance: 0,
            }))

          await tx.account.createMany({
            data: accountData,
          })

          // Get fresh categories and accounts for reference
          const dbCategories = await tx.category.findMany({ where: { userId } })
          const dbAccounts = await tx.account.findMany({ where: { userId } })

          // Create new transactions from sheet data
          const transactionData = transactions
            .map(([date, description, category, account, amount, type]) => {
              const categoryId = dbCategories.find(
                (c) => c.name === category,
              )?.id
              const accountId = dbAccounts.find((a) => a.name === account)?.id

              if (!categoryId || !accountId) return null

              return {
                date: new Date(date),
                description,
                amount: Number(amount.replace(/[$,]/g, '')),
                type:
                  type === 'Inflow'
                    ? TransactionType.INFLOW
                    : TransactionType.OUTFLOW,
                userId,
                categoryId,
                accountId,
              }
            })
            .filter((t): t is NonNullable<typeof t> => t !== null)

          await tx.transaction.createMany({
            data: transactionData,
          })

          // Create new budgets
          const budgetData = budgets
            .map((budget) => {
              const categoryId = dbCategories.find(
                (c) => c.name === budget.category,
              )?.id
              if (!categoryId || !budget.amount) return null

              return {
                amount: Number(budget.amount.replace(/[$,]/g, '')),
                date: new Date(budget.date),
                userId,
                categoryId,
              }
            })
            .filter((b): b is NonNullable<typeof b> => b !== null)

          await tx.budget.createMany({
            data: budgetData,
          })
        })

        return { success: true }
      } catch (error) {
        if (error instanceof GoogleSheetsError) {
          fastify.log.error({
            error: error.message,
            range: error.range,
            cause: error.cause,
          })
          reply.status(500).send({
            message: error.message,
            range: error.range,
          })
          return
        }

        fastify.log.error(error)
        reply
          .status(500)
          .send({ message: 'An unexpected error occurred while syncing data' })
      }
    },
  )
}

export default sync
