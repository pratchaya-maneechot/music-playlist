'use client';

import { useAuthContext } from '@/auth/hooks';
import LoadingScreen, { LoadingIcon } from '@/components/LoadingScreen';
import {
  GetPlaylistsDocument,
  useCreatePlaylistMutation,
  useGetPlaylistsQuery,
} from '@/graphql/generated';
import { paths } from '@/routes/paths';
import { useRouter } from 'next/navigation';

export default function HomeView() {
  const { user } = useAuthContext();
  const router = useRouter();
  const { loading, data } = useGetPlaylistsQuery({
    variables: { userId: user?.id as string },
    skip: !user,
  });
  const [callCreatePlaylist, { loading: submitting }] =
    useCreatePlaylistMutation();

  const onCreate = async () => {
    const { data: playlistCreated } = await callCreatePlaylist({
      variables: { name: `My Playlist #${(data?.playlists?.length ?? 0) + 1}` },
      refetchQueries: [
        {
          query: GetPlaylistsDocument,
          variables: { userId: user?.id as string },
        },
      ],
    });

    if (playlistCreated?.createPlaylist.id) {
      router.push(paths.playlist.detail(playlistCreated.createPlaylist.id));
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center text-white">
      <div className="text-center space-y-2">
        <h1 className="text-5xl font-bold tracking-tight">Home Page</h1>
        <p className="text-gray-400 mt-2 text-sm">
          Welcome to your music hub. Explore your playlists below.
        </p>

        <button
          className="text-gray-600 hover:text-gray-900 py-1 px-3 bg-white rounded"
          onClick={onCreate}
        >
          {submitting ? <LoadingIcon /> : '+ New Playlist'}
        </button>
      </div>
    </div>
  );
}
