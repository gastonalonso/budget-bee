import { FastifyReply, FastifyRequest } from 'fastify'

import { prisma } from '../../../../prisma'

export interface DeleteTransactionParams {
  transactionId: string
}

export const deleteTransactionParamsSchema = {
  type: 'object',
  required: ['transactionId'],
  properties: {
    transactionId: { type: 'string' },
  },
}

export const deleteTransaction = async (
  request: FastifyRequest<{ Params: DeleteTransactionParams }>,
  reply: FastifyReply,
) => {
  const transactionId = parseInt(request.params.transactionId, 10)

  const transaction = await prisma.transaction.findFirst({
    where: {
      id: transactionId,
      userId: request.user.userId,
    },
  })

  if (!transaction) {
    throw reply.notFound('Transaction not found')
  }

  await prisma.transaction.delete({
    where: { id: transaction.id },
  })

  return { success: true }
}
