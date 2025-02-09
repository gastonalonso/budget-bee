import { Session } from '@fastify/session'
import 'fastify'

declare module 'fastify' {
  interface Session {
    userId?: number
  }
}
