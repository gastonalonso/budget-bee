import { FastifyPluginAsync } from 'fastify'

import {
  CreateCategoryBody,
  createCategory,
  createCategoryBodySchema,
} from './handlers/createCategory'
import {
  DeleteCategoryParams,
  deleteCategory,
  deleteCategoryParamsSchema,
} from './handlers/deleteCategory'
import { getCategories } from './handlers/getCategories'
import {
  GetCategoryParams,
  getCategory,
  getCategoryParamsSchema,
} from './handlers/getCategory'
import {
  UpdateCategoryBody,
  UpdateCategoryParams,
  updateCategory,
  updateCategoryBodySchema,
  updateCategoryParamsSchema,
} from './handlers/updateCategory'

const register: FastifyPluginAsync = async (fastify, opts) => {
  fastify.get('/', { onRequest: fastify.authenticate }, getCategories)

  fastify.get<{ Params: GetCategoryParams }>(
    '/:categoryId',
    {
      schema: { params: getCategoryParamsSchema },
      onRequest: fastify.authenticate,
    },
    getCategory,
  )

  fastify.post<{ Body: CreateCategoryBody }>(
    '/',
    {
      schema: { body: createCategoryBodySchema },
      onRequest: fastify.authenticate,
    },
    createCategory,
  )

  fastify.put<{ Params: UpdateCategoryParams; Body: UpdateCategoryBody }>(
    '/:categoryId',
    {
      schema: {
        params: updateCategoryParamsSchema,
        body: updateCategoryBodySchema,
      },
      onRequest: fastify.authenticate,
    },
    updateCategory,
  )

  fastify.delete<{ Params: DeleteCategoryParams }>(
    '/:categoryId',
    {
      schema: { params: deleteCategoryParamsSchema },
      onRequest: fastify.authenticate,
    },
    deleteCategory,
  )
}

export default register
