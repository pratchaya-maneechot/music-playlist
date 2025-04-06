import { injectable, inject } from 'inversify';
import { TYPES } from '../../../config/types';
import { GetPlaylistQuery } from './defs/details';
import { IQueryHandler, Playlist, IPlaylistRepository } from '../../../domain';

@injectable()
export class GetPlaylistQueryHandler
  implements IQueryHandler<GetPlaylistQuery, Playlist>
{
  qryToHandle = GetPlaylistQuery.name;

  constructor(
    @inject(TYPES.PlaylistRepository)
    private readonly _repository: IPlaylistRepository
  ) {}

  execute({ id }: GetPlaylistQuery) {
    return this._repository.finOne(id);
  }
}
