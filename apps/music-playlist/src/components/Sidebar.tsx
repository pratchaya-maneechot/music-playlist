import { paths } from '@/routes/paths';
import { IPlaylist } from '@/types/playlist';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type SidebarProps = {
  playlists: IPlaylist[];
  loading: boolean;
  submitting?: boolean;
  deleting?: boolean;
  onNewPlaylist?: VoidFunction;
  onDeletePlaylist?: (item: IPlaylist) => void;
};
export default function Sidebar({
  playlists,
  loading,
  submitting,
  deleting,
  onNewPlaylist,
  onDeletePlaylist,
}: SidebarProps) {
  const [deleteItemId, setDeleteItemId] = useState('');
  const router = useRouter();
  return (
    <div className="w-64 h-screen bg-[#121212] text-white p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Your Library</h2>
        <button
          className="text-gray-400 hover:text-white py-1 px-3 bg-[#282828] rounded-full"
          onClick={onNewPlaylist}
        >
          {submitting ? 'loading' : '+ Create'}
        </button>
      </div>
      <div className="space-y-2">
        {loading ? (
          <> Loading.. </>
        ) : playlists.length ? (
          playlists.map((pl) => (
            <div
              key={pl.id}
              className="flex justify-between items-center p-2 bg-[#1a1a1a] rounded"
            >
              <div
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => router.push(paths.playlist.detail(pl.id))}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                </svg>
                <span>{pl.name}</span>
              </div>
              {onDeletePlaylist && (
                <button
                  className="text-gray-400 hover:text-gray-100"
                  onClick={() => {
                    setDeleteItemId(pl.id);
                    onDeletePlaylist(pl);
                  }}
                >
                  {deleting && deleteItemId === pl.id ? 'loading' : 'Del.'}
                </button>
              )}
            </div>
          ))
        ) : (
          onNewPlaylist && (
            <button
              className="text-gray-600 hover:text-gray-900 py-1 px-3 bg-white rounded"
              onClick={onNewPlaylist}
            >
              {submitting ? 'loading' : '+ New Playlist'}
            </button>
          )
        )}
      </div>
    </div>
  );
}
