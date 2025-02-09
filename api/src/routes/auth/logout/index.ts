import { FastifyPluginAsync } from 'fastify'

const logout: FastifyPluginAsync = async (fastify, opts) => {
  fastify.post('/', async (request, reply) => {
    request.session.destroy((err) => {
      if (err) {
        return reply
          .status(500)
          .send({ message: 'Could not log out, please try again' })
      }
      return reply.send({ message: 'Logged out successfully' })
    })
  })
}

export default logout
