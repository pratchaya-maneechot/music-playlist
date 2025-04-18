import { injectable, inject } from 'inversify';
import { TYPES } from '../../../config/types';
import { GetPlaylistsQuery } from './defs/list';
import { IQueryHandler, Playlist, IPlaylistRepository } from '../../../domain';

@injectable()
export class GetPlaylistsQueryHandler
  implements IQueryHandler<GetPlaylistsQuery, Playlist[]>
{
  qryToHandle = GetPlaylistsQuery.name;

  constructor(
    @inject(TYPES.PlaylistRepository)
    private readonly _repository: IPlaylistRepository
  ) {}

  execute({ userId }: GetPlaylistsQuery) {
    return this._repository.finMany({ userId });
  }
}
