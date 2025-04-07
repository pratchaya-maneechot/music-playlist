import { injectable } from 'inversify';
import { dbClient, DBClient } from '../db';
import { BaseDrizzleRepository } from '../db/repository';
import { eq, getTableColumns } from 'drizzle-orm';
import { ISongRepository, playlistSongs, songs, SongTable } from '../../domain';

@injectable()
export class SongRepository
  extends BaseDrizzleRepository<SongTable, DBClient>
  implements ISongRepository
{
  constructor() {
    super(dbClient, songs);
  }
  async findMany(playlistId?: number) {
    const qry = this.qry.select(getTableColumns(songs)).from(songs);

    if (playlistId) {
      return await qry
        .innerJoin(playlistSongs, eq(songs.id, playlistSongs.songId))
        .where(eq(playlistSongs.playlistId, playlistId));
    }

    return await qry;
  }
}
