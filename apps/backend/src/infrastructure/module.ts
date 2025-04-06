import { AsyncContainerModule, interfaces } from 'inversify';
import { QueryBus } from './qrybus';
import { PlaylistRepository } from './repositories/PlaylistRepository';
import { CommandBus } from './cmdbus';
import { TYPES } from '../config/types';
import { SongRepository } from './repositories/SongRepository';
import {
  ICommandBus,
  IQueryBus,
  IQuery,
  ISongRepository,
  IPlaylistRepository,
  ISongService,
} from '../domain';
import { SongService } from './services/SongService';

export const module = new AsyncContainerModule(
  async (bind: interfaces.Bind) => {
    bind<ICommandBus>(TYPES.CommandBus).toConstantValue(new CommandBus());
    bind<IQueryBus<IQuery>>(TYPES.QueryBus).toConstantValue(new QueryBus());
    bind<ISongRepository>(TYPES.SongRepository)
      .to(SongRepository)
      .inSingletonScope();
    bind<ISongService>(TYPES.SongService).to(SongService).inSingletonScope();
    bind<IPlaylistRepository>(TYPES.PlaylistRepository)
      .to(PlaylistRepository)
      .inSingletonScope();
  }
);
