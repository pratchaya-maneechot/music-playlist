import { z } from 'zod';
import { SongSchema } from '../schemas/song';

export type Song = z.infer<typeof SongSchema>;
