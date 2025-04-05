import { Playlist } from '@/types/playlist';
import { NextResponse } from 'next/server';

const playlists: Playlist[] = [];

export async function GET() {
  return NextResponse.json(playlists);
}

export async function POST(request: Request) {
  const { name, songIds }: { name: string; songIds: number[] } =
    await request.json();
  const newPlaylist: Playlist = {
    id: playlists.length + 1,
    name,
    songIds,
  };
  playlists.push(newPlaylist);
  return NextResponse.json(newPlaylist, { status: 201 });
}
