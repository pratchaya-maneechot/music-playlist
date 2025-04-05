import { ICommand, PlaylistInsertModel } from '../../../../domain';

export class UpdatePlaylistCommand implements ICommand {
  constructor(
    public readonly id: number,
    public readonly input: Partial<PlaylistInsertModel>
  ) {}
}
