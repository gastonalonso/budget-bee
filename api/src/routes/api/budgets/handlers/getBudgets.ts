import { FastifyReply, FastifyRequest } from 'fastify'

import { prisma } from '../../../../prisma'

export const getBudgets = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const { userId } = request.user

  const budgets = await prisma.budget.findMany({
    where: { userId },
  })

  return budgets
}
