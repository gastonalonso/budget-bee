import { FastifyPluginAsync } from 'fastify'

const verify: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post('/', async function (request, reply) {
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.status(401).send({ message: 'Token is invalid' })
      return
    }

    reply.send({ message: 'Token is valid' })
  })
}

export default verify
