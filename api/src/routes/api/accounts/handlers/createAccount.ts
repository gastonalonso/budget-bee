import { AccountType } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'

import { prisma } from '../../../../prisma'

export interface CreateAccountBody {
  name: string
  type: AccountType
  balance?: number
}

export const createAccountBodySchema = {
  type: 'object',
  required: ['name', 'type'],
  properties: {
    name: {
      type: 'string',
      minLength: 1,
    },
    type: {
      type: 'string',
      enum: Object.values(AccountType),
    },
    balance: {
      type: 'number',
    },
  },
}

export const createAccount = async (
  request: FastifyRequest<{ Body: CreateAccountBody }>,
  reply: FastifyReply,
) => {
  const account = await prisma.account.create({
    data: {
      ...request.body,
      balance: request.body.balance || 0,
      userId: request.user.userId,
    },
  })
  return account
}
