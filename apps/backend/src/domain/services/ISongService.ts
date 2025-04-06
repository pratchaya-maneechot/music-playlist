import { Song } from '../models';

export interface ISongService {
  searchByTerm: (q?: string) => Promise<Song[]>;
  detail: (referenceId: number) => Promise<Song>;
}
