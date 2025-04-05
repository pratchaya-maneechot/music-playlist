import { z } from 'zod';
import { PlaylistSchema } from '../schemas/playlist';

export type Playlist = z.infer<typeof PlaylistSchema>;
