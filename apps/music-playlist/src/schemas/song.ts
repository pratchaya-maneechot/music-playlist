import { z } from 'zod';

export const SongSchema = z.object({
  id: z.number(),
  title: z.string(),
  artist: z.string(),
  duration: z.string(),
  album: z.string().nullish(),
  releaseDate: z.string(),
});
