import { IRepository } from '../core/IRepository';
import { Playlist, PlaylistInsertModel } from '../models';

export interface IPlaylistRepository
  extends IRepository<PlaylistInsertModel, Playlist> {
  addSongToPlaylist: (playlistId: number, songId: number) => Promise<void>;
  removeSongFromPlaylist: (playlistId: number, songId: number) => Promise<void>;
}
