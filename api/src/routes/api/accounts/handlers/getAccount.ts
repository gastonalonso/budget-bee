import { FastifyReply, FastifyRequest } from 'fastify'

import { prisma } from '../../../../prisma'

export interface GetAccountParams {
  accountId: string
}

export const getAccountParamsSchema = {
  type: 'object',
  required: ['accountId'],
  properties: {
    categoryId: { type: 'string' },
  },
}

export const getAccount = async (
  request: FastifyRequest<{ Params: GetAccountParams }>,
  reply: FastifyReply,
) => {
  const { userId } = request.user
  const { accountId } = request.params

  const account = await prisma.account.findFirst({
    where: {
      id: parseInt(accountId),
      userId,
    },
  })

  if (!account) {
    return reply.status(404).send({ message: 'Category not found' })
  }

  return account
}
