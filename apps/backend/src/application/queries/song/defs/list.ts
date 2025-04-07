import { IQuery } from '../../../../domain';

export class GetSongsQuery implements IQuery {
  constructor(public readonly playlistId?: number) {}
}
