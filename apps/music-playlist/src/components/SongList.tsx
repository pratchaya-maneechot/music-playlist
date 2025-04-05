import { Song } from '@/types/song';

interface SongListProps {
  songs: Song[];
}

export default function SongList({ songs }: SongListProps) {
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
        <div className="grid grid-cols-[40px_2fr_1fr_1fr_40px] gap-4 text-gray-400 text-sm pb-2">
          <span>#</span>
          <span>Title</span>
          <span>Album</span>
          <span>Date added</span>
          <span>⏳</span>
        </div>
      </div>
      {songs.map((song) => (
        <div
          key={song.id}
          className="grid grid-cols-[40px_2fr_1fr_1fr_40px] gap-4 py-2 hover:bg-[#1a1a1a] rounded"
        >
          <span>{song.id}</span>
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
          <span className="text-gray-400">{song.album}</span>
          <span className="text-gray-400">{song.releaseDate}</span>
          <span className="text-gray-400">{song.duration}</span>
        </div>
      ))}
    </div>
  );
}
