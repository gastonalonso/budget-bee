import { FastifyReply, FastifyRequest } from 'fastify'

import { prisma } from '../../../../prisma'

export interface CreateBudgetBody {
  amount: number
  categoryId: number
  date: string
}

export const createBudgetBodySchema = {
  type: 'object',
  required: ['amount', 'categoryId', 'date'],
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

export const createBudget = async (
  request: FastifyRequest<{ Body: CreateBudgetBody }>,
  reply: FastifyReply,
) => {
  const { userId } = request.user
  const { amount, categoryId, date } = request.body

  const budget = await prisma.budget.create({
    data: {
      amount,
      categoryId,
      date: new Date(date),
      userId,
    },
  })

  return budget
}
