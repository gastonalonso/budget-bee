import bcrypt from 'bcryptjs'
import { FastifyPluginAsync } from 'fastify'

import { prisma } from '../../../prisma'

// Define the interface for the request body
interface LoginBody {
  email: string
  password: string
}

// Define the schema for the request body
const loginBodySchema = {
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: { type: 'string', format: 'email' },
    password: { type: 'string', minLength: 6 },
  },
}

const login: FastifyPluginAsync = async (fastify, opts) => {
  fastify.post<{ Body: LoginBody }>(
    '/',
    {
      schema: {
        body: loginBodySchema,
      },
    },
    async (request, reply) => {
      const { email, password } = request.body

      // Find the user by email
      const user = await prisma.user.findUnique({
        where: { email },
      })

      if (!user) {
        return reply.status(401).send({ message: 'Invalid email or password' })
      }

      // Compare the provided password with the hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password)

      if (!isPasswordValid) {
        return reply.status(401).send({ message: 'Invalid email or password' })
      }

      // Create a session for the user
      request.session.userId = user.id

      return reply.send({ message: 'Logged in successfully' })
    },
  )
}

export default login
