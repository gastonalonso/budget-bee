import { FastifyReply, FastifyRequest } from 'fastify'

import { prisma } from '../../../../prisma'

export interface UpdateTransactionParams {
  transactionId: string
}

export interface UpdateTransactionBody {
  amount?: number
  description?: string
  date?: string
  categoryId?: number
  accountId?: number
}

export const updateTransactionParamsSchema = {
  type: 'object',
  required: ['transactionId'],
  properties: {
    transactionId: { type: 'string' },
  },
}

export const updateTransactionBodySchema = {
  type: 'object',
  properties: {
    amount: { type: 'number' },
    description: { type: 'string', minLength: 1 },
    date: { type: 'string', format: 'date-time' },
    categoryId: { type: 'number' },
    accountId: { type: 'number' },
  },
}

export const updateTransaction = async (
  request: FastifyRequest<{
    Params: UpdateTransactionParams
    Body: UpdateTransactionBody
  }>,
  reply: FastifyReply,
) => {
  const transactionId = parseInt(request.params.transactionId, 10)
  const oldTransaction = await prisma.transaction.findFirst({
    where: {
      id: transactionId,
      userId: request.user.userId,
    },
  })

  if (!oldTransaction) {
    throw reply.notFound('Transaction not found')
  }

  const updatedTransaction = await prisma.transaction.update({
    where: { id: oldTransaction.id },
    data: {
      ...request.body,
      date: request.body.date ? new Date(request.body.date) : undefined,
    },
  })

  return updatedTransaction
}
