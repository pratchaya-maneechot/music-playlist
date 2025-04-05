import { Song } from '../models';

export interface ISongService {
  searchByTerm: (q?: string) => Song[];
}
