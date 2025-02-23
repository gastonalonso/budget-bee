import { FastifyPluginAsync } from 'fastify'
import { google } from 'googleapis'

import { GoogleSheetsError } from '../../../errors/GoogleSheetsError'

const credentials = JSON.parse(process.env.GOOGLE_SHEETS_CREDENTIALS ?? '{}')

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
})

const sheets = google.sheets({ version: 'v4', auth })

const spreadsheetId = '1jVy_nHP8CMXmb_RZaxoi2_Mnnu0SSxSTffrLqsyXjzM'
const categoriesRange = 'START HERE!DR4:DX230'
const bankAccountsRange = 'START HERE!BD7:BO37'
const creditAccountsRange = 'START HERE!CH7:CS45'
const transactionsRange = 'Transactions!B5:G'

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

  fastify.post('/', async (request, reply) => {
    try {
      const [categories, bankAccounts, creditAccounts, transactions] =
        await Promise.all([
          fetchFlattenedData(categoriesRange, 'Failed to fetch categories'),
          fetchFlattenedData(
            bankAccountsRange,
            'Failed to fetch bank accounts',
          ),
          fetchFlattenedData(
            creditAccountsRange,
            'Failed to fetch credit accounts',
          ),
          fetchMatrixData(transactionsRange, 'Failed to fetch transactions'),
        ])

      const accounts = [...bankAccounts, ...creditAccounts]

      return {
        categories,
        accounts,
        transactions,
      }
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
  })
}

export default sync
