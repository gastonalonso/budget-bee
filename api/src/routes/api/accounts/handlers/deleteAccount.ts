import { FastifyReply, FastifyRequest } from 'fastify'

import { prisma } from '../../../../prisma'

export interface DeleteAccountParams {
  accountId: string
}

export const deleteAccountParamsSchema = {
  type: 'object',
  required: ['accountId'],
  properties: {
    accountId: { type: 'string' },
  },
}

export const deleteAccount = async (
  request: FastifyRequest<{ Params: DeleteAccountParams }>,
  reply: FastifyReply,
) => {
  const accountId = parseInt(request.params.accountId, 10)

  const account = await prisma.account.findFirst({
    where: {
      id: accountId,
      userId: request.user.userId,
    },
  })

  if (!account) {
    throw reply.notFound('Account not found')
  }

  await prisma.account.delete({
    where: { id: account.id },
  })

  return { success: true }
}
