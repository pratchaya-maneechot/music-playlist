import { z } from 'zod';

export const PlaylistSchema = z.object({
  id: z.number(),
  name: z.string(),
  songIds: z.array(z.number()),
});
