import { FastifyReply, FastifyRequest } from 'fastify'

import { prisma } from '../../../../prisma'

export interface UpdateCategoryParams {
  categoryId: string
}

export interface UpdateCategoryBody {
  name: string
}

export const updateCategoryParamsSchema = {
  type: 'object',
  required: ['categoryId'],
  properties: {
    categoryId: { type: 'string' },
  },
}

export const updateCategoryBodySchema = {
  type: 'object',
  required: ['name'],
  properties: {
    name: {
      type: 'string',
      minLength: 1,
    },
  },
}

export const updateCategory = async (
  request: FastifyRequest<{
    Params: UpdateCategoryParams
    Body: UpdateCategoryBody
  }>,
  reply: FastifyReply,
) => {
  const { userId } = request.user
  const { categoryId } = request.params
  const { name } = request.body

  const category = await prisma.category.update({
    where: {
      id: parseInt(categoryId),
      userId: userId,
    },
    data: {
      name,
    },
  })

  return category
}
