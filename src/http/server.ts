import fastify from 'fastify'
import {
  type ZodTypeProvider,
  validatorCompiler,
  serializerCompiler,
} from 'fastify-type-provider-zod'
import { z } from 'zod'
import { createRoom } from '../functions/create-room.ts'

export const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.post(
  '/rooms',
  {
    schema: {
      body: z.object({
        question: z.string(),
      }),
    },
  },
  async (request, reply) => {
    const { question } = request.body

    const room = await createRoom({ question })

    return reply.status(201).send(room)
  }
)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('http server running!')
  })
