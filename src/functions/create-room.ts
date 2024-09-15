import { db } from '../db/index.ts'
import { rooms } from '../db/schema.ts'

interface CreateRoomRequest {
  question: string
}

export async function createRoom({ question }: CreateRoomRequest) {
  const result = await db.insert(rooms).values({ question }).returning()

  const room = result[0]

  return {
    room,
  }
}
