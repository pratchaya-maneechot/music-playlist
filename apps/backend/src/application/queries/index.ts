import { interfaces } from 'inversify';
import { TYPES } from '../../config/types';
import { GetPlaylistsQuery } from './playlist/defs/list';
import { GetPlaylistsQueryHandler } from './playlist/list.handler';
import { IQueryHandler } from '../../domain';
import { GetPlaylistQuery } from './playlist/defs/details';
import { GetPlaylistQueryHandler } from './playlist/details.handler';
import { SearchSongQuery } from './song/defs/search';
import { SearchSongQueryHandler } from './song/search.handler';
import { GetSongsQuery } from './song/defs/list';
import { GetSongsQueryHandler } from './song/list.handler';

export const configures = (bind: interfaces.Bind) => {
  bind<IQueryHandler<SearchSongQuery>>(TYPES.QueryHandler).to(
    SearchSongQueryHandler
  );
  bind<IQueryHandler<GetPlaylistsQuery>>(TYPES.QueryHandler).to(
    GetPlaylistsQueryHandler
  );
  bind<IQueryHandler<GetPlaylistQuery>>(TYPES.QueryHandler).to(
    GetPlaylistQueryHandler
  );
  bind<IQueryHandler<GetSongsQuery>>(TYPES.QueryHandler).to(
    GetSongsQueryHandler
  );
};

export const qryDefs = {
  GetPlaylistsQuery,
  GetPlaylistQuery,
  SearchSongQuery,
  GetSongsQuery,
};
