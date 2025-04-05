import { Container } from 'inversify';
import { MOCKs } from '../_mock';
import { IExpressRequest } from '../utils/express-logger';
import { IAppContext, IAuthentication } from './types';
import { TYPES } from '../config/types';
import { ICommandBus, IQueryBus } from '../domain';

export async function createContext(
  req: IExpressRequest,
  container: Container
): Promise<IAppContext> {
  const identity: IAuthentication = {
    id: MOCKs.profile.id,
  };
  return {
    logger: req.logger,
    identity,
    cmdbus: container.get<ICommandBus>(TYPES.CommandBus),
    qrybus: container.get<IQueryBus>(TYPES.QueryBus),
  };
}
