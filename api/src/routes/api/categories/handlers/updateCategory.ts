import { CategoryType } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'

import { prisma } from '../../../../prisma'

export interface UpdateCategoryParams {
  categoryId: string
}

export interface UpdateCategoryBody {
  name: string
  type?: CategoryType
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
    type: {
      type: 'string',
      enum: ['EXPENSE', 'INCOME'],
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
  const { name, type } = request.body

  const category = await prisma.category.update({
    where: {
      id: parseInt(categoryId),
      userId: userId,
    },
    data: {
      name,
      ...(type && { type }),
    },
  })

  return category
}
