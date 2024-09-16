import { eq, and, sql } from 'drizzle-orm'
import { db } from '../db/index.ts'
import { answers, rooms } from '../db/schema.ts'

interface EnterRoomRequest {
  shortId: string
}

export async function enterRoom({ shortId }: EnterRoomRequest) {
  const result = await db
    .select({
      id: rooms.id,
      shortId: rooms.shortId,
      question: rooms.question,
      answers: sql`ARRAY_AGG(json_build_object(
        'id', ${answers.id},
        'roomId', ${answers.roomId},
        'answer', ${answers.answer}
      ))`,
    })
    .from(rooms)
    .innerJoin(answers, eq(rooms.id, answers.roomId))
    .where(and(eq(rooms.shortId, shortId)))
    .groupBy(rooms.id, rooms.shortId, rooms.question)

  const room = result

  return {
    data: room,
  }
}
