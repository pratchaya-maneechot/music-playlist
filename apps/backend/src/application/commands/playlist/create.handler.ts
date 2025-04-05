import { injectable, inject } from 'inversify';
import { TYPES } from '../../../config/types';
import { CreatePlaylistCommand } from './defs/create';
import { ICommandHandler, IPlaylistRepository } from '../../../domain';

@injectable()
export class CreatePlaylistCommandHandler
  implements ICommandHandler<CreatePlaylistCommand>
{
  cmdToHandle = CreatePlaylistCommand.name;

  constructor(
    @inject(TYPES.PlaylistRepository)
    private readonly _repository: IPlaylistRepository
  ) {}

  async handle(cmd: CreatePlaylistCommand) {
    return this._repository.create(cmd.input);
  }
}
