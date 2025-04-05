import { BaseContext } from '@apollo/server';
import { Logger } from 'pino';
import { ICommandBus, IQueryBus } from '../domain';

export interface IAuthentication {
  id: number;
}
export interface IAppContext extends BaseContext {
  logger?: Logger;
  identity: IAuthentication;
  cmdbus: ICommandBus;
  qrybus: IQueryBus;
}
