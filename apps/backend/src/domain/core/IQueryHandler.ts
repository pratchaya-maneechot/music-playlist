import { IQuery } from './IQuery';

export interface IQueryHandler<T extends IQuery = any, R = any> {
  qryToHandle: string;
  execute(qry: T): Promise<R>;
}
