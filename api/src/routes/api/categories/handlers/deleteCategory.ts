import { FastifyReply, FastifyRequest } from 'fastify'

import { prisma } from '../../../../prisma'

export interface DeleteCategoryParams {
  categoryId: string
}

export const deleteCategoryParamsSchema = {
  type: 'object',
  required: ['categoryId'],
  properties: {
    categoryId: { type: 'string' },
  },
}

export const deleteCategory = async (
  request: FastifyRequest<{ Params: DeleteCategoryParams }>,
  reply: FastifyReply,
) => {
  const { userId } = request.user
  const { categoryId } = request.params

  await prisma.category.delete({
    where: {
      id: parseInt(categoryId),
      userId: userId,
    },
  })

  return reply.status(204).send()
}
