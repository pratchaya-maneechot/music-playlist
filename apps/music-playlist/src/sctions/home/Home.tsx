'use client';
import SearchBar from '@/components/SearchBar';
import SongList from '@/components/SongList';
import { Song } from '@/types/song';
import React, { useState } from 'react';
type Props = {
  loadedSongs: Song[];
};
export default function HomeView({ loadedSongs }: Props) {
  const [songs, setSongs] = useState<Song[]>(loadedSongs);

  const handleAddSong = (newSong: Song) => {
    setSongs([
      ...songs,
      {
        id: songs.length + 1,
        title: newSong.title,
        artist: newSong.artist,
        album: newSong.album,
        duration: '3:00',
        releaseDate: '0 seconds ago',
      },
    ]);
  };

  return (
    <div>
      <SongList songs={songs} />
      <SearchBar onAddSong={handleAddSong} />
    </div>
  );
}
