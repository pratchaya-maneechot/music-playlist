import { injectable, inject } from 'inversify';
import { TYPES } from '../../../config/types';
import { RemoveSongFromPlaylistCommand } from './defs/remove-song';
import { ICommandHandler, IPlaylistRepository } from '../../../domain';

@injectable()
export class RemoveSongFromPlaylistCommandHandler
  implements ICommandHandler<RemoveSongFromPlaylistCommand>
{
  cmdToHandle = RemoveSongFromPlaylistCommand.name;

  constructor(
    @inject(TYPES.PlaylistRepository)
    private readonly _repository: IPlaylistRepository
  ) {}

  async handle(cmd: RemoveSongFromPlaylistCommand) {
    return this._repository.removeSongFromPlaylist(
      cmd.input.playlistId,
      cmd.input.songId
    );
  }
}
