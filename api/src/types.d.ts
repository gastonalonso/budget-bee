import 'fastify'

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: { userId: number }
  }
}
