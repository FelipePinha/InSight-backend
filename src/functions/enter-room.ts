import { eq } from 'drizzle-orm'
import { db } from '../db/index.ts'
import { answers, rooms } from '../db/schema.ts'

interface EnterRoomRequest {
  shortId: string
}

export async function enterRoom({ shortId }: EnterRoomRequest) {
  const result = await db
    .select()
    .from(rooms)
    .where(eq(rooms.shortId, shortId))
    .leftJoin(answers, eq(rooms.id, answers.roomId))

  const room = result[0]

  return {
    room,
  }
}
