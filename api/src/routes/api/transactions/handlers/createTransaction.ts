import { FastifyReply, FastifyRequest } from 'fastify'

import { prisma } from '../../../../prisma'

export interface CreateTransactionBody {
  amount: number
  description: string
  date: string
  categoryId: number
  accountId: number
}

export const createTransactionBodySchema = {
  type: 'object',
  required: ['amount', 'description', 'date', 'categoryId', 'accountId'],
  properties: {
    amount: { type: 'number' },
    description: { type: 'string', minLength: 1 },
    date: { type: 'string', format: 'date-time' },
    categoryId: { type: 'number' },
    accountId: { type: 'number' },
  },
}

export const createTransaction = async (
  request: FastifyRequest<{ Body: CreateTransactionBody }>,
  reply: FastifyReply,
) => {
  const transaction = await prisma.transaction.create({
    data: {
      ...request.body,
      date: new Date(request.body.date),
      userId: request.user.userId,
    },
  })

  return transaction
}
