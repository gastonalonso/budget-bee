import { FastifyReply, FastifyRequest } from 'fastify'

import { prisma } from '../../../../prisma'

export interface GetTransactionParams {
  transactionId: string
}

export const getTransactionParamsSchema = {
  type: 'object',
  required: ['transactionId'],
  properties: {
    transactionId: { type: 'string' },
  },
}

export const getTransaction = async (
  request: FastifyRequest<{ Params: GetTransactionParams }>,
  reply: FastifyReply,
) => {
  const { userId } = request.user
  const transactionId = parseInt(request.params.transactionId, 10)

  const transaction = await prisma.transaction.findFirst({
    where: {
      id: transactionId,
      userId,
    },
  })

  if (!transaction) {
    return reply.notFound('Transaction not found')
  }

  return transaction
}
