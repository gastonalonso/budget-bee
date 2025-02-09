import AutoLoad, { AutoloadPluginOptions } from '@fastify/autoload'
import fastifyCookie from '@fastify/cookie'
import fastifyJwt from '@fastify/jwt'
import { FastifyPluginAsync, FastifyServerOptions } from 'fastify'
import { join } from 'node:path'

export interface AppOptions
  extends FastifyServerOptions,
    Partial<AutoloadPluginOptions> {}
// Pass --options via CLI arguments in command to enable these options.
const options: AppOptions = {}

const app: FastifyPluginAsync<AppOptions> = async (
  fastify,
  opts,
): Promise<void> => {
  // Fastify Cookie Plugin
  void fastify.register(fastifyCookie)
  // Fastify JWT Plugin
  void fastify.register(fastifyJwt, {
    secret: 'a7f8d3e4c2b9a1e6f5d8c3b2a9e4f7d6',
    cookie: {
      cookieName: 'token',
      signed: false,
    },
  })

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'plugins'),
    options: opts,
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'routes'),
    options: opts,
  })
}

export default app
export { app, options }
