import { ICommand, PlaylistSongInsertModel } from '../../../../domain';

export class RemoveSongFromPlaylistCommand implements ICommand {
  constructor(public readonly input: PlaylistSongInsertModel) {}
}
