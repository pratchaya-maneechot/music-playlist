'use server'; // Server Action
import { ZodError } from 'zod';
import { PlaylistSchema } from '../schemas/playlist';
import { Song } from '../types/song';

const PlaylistInput = PlaylistSchema.omit({ id: true });
export async function handleAddToPlaylist(song: Song) {
  const parsed = PlaylistInput.safeParse({
    name: 'Driving',
    songIds: [song.id],
  });
  if (!parsed.success) {
    const formattedErrors = parsed.error.issues.map((issue) => ({
      field: issue.path.join('.'),
      message: issue.message,
    }));
    return {
      ok: false,
      message: 'Validation failed',
      errors: formattedErrors,
    };
  }
  const res = await fetch('http://localhost:3000/api/playlists', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(parsed.data),
  });

  return res.json();
}
