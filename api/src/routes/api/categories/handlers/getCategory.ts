import { FastifyReply, FastifyRequest } from 'fastify'

import { prisma } from '../../../../prisma'

export interface GetCategoryParams {
  categoryId: string
}

export const getCategoryParamsSchema = {
  type: 'object',
  required: ['categoryId'],
  properties: {
    categoryId: { type: 'string' },
  },
}

export const getCategory = async (
  request: FastifyRequest<{ Params: GetCategoryParams }>,
  reply: FastifyReply,
) => {
  const { userId } = request.user
  const { categoryId } = request.params

  const category = await prisma.category.findUnique({
    where: {
      id: parseInt(categoryId),
      userId: userId,
    },
  })

  if (!category) {
    return reply.status(404).send({ message: 'Category not found' })
  }

  return category
}
