import { IQuery } from '../../../../domain';

export class GetPlaylistsQuery implements IQuery {
  constructor(public readonly userId?: number) {}
}
