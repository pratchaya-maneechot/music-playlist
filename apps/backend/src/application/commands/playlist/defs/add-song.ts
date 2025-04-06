import { ICommand, PlaylistSongInsertModel } from '../../../../domain';

export class AddSongToPlaylistCommand implements ICommand {
  constructor(
    public readonly input: Pick<PlaylistSongInsertModel, 'playlistId'> & {
      referenceId: number;
    }
  ) {}
}
