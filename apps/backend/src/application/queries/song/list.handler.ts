import { injectable, inject } from 'inversify';
import { TYPES } from '../../../config/types';
import { GetSongsQuery } from './defs/list';
import { IQueryHandler, ISongRepository, Song } from '../../../domain';

@injectable()
export class GetSongsQueryHandler
  implements IQueryHandler<GetSongsQuery, Song[]>
{
  qryToHandle = GetSongsQuery.name;

  constructor(
    @inject(TYPES.SongRepository)
    private readonly _repository: ISongRepository
  ) {}

  async execute({ playlistId }: GetSongsQuery) {
    const items = await this._repository.findMany(playlistId);
    return items;
  }
}
