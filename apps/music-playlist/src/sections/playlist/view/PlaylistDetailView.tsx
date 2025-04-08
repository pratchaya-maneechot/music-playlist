'use client';
import { useAuthContext } from '@/auth/hooks';
import PlaylistHeader from '@/sections/playlist/PlaylistHeader';
import PlaylistSearchBar from '@/sections/playlist/PlaylistSearchBar';
import PlaylistSongList from '@/sections/playlist/PlaylistSongList';
import { useGetPlaylistQuery } from '@/graphql/generated';
import { notFound } from 'next/navigation';
import { calculateTotalDurationFromStrings } from '../utils';
import LoadingScreen from '@/components/LoadingScreen';
type Props = {
  id: string;
};
export default function PlaylistDetailView({ id }: Props) {
  const { user } = useAuthContext();
  const { loading, data } = useGetPlaylistQuery({ variables: { id } });

  if (loading) {
    return <LoadingScreen />;
  }

  if (!data?.playlist) {
    notFound();
  }

  return (
    <>
      <PlaylistHeader
        name={data.playlist.name}
        creator={user?.username ?? ''}
        songCount={data.playlist.songs?.length ?? 0}
        duration={calculateTotalDurationFromStrings(data.playlist.songs ?? [])}
      />
      <div>
        {data.playlist.songs && (
          <PlaylistSongList playlistId={id} songs={data.playlist.songs ?? []} />
        )}
        <PlaylistSearchBar playlistId={id} />
      </div>
    </>
  );
}
