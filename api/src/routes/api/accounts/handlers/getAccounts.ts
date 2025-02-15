import { FastifyReply, FastifyRequest } from 'fastify'

import { prisma } from '../../../../prisma'

export const getAccounts = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const { userId } = request.user

  const accounts = await prisma.account.findMany({
    where: { userId },
  })
  return accounts
}
