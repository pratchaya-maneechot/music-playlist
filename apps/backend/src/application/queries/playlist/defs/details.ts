import { IQuery } from '../../../../domain';

export class GetPlaylistQuery implements IQuery {
  constructor(public readonly id: number) {}
}
