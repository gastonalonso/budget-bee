import { FastifyPluginAsync } from 'fastify'

import {
  CreateAccountBody,
  createAccount,
  createAccountBodySchema,
} from './handlers/createAccount'
import {
  DeleteAccountParams,
  deleteAccount,
  deleteAccountParamsSchema,
} from './handlers/deleteAccount'
import {
  GetAccountParams,
  getAccount,
  getAccountParamsSchema,
} from './handlers/getAccount'
import { getAccounts } from './handlers/getAccounts'
import {
  UpdateAccountBody,
  UpdateAccountParams,
  updateAccount,
  updateAccountBodySchema,
  updateAccountParamsSchema,
} from './handlers/updateAccount'

const register: FastifyPluginAsync = async (fastify, opts) => {
  fastify.get('/', { onRequest: fastify.authenticate }, getAccounts)

  fastify.get<{ Params: GetAccountParams }>(
    '/:accountId',
    {
      schema: { params: getAccountParamsSchema },
      onRequest: fastify.authenticate,
    },
    getAccount,
  )

  fastify.post<{ Body: CreateAccountBody }>(
    '/',
    {
      schema: { body: createAccountBodySchema },
      onRequest: fastify.authenticate,
    },
    createAccount,
  )

  fastify.put<{ Params: UpdateAccountParams; Body: UpdateAccountBody }>(
    '/:accountId',
    {
      schema: {
        params: updateAccountParamsSchema,
        body: updateAccountBodySchema,
      },
      onRequest: fastify.authenticate,
    },
    updateAccount,
  )

  fastify.delete<{ Params: DeleteAccountParams }>(
    '/:accountId',
    {
      schema: { params: deleteAccountParamsSchema },
      onRequest: fastify.authenticate,
    },
    deleteAccount,
  )
}

export default register
