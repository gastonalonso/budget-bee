import { AccountType } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'

import { prisma } from '../../../../prisma'

export interface UpdateAccountParams {
  accountId: string
}

export interface UpdateAccountBody {
  name?: string
  type?: AccountType
  initialBalance?: number
}

export const updateAccountParamsSchema = {
  type: 'object',
  required: ['accountId'],
  properties: {
    accountId: { type: 'string' },
  },
}

export const updateAccountBodySchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      minLength: 1,
    },
    type: {
      type: 'string',
      enum: Object.values(AccountType),
    },
    initialBalance: {
      type: 'number',
    },
  },
}

export const updateAccount = async (
  request: FastifyRequest<{
    Params: UpdateAccountParams
    Body: UpdateAccountBody
  }>,
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

  const updatedAccount = await prisma.account.update({
    where: { id: account.id },
    data: request.body,
  })

  return updatedAccount
}
