import { FastifyReply, FastifyRequest } from 'fastify'

import { prisma } from '../../../../prisma'

export interface CreateCategoryBody {
  name: string
}

export const createCategoryBodySchema = {
  type: 'object',
  required: ['name'],
  properties: {
    name: {
      type: 'string',
      minLength: 1,
    },
  },
}

export const createCategory = async (
  request: FastifyRequest<{ Body: CreateCategoryBody }>,
  reply: FastifyReply,
) => {
  const { userId } = request.user
  const { name } = request.body

  const category = await prisma.category.create({
    data: {
      name,
      userId,
    },
  })

  return category
}
