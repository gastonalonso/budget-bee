import { FastifyPluginAsync } from 'fastify'

const guarded: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get(
    '/',
    { preHandler: fastify.jwtVerify },
    async function (request, reply) {
      return 'this route is guarded'
    },
  )
}

export default guarded
