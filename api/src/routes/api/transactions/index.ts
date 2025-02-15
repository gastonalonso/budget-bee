import { FastifyPluginAsync } from 'fastify'

import {
  CreateTransactionBody,
  createTransaction,
  createTransactionBodySchema,
} from './handlers/createTransaction'
import {
  DeleteTransactionParams,
  deleteTransaction,
  deleteTransactionParamsSchema,
} from './handlers/deleteTransaction'
import {
  GetTransactionParams,
  getTransaction,
  getTransactionParamsSchema,
} from './handlers/getTransaction'
import { getTransactions } from './handlers/getTransactions'
import {
  UpdateTransactionBody,
  UpdateTransactionParams,
  updateTransaction,
  updateTransactionBodySchema,
  updateTransactionParamsSchema,
} from './handlers/updateTransaction'

const register: FastifyPluginAsync = async (fastify, opts) => {
  fastify.get('/', { onRequest: fastify.authenticate }, getTransactions)

  fastify.get<{ Params: GetTransactionParams }>(
    '/:transactionId',
    {
      schema: { params: getTransactionParamsSchema },
      onRequest: fastify.authenticate,
    },
    getTransaction,
  )

  fastify.post<{ Body: CreateTransactionBody }>(
    '/',
    {
      schema: { body: createTransactionBodySchema },
      onRequest: fastify.authenticate,
    },
    createTransaction,
  )

  fastify.put<{ Params: UpdateTransactionParams; Body: UpdateTransactionBody }>(
    '/:transactionId',
    {
      schema: {
        params: updateTransactionParamsSchema,
        body: updateTransactionBodySchema,
      },
      onRequest: fastify.authenticate,
    },
    updateTransaction,
  )

  fastify.delete<{ Params: DeleteTransactionParams }>(
    '/:transactionId',
    {
      schema: { params: deleteTransactionParamsSchema },
      onRequest: fastify.authenticate,
    },
    deleteTransaction,
  )
}

export default register
