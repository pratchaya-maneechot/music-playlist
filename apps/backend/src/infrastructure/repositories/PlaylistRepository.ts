import { injectable } from 'inversify';
import { dbClient, DBClient } from '../db';
import { BaseDrizzleRepository } from '../db/repository';
import {
  PlaylistTable,
  IPlaylistRepository,
  playlists,
  playlistSongs,
} from '../../domain';

@injectable()
export class PlaylistRepository
  extends BaseDrizzleRepository<PlaylistTable, DBClient>
  implements IPlaylistRepository
{
  constructor() {
    super(dbClient, playlists);
  }
  async addSongToPlaylist(playlistId: number, songId: number) {
    await this.db.insert(playlistSongs).values({ playlistId, songId });
  }
  async removeSongFromPlaylist(playlistId: number, songId: number) {
    await this.db.insert(playlistSongs).values({ playlistId, songId });
  }
}
