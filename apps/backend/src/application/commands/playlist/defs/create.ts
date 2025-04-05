import { ICommand, PlaylistInsertModel } from '../../../../domain';

export class CreatePlaylistCommand implements ICommand {
  constructor(public readonly input: PlaylistInsertModel) {}
}
