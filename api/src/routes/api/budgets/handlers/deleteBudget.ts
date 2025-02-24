import { FastifyReply, FastifyRequest } from 'fastify'

import { prisma } from '../../../../prisma'

export interface DeleteBudgetParams {
  budgetId: string
}

export const deleteBudgetParamsSchema = {
  type: 'object',
  required: ['budgetId'],
  properties: {
    budgetId: { type: 'string' },
  },
}

export const deleteBudget = async (
  request: FastifyRequest<{ Params: DeleteBudgetParams }>,
  reply: FastifyReply,
) => {
  const { userId } = request.user
  const { budgetId } = request.params

  await prisma.budget.delete({
    where: {
      id: parseInt(budgetId),
      userId: userId,
    },
  })

  return reply.status(204).send()
}
