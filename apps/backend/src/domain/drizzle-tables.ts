import {
  pgTable,
  serial,
  varchar,
  timestamp,
  integer,
} from 'drizzle-orm/pg-core';

export const playlists = pgTable('playlists', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  userId: integer('user_id').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const songs = pgTable('songs', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 100 }).notNull(),
  artist: varchar('artist', { length: 100 }).notNull(),
  album: varchar('album', { length: 100 }).notNull(),
  duration: varchar('duration', { length: 10 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const playlistSongs = pgTable('playlist_songs', {
  id: serial('id').primaryKey(),
  playlistId: integer('playlist_id')
    .notNull()
    .references(() => playlists.id),
  songId: integer('song_id')
    .notNull()
    .references(() => songs.id),
  dateAdded: timestamp('date_added').defaultNow().notNull(),
});
