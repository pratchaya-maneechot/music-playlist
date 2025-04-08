import { LoadingIcon } from '@/components/LoadingScreen';
import {
  GetPlaylistDocument,
  useRemoveSongFromPlaylistMutation,
} from '@/graphql/generated';
import { ISong } from '@/types/song';
import { fDateTime } from '@/utils/format-time';
import Image from 'next/image';
import { useState } from 'react';

interface SongListProps {
  songs: ISong[];
  playlistId: string;
}

export default function PlaylistSongList({ songs, playlistId }: SongListProps) {
  const [deleteItemId, setDeleteItemId] = useState('');
  const [callRemoveSong, { loading }] = useRemoveSongFromPlaylistMutation();
  const onRemove = (item: ISong) => {
    setDeleteItemId(item.id);
    callRemoveSong({
      variables: { playlistId, songId: item.id },
      refetchQueries: [
        { query: GetPlaylistDocument, variables: { id: playlistId } },
      ],
    });
  };
  return (
    <div className="p-6 bg-[#121212] text-white">
      <div className="flex items-center space-x-4 mb-4">
        <button className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      </div>
      <div className="border-b border-gray-700 mb-4">
        <div className="grid grid-cols-[100px_2fr_1fr_1fr_40px_40px] gap-4 text-gray-400 text-sm pb-2">
          <span>#</span>
          <span>Title</span>
          <span>Album</span>
          <span>Date added</span>
          <span>⏳</span>
          <span></span>
        </div>
      </div>
      {songs.map((song) => (
        <div
          key={song.id}
          className="grid grid-cols-[100px_2fr_1fr_1fr_40px_40px] gap-4 py-2 hover:bg-[#1a1a1a] rounded"
        >
          <span>{song.id}</span>
          <div className="flex items-center space-x-3">
            <Image
              width={'30'}
              height={'30'}
              src={'/icons/musical-note.png'}
              alt={'album'}
            />
            <div>
              <p className="text-white">{song.title}</p>
              <p className="text-gray-400 text-sm">{song.artist}</p>
            </div>
          </div>
          <span className="text-gray-400">{song.album}</span>
          <span className="text-gray-400">{fDateTime(+song.createdAt)}</span>
          <span className="text-gray-400">{song.duration}</span>
          <span className="text-gray-400">
            <button onClick={() => onRemove(song)}>
              {loading && deleteItemId === song.id ? <LoadingIcon /> : 'Del'}
            </button>
          </span>
        </div>
      ))}
    </div>
  );
}
