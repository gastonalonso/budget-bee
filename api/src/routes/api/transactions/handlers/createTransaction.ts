import { TransactionType } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'

import { prisma } from '../../../../prisma'

export interface CreateTransactionBody {
  amount: number
  type: 'INFLOW' | 'OUTFLOW'
  description: string
  date: string
  categoryId: number
  accountId: number
}

export const createTransactionBodySchema = {
  type: 'object',
  required: [
    'amount',
    'type',
    'description',
    'date',
    'categoryId',
    'accountId',
  ],
  properties: {
    amount: { type: 'number' },
    type: { type: 'string', enum: Object.values(TransactionType) },
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
