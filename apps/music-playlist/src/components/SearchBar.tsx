import { Song } from '@/types/song';
import React, { useState } from 'react';
type SearchBarProps = {
  onAddSong: (song: Song) => void;
};
export default function SearchBar({ onAddSong }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const mockResults: Song[] = [
    {
      title: 'Love Yourself',
      artist: 'Justin Bieber',
      album: 'Purpose (Deluxe)',
      id: 0,
      duration: '',
      releaseDate: '',
    },
    {
      title: 'I Love You So',
      artist: 'The Walters',
      album: 'I Love You So',
      id: 1,
      duration: '',
      releaseDate: '',
    },
  ];

  return (
    <div className="p-6 bg-[#121212] text-white">
      <h3 className="text-lg font-semibold mb-4">
        Let&apos;s find something for your playlist
      </h3>
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search for songs or episodes"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 bg-[#1a1a1a] rounded text-white placeholder-gray-400"
        />
        {searchTerm && (
          <button
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            onClick={() => setSearchTerm('')}
          >
            ✕
          </button>
        )}
      </div>
      {searchTerm && (
        <div>
          {mockResults.map((song, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-2 hover:bg-[#1a1a1a] rounded"
            >
              <div className="flex items-center space-x-3">
                <img
                  src="https://placehold.co/40"
                  alt="album"
                  className="w-10 h-10"
                />
                <div>
                  <p className="text-white">{song.title}</p>
                  <p className="text-gray-400 text-sm">{song.artist}</p>
                </div>
              </div>
              <button
                onClick={() => onAddSong(song)}
                className="border border-gray-400 text-gray-400 px-4 py-1 rounded hover:bg-gray-600"
              >
                Add
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
