import { injectable } from 'inversify';
import { dbClient, DBClient } from '../db';
import { BaseDrizzleRepository } from '../db/repository';
import {
  PlaylistTable,
  IPlaylistRepository,
  playlists,
  playlistSongs,
} from '../../domain';
import { and, eq } from 'drizzle-orm';
import { InfraException } from '../../exceptions';
import { StatusCodes } from 'http-status-codes';

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
    const prev = await this.db.$count(
      playlistSongs,
      and(
        eq(playlistSongs.playlistId, playlistId),
        eq(playlistSongs.songId, songId)
      )
    );
    if (prev)
      throw new InfraException(
        StatusCodes.CONFLICT,
        `This song is already in the playlist.`
      );

    await this.db.insert(playlistSongs).values({ playlistId, songId });
  }

  async removeSongFromPlaylist(playlistId: number, songId: number) {
    await this.db
      .delete(playlistSongs)
      .where(
        and(
          eq(playlistSongs.playlistId, playlistId),
          eq(playlistSongs.songId, songId)
        )
      );
  }
}
