import { ICommand } from './ICommand';

export interface ICommandHandler<TCommand extends ICommand = any, R = any> {
  cmdToHandle: string;
  handle(cmd: TCommand): R | Promise<R>;
}
