import { injectable, inject } from 'inversify';
import { TYPES } from '../../../config/types';
import { UpdatePlaylistCommand } from './defs/update';
import { ICommandHandler, IPlaylistRepository } from '../../../domain';
import { AppException } from '../../../exceptions';
import { StatusCodes } from 'http-status-codes';

@injectable()
export class UpdatePlaylistCommandHandler
  implements ICommandHandler<UpdatePlaylistCommand>
{
  cmdToHandle = UpdatePlaylistCommand.name;

  constructor(
    @inject(TYPES.PlaylistRepository)
    private readonly _repository: IPlaylistRepository
  ) {}

  async handle(cmd: UpdatePlaylistCommand) {
    const prev = await this._repository.finOne(cmd.id);
    if (!prev) {
      throw new AppException(StatusCodes.NOT_FOUND, 'The playlist not found');
    }
    return this._repository.update(cmd.id, cmd.input);
  }
}
