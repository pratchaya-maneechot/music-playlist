import { injectable } from 'inversify';
import { IQuery, IQueryBus, IQueryHandler } from '../domain';

@injectable()
export class QueryBus<BaseQuery extends IQuery = IQuery>
  implements IQueryBus<BaseQuery>
{
  handlers: Map<string, IQueryHandler<BaseQuery>> = new Map();

  registerHandler(handler: IQueryHandler<BaseQuery>) {
    const qryName = handler.qryToHandle;
    if (this.handlers.has(qryName)) {
      return;
    }
    this.handlers.set(qryName, handler);
  }

  async execute<T extends BaseQuery = BaseQuery, R = unknown>(qry: T) {
    const handler = this.handlers.get(qry.constructor.name);
    if (!handler) {
      throw new Error(`Query handler ${qry.constructor.name} not register`);
    }
    return handler.execute(qry) as R;
  }
}
