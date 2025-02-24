import { FastifyReply, FastifyRequest } from 'fastify'

import { prisma } from '../../../../prisma'

export interface GetBudgetParams {
  budgetId: string
}

export const getBudgetParamsSchema = {
  type: 'object',
  required: ['budgetId'],
  properties: {
    budgetId: { type: 'string' },
  },
}

export const getBudget = async (
  request: FastifyRequest<{ Params: GetBudgetParams }>,
  reply: FastifyReply,
) => {
  const { userId } = request.user
  const { budgetId } = request.params

  const budget = await prisma.budget.findUnique({
    where: {
      id: parseInt(budgetId),
      userId,
    },
    include: {
      category: true,
    },
  })

  if (!budget) {
    return reply.status(404).send({ message: 'Budget not found' })
  }

  return budget
}
