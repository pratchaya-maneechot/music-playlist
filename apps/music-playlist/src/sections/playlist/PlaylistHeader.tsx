type PlaylistHeaderProps = {
  name: string;
  creator: string;
  songCount: number;
  duration: string;
};
export default function PlaylistHeader({
  name,
  creator,
  songCount,
  duration,
}: PlaylistHeaderProps) {
  return (
    <div className="flex items-end p-6 bg-gradient-to-b from-[#333] to-[#121212] space-x-4">
      <div className="w-40 h-40 bg-[#282828] flex items-center justify-center">
        <svg
          className="w-16 h-16 text-gray-400"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
        </svg>
      </div>
      <div>
        <span className="text-sm text-gray-400">Playlist</span>
        <h1 className="text-6xl font-bold text-white">{name}</h1>
        <p className="text-sm text-gray-400 mt-2">
          {creator} • {songCount} song, {duration}
        </p>
      </div>
    </div>
  );
}
