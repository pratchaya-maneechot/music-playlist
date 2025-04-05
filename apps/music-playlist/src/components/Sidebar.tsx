import { Playlist } from '@/types/playlist';

type SidebarProps = {
  playlists: Playlist[];
};
export default function Sidebar({ playlists }: SidebarProps) {
  return (
    <div className="w-64 h-screen bg-[#121212] text-white p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Your Library</h2>
        <button className="text-gray-400 hover:text-white">+</button>
      </div>
      <div className="space-y-2">
        <div className="flex items-center space-x-2 p-2 bg-[#1a1a1a] rounded">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>
          <span>My Playlist #1</span>
        </div>
      </div>
    </div>
  );
}
