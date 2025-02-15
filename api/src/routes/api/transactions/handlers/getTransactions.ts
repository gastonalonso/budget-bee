import { FastifyReply, FastifyRequest } from 'fastify'

import { prisma } from '../../../../prisma'

export const getTransactions = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const { userId } = request.user

  const transactions = await prisma.transaction.findMany({
    where: { userId },
  })
  return transactions
}
