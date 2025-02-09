import bcrypt from 'bcryptjs'
import { FastifyPluginAsync } from 'fastify'

import { prisma } from '../../../prisma'

// Define the interface for the request body
interface RegisterBody {
  email: string
  password: string
}

// Define the schema for the request body
const registerBodySchema = {
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: { type: 'string', format: 'email' },
    password: { type: 'string', minLength: 6 },
  },
}

const register: FastifyPluginAsync = async (fastify, opts) => {
  fastify.post<{ Body: RegisterBody }>(
    '/',
    {
      schema: {
        body: registerBodySchema,
      },
    },
    async (request, reply) => {
      const { email, password } = request.body

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10)

      // Create the user in the database
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      })

      return reply.send({ message: 'User registered successfully', user })
    },
  )
}

export default register
