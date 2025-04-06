import { injectable, inject } from 'inversify';
import { TYPES } from '../../../config/types';
import { AddSongToPlaylistCommand } from './defs/add-song';
import {
  ICommandHandler,
  IPlaylistRepository,
  ISongRepository,
  ISongService,
} from '../../../domain';

@injectable()
export class AddSongToPlaylistCommandHandler
  implements ICommandHandler<AddSongToPlaylistCommand>
{
  cmdToHandle = AddSongToPlaylistCommand.name;

  constructor(
    @inject(TYPES.SongService)
    private readonly _songService: ISongService,
    @inject(TYPES.SongRepository)
    private readonly _songRepository: ISongRepository,
    @inject(TYPES.PlaylistRepository)
    private readonly _repository: IPlaylistRepository
  ) {}

  async handle(cmd: AddSongToPlaylistCommand) {
    await this.syncSongData(cmd.input.referenceId);
    return this._repository.addSongToPlaylist(
      cmd.input.playlistId,
      cmd.input.referenceId
    );
  }

  private async syncSongData(referenceId: number) {
    const data = await this._songService.detail(referenceId);
    try {
      const prevSong = await this._songRepository.finOne(referenceId);
      if (prevSong) {
        await this._songRepository.update(prevSong.id, data);
      }
    } catch {
      await this._songRepository.create(data);
    }
  }
}
