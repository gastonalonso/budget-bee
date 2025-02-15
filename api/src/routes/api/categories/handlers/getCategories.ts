import { FastifyReply, FastifyRequest } from 'fastify'

import { prisma } from '../../../../prisma'

export const getCategories = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const { userId } = request.user

  const categories = await prisma.category.findMany({
    where: {
      userId: userId,
    },
  })

  return categories
}
