import {
  GetPlaylistDocument,
  useAddSongToPlaylistMutation,
  useSearchSongsQuery,
} from '@/graphql/generated';
import { useDebounce } from '@/hooks/use-debounce';
import Image from 'next/image';
import React, { useState } from 'react';
type Props = {
  playlistId: string;
};
export default function PlaylistSearchBar({ playlistId }: Props) {
  const [callAddSongToPlaylist, { loading: submitting }] =
    useAddSongToPlaylistMutation();
  const [addSongId, setAddSongId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedQuery = useDebounce(searchTerm);

  const { loading, data } = useSearchSongsQuery({
    variables: { q: debouncedQuery },
  });
  const songs = data?.searchSongs ?? [];

  const onAddToPlaylist = (referenceId: string) => {
    setAddSongId(referenceId);
    callAddSongToPlaylist({
      variables: { playlistId, referenceId },
      refetchQueries: [
        {
          query: GetPlaylistDocument,
          variables: { id: playlistId },
        },
      ],
    });
  };

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
      {searchTerm && loading ? (
        <>Loading...</>
      ) : (
        <div>
          {songs.length === 0 && debouncedQuery
            ? `The "${debouncedQuery}" not found`
            : songs.map((song, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 hover:bg-[#1a1a1a] rounded"
                >
                  <div className="flex items-center space-x-3">
                    <div className=" bg-white p-1 rounded">
                      <Image
                        width={'30'}
                        height={'30'}
                        src={'/icons/musical-note.png'}
                        alt={'album'}
                      />
                    </div>
                    <div>
                      <p className="text-white">{song.title}</p>
                      <p className="text-gray-400 text-sm">{song.artist}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => onAddToPlaylist(song.id)}
                    className="border border-gray-400 text-gray-400 px-4 py-1 rounded hover:bg-gray-600"
                  >
                    {submitting && addSongId === song.id ? 'loading' : 'Add'}
                  </button>
                </div>
              ))}
        </div>
      )}
    </div>
  );
}
