import { injectable } from 'inversify';
import { dbClient, DBClient } from '../db';
import { BaseDrizzleRepository } from '../db/repository';
import {
  PlaylistTable,
  IPlaylistRepository,
  playlists,
  playlistSongs,
} from '../../domain';
import { eq } from 'drizzle-orm';

@injectable()
export class PlaylistRepository
  extends BaseDrizzleRepository<PlaylistTable, DBClient>
  implements IPlaylistRepository
{
  constructor() {
    super(dbClient, playlists);
  }

  override async delete(playlistId: number) {
    await this.db
      .delete(playlistSongs)
      .where(eq(playlistSongs.playlistId, playlistId));
    await super.delete(playlistId);
  }

  async addSongToPlaylist(playlistId: number, songId: number) {
    await this.db.insert(playlistSongs).values({ playlistId, songId });
  }

  async removeSongFromPlaylist(playlistId: number, songId: number) {
    await this.db.insert(playlistSongs).values({ playlistId, songId });
  }
}
