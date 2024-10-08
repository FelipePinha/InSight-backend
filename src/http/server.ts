import fastify from 'fastify'
import {
  type ZodTypeProvider,
  validatorCompiler,
  serializerCompiler,
} from 'fastify-type-provider-zod'
import { z } from 'zod'
import { createRoom } from '../functions/create-room.ts'
import { enterRoom } from '../functions/enter-room.ts'
import { createAnswer } from '../functions/create-answer.ts'
import cors from '@fastify/cors'

export const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

await app.register(cors, {})

app.get(
  '/rooms/:shortId',
  {
    schema: {
      params: z.object({
        shortId: z.string(),
      }),
    },
  },
  async request => {
    const { shortId } = request.params

    const room = await enterRoom({ shortId })

    return room
  }
)

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

app.post(
  '/answer',
  {
    schema: {
      body: z.object({
        answer: z.string(),
        roomId: z.string(),
      }),
    },
  },
  async request => {
    const { answer, roomId } = request.body

    await createAnswer({ answer, roomId })
  }
)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('http server running!')
  })
