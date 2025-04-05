import { injectable } from 'inversify';
import { ICommand, ICommandBus, ICommandHandler } from '../domain';

@injectable()
export class CommandBus<BaseCommand extends ICommand = ICommand>
  implements ICommandBus<BaseCommand>
{
  handlers: Map<string, ICommandHandler<BaseCommand>> = new Map();

  registerHandler(handler: ICommandHandler<BaseCommand>) {
    const targetCommand: string = handler.cmdToHandle;

    if (this.handlers.has(targetCommand)) {
      return;
    }
    this.handlers.set(targetCommand, handler);
  }

  async send<T extends BaseCommand>(cmd: T) {
    const handler = this.handlers.get(cmd.constructor.name);
    if (!handler) {
      throw new Error(`Command handler ${cmd.constructor.name} not register`);
    }
    return handler.handle(cmd);
  }
}
