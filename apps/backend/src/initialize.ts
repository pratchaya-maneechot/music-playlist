import { Container } from 'inversify';
import { module as applicationModule } from './application';
import { module as infrastructureModule } from './infrastructure/module';
import { TYPES } from './config/types';
import {
  ICommandBus,
  ICommandHandler,
  ICommand,
  IQueryHandler,
  IQuery,
  IQueryBus,
} from './domain';

const initializes = async () => {
  const container = new Container();
  await container.loadAsync(applicationModule);
  await container.loadAsync(infrastructureModule);

  const cmdbus = container.get<ICommandBus>(TYPES.CommandBus);
  container
    .getAll<ICommandHandler<ICommand>>(TYPES.CommandHandler)
    .forEach((handler: ICommandHandler<ICommand>) => {
      cmdbus.registerHandler(handler);
    });

  const qrybus = container.get<IQueryBus>(TYPES.QueryBus);
  container
    .getAll<IQueryHandler<IQuery>>(TYPES.QueryHandler)
    .forEach((handler: IQueryHandler<IQuery>) => {
      qrybus.registerHandler(handler);
    });

  return container;
};

export { initializes };
