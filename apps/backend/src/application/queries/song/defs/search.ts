import { IQuery } from '../../../../domain';

export class SearchSongQuery implements IQuery {
  constructor(public readonly q: string) {}
}
