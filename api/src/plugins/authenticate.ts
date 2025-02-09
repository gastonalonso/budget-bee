import { FastifyReply, FastifyRequest } from 'fastify'
import fastifyPlugin from 'fastify-plugin'

export default fastifyPlugin(async (fastify) => {
  fastify.decorate(
    'authenticate',
    async (request: FastifyRequest, reply: FastifyReply) => {
      // Check if the session contains a userId
      if (!request.session.userId) {
        return reply.status(401).send({ message: 'Unauthorized' })
      }
    },
  )
})

declare module 'fastify' {
  export interface FastifyInstance {
    authenticate(request: FastifyRequest, reply: FastifyReply): Promise<void>
  }
}
