import { interfaces } from 'inversify';
import { TYPES } from '../../config/types';
import { GetPlaylistsQuery } from './playlist/defs/list';
import { GetPlaylistsQueryHandler } from './playlist/list.handler';
import { IQueryHandler } from '../../domain';

export const configures = (bind: interfaces.Bind) => {
  bind<IQueryHandler<GetPlaylistsQuery>>(TYPES.QueryHandler).to(
    GetPlaylistsQueryHandler
  );
};

export const qryDefs = {
  GetPlaylistsQuery,
};
