import { injectable, inject } from 'inversify';
import { TYPES } from '../../../config/types';
import { AddSongToPlaylistCommand } from './defs/add-song';
import { ICommandHandler, IPlaylistRepository } from '../../../domain';

@injectable()
export class AddSongToPlaylistCommandHandler
  implements ICommandHandler<AddSongToPlaylistCommand>
{
  cmdToHandle = AddSongToPlaylistCommand.name;

  constructor(
    @inject(TYPES.PlaylistRepository)
    private readonly _repository: IPlaylistRepository
  ) {}

  async handle(cmd: AddSongToPlaylistCommand) {
    return this._repository.removeSongFromPlaylist(
      cmd.input.playlistId,
      cmd.input.songId
    );
  }
}
