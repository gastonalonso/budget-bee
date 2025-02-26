import { CategoryType } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'

import { prisma } from '../../../../prisma'

export interface CreateCategoryBody {
  name: string
  type: CategoryType
}

export const createCategoryBodySchema = {
  type: 'object',
  required: ['name', 'type'],
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

export const createCategory = async (
  request: FastifyRequest<{ Body: CreateCategoryBody }>,
  reply: FastifyReply,
) => {
  const { userId } = request.user
  const { name, type } = request.body

  const category = await prisma.category.create({
    data: {
      name,
      type,
      userId,
    },
  })

  return category
}
