import { IRepository } from '../core/IRepository';
import { Song, SongInsertModel } from '../models';

export interface ISongRepository extends IRepository<SongInsertModel, Song> {
  findMany: (playlistId?: number) => Promise<Song[]>;
}
