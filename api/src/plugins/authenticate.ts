import { FastifyReply, FastifyRequest } from 'fastify'
import fastifyPlugin from 'fastify-plugin'

export default fastifyPlugin(async (fastify) => {
  fastify.decorate(
    'authenticate',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify()
      } catch {
        reply.status(401).send({ message: 'Unauthorized' })
      }
    },
  )
})

declare module 'fastify' {
  export interface FastifyInstance {
    authenticate(request: FastifyRequest, reply: FastifyReply): Promise<void>
  }
}
