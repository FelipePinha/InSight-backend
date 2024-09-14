import { createId } from '@paralleldrive/cuid2'
import { customAlphabet } from 'nanoid'
import { pgTable, text } from 'drizzle-orm/pg-core'

const nanoid = customAlphabet('1234567890abcdef', 10)

export const rooms = pgTable('rooms', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  shortId: text('short_id')
    .notNull()
    .$defaultFn(() => nanoid(5)),
  question: text('question').notNull(),
})

export const answers = pgTable('answers', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  roomId: text('room_id')
    .references(() => rooms.id)
    .notNull(),
  answer: text('answer').notNull(),
})
