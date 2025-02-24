import { FastifyPluginAsync } from 'fastify'

import {
  CreateBudgetBody,
  createBudget,
  createBudgetBodySchema,
} from './handlers/createBudget'
import {
  DeleteBudgetParams,
  deleteBudget,
  deleteBudgetParamsSchema,
} from './handlers/deleteBudget'
import {
  GetBudgetParams,
  getBudget,
  getBudgetParamsSchema,
} from './handlers/getBudget'
import { getBudgets } from './handlers/getBudgets'
import {
  UpdateBudgetBody,
  UpdateBudgetParams,
  updateBudget,
  updateBudgetBodySchema,
  updateBudgetParamsSchema,
} from './handlers/updateBudget'

const register: FastifyPluginAsync = async (fastify, opts) => {
  fastify.get('/', { onRequest: fastify.authenticate }, getBudgets)

  fastify.get<{ Params: GetBudgetParams }>(
    '/:budgetId',
    {
      schema: { params: getBudgetParamsSchema },
      onRequest: fastify.authenticate,
    },
    getBudget,
  )

  fastify.post<{ Body: CreateBudgetBody }>(
    '/',
    {
      schema: { body: createBudgetBodySchema },
      onRequest: fastify.authenticate,
    },
    createBudget,
  )

  fastify.put<{ Params: UpdateBudgetParams; Body: UpdateBudgetBody }>(
    '/:budgetId',
    {
      schema: {
        params: updateBudgetParamsSchema,
        body: updateBudgetBodySchema,
      },
      onRequest: fastify.authenticate,
    },
    updateBudget,
  )

  fastify.delete<{ Params: DeleteBudgetParams }>(
    '/:budgetId',
    {
      schema: { params: deleteBudgetParamsSchema },
      onRequest: fastify.authenticate,
    },
    deleteBudget,
  )
}

export default register
