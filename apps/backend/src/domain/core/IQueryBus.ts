import { IQuery } from './IQuery';
import { IQueryHandler } from './IQueryHandler';

export interface IQueryBus<BaseQuery extends IQuery = IQuery> {
  registerHandler(qryHandler: IQueryHandler<BaseQuery>): void;
  execute<T extends BaseQuery = BaseQuery, R = unknown>(qry: T): Promise<R>;
}
