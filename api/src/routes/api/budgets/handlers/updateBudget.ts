import { FastifyReply, FastifyRequest } from 'fastify'

import { prisma } from '../../../../prisma'

export interface UpdateBudgetParams {
  budgetId: string
}

export interface UpdateBudgetBody {
  amount?: number
  categoryId?: number
  date?: string
}

export const updateBudgetParamsSchema = {
  type: 'object',
  required: ['budgetId'],
  properties: {
    budgetId: { type: 'string' },
  },
}

export const updateBudgetBodySchema = {
  type: 'object',
  properties: {
    amount: {
      type: 'number',
      minimum: 0,
    },
    categoryId: {
      type: 'number',
    },
    date: {
      type: 'string',
      format: 'date-time',
    },
  },
}

export const updateBudget = async (
  request: FastifyRequest<{
    Params: UpdateBudgetParams
    Body: UpdateBudgetBody
  }>,
  reply: FastifyReply,
) => {
  const { userId } = request.user
  const { budgetId } = request.params
  const { amount, categoryId, date } = request.body

  const updateData: any = {}
  if (amount !== undefined) updateData.amount = amount
  if (categoryId !== undefined) updateData.categoryId = categoryId
  if (date !== undefined) updateData.date = new Date(date)

  const budget = await prisma.budget.update({
    where: {
      id: parseInt(budgetId),
      userId: userId,
    },
    data: updateData,
  })

  return budget
}
