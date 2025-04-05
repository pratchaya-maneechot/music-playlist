import { AsyncContainerModule, interfaces } from 'inversify';

import { configures as cmdConfigures, cmdDefs } from './commands';
import { configures as qryConfigures, qryDefs } from './queries';

const module = new AsyncContainerModule(async (bind: interfaces.Bind) => {
  cmdConfigures(bind);
  qryConfigures(bind);
});

export { module, cmdDefs, qryDefs };
