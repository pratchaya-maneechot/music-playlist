import { ICommand } from '../../../../domain';

export class DeletePlaylistCommand implements ICommand {
  constructor(public readonly id: number) {}
}
