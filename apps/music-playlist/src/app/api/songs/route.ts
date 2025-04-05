import { Song } from '@/types/song';
import { NextRequest, NextResponse } from 'next/server';

type SongFromItunes = {
  trackId: number;
  trackName: string;
  artistName: string;
  trackTimeMillis: number;
  collectionName: string;
  releaseDate: string;
};

async function searchSongs(query: string): Promise<SongFromItunes[]> {
  try {
    const response = await fetch(
      `https://itunes.apple.com/search?term=${encodeURIComponent(
        query
      )}&entity=song&limit=10`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (!data.results || !Array.isArray(data.results)) {
      throw new Error('No results found in response');
    }

    return data.results as SongFromItunes[];
  } catch (error) {
    console.error('Error fetching songs:', error);
    return [];
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q') || 'driving';

  const data = await searchSongs(q);
  const songs: Song[] = data.map((item) => ({
    id: item.trackId,
    title: item.trackName,
    artist: item.artistName,
    duration: (item.trackTimeMillis / 1000 / 60).toFixed(2).replace('.', ':'),
    album: item.collectionName || 'Unknown Album',
    releaseDate: item.releaseDate || 'Unknown Date',
  }));

  return NextResponse.json(songs);
}
