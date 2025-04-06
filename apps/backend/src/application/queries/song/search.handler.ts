import { injectable, inject } from 'inversify';
import { TYPES } from '../../../config/types';
import { SearchSongQuery } from './defs/search';
import { IQueryHandler, ISongService, Song } from '../../../domain';

@injectable()
export class SearchSongQueryHandler
  implements IQueryHandler<SearchSongQuery, Song[]>
{
  qryToHandle = SearchSongQuery.name;

  constructor(
    @inject(TYPES.PlaylistRepository)
    private readonly _songService: ISongService
  ) {}

  async execute({ q }: SearchSongQuery) {
    const items = await this._songService.searchByTerm(q);
    return items;
  }
}
