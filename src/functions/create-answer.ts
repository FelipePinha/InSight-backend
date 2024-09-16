import { db } from '../db/index.ts'
import { answers } from '../db/schema.ts'

interface CreateRoomRequest {
  answer: string
  roomId: string
}

export async function createAnswer({ answer, roomId }: CreateRoomRequest) {
  const result = await db.insert(answers).values({ answer, roomId }).returning()

  const answerResult = result[0]

  return {
    answer: answerResult,
  }
}
