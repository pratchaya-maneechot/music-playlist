import { interfaces } from 'inversify';
import { TYPES } from '../../config/types';
import { CreatePlaylistCommand } from './playlist/defs/create';
import { CreatePlaylistCommandHandler } from './playlist/create.handler';
import { UpdatePlaylistCommand } from './playlist/defs/update';
import { UpdatePlaylistCommandHandler } from './playlist/update.handler';
import { DeletePlaylistCommand } from './playlist/defs/delete';
import { DeletePlaylistCommandHandler } from './playlist/delete.handler';
import { AddSongToPlaylistCommand } from './playlist/defs/add-song';
import { AddSongToPlaylistCommandHandler } from './playlist/add-song.handler';
import { RemoveSongFromPlaylistCommand } from './playlist/defs/remove-song';
import { RemoveSongFromPlaylistCommandHandler } from './playlist/remove-song.handler';
import { ICommandHandler } from '../../domain';

export const configures = (bind: interfaces.Bind) => {
  bind<ICommandHandler<CreatePlaylistCommand>>(TYPES.CommandHandler).to(
    CreatePlaylistCommandHandler
  );
  bind<ICommandHandler<UpdatePlaylistCommand>>(TYPES.CommandHandler).to(
    UpdatePlaylistCommandHandler
  );
  bind<ICommandHandler<DeletePlaylistCommand>>(TYPES.CommandHandler).to(
    DeletePlaylistCommandHandler
  );
  bind<ICommandHandler<AddSongToPlaylistCommand>>(TYPES.CommandHandler).to(
    AddSongToPlaylistCommandHandler
  );
  bind<ICommandHandler<RemoveSongFromPlaylistCommand>>(TYPES.CommandHandler).to(
    RemoveSongFromPlaylistCommandHandler
  );
};

export const cmdDefs = {
  CreatePlaylistCommand,
  UpdatePlaylistCommand,
  DeletePlaylistCommand,
  AddSongToPlaylistCommand,
  RemoveSongFromPlaylistCommand,
};
