import { FastifyPluginAsync } from 'fastify'

const logout: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post('/', async function (request, reply) {
    reply.clearCookie('token', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
    })
    reply.status(200).send({ message: 'Logout successful' })
  })
}

export default logout
