import { injectable, inject } from 'inversify';
import { TYPES } from '../../../config/types';
import { DeletePlaylistCommand } from './defs/delete';
import { ICommandHandler, IPlaylistRepository } from '../../../domain';

@injectable()
export class DeletePlaylistCommandHandler
  implements ICommandHandler<DeletePlaylistCommand>
{
  cmdToHandle = DeletePlaylistCommand.name;

  constructor(
    @inject(TYPES.PlaylistRepository)
    private readonly _repository: IPlaylistRepository
  ) {}

  async handle(cmd: DeletePlaylistCommand) {
    const prev = await this._repository.finOne(cmd.id);
    if (!prev) {
      throw new Error('The playlist not found');
    }
    return this._repository.delete(cmd.id);
  }
}
