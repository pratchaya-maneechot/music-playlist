import { InferSelectModel, type InferInsertModel } from 'drizzle-orm';
import { playlists, playlistSongs, songs } from './drizzle-tables';

export type PlaylistTable = typeof playlists;
export type PlaylistSongTable = typeof playlistSongs;
export type PlaylistSongInsertModel = InferInsertModel<PlaylistSongTable>;
export type PlaylistInsertModel = InferInsertModel<PlaylistTable>;
export type Playlist = InferSelectModel<PlaylistTable>;

export type SongTable = typeof songs;
export type SongInsertModel = InferInsertModel<SongTable>;
export type Song = InferSelectModel<SongTable>;
