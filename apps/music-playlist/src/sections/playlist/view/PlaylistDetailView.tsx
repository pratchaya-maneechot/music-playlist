'use client';
import { useAuthContext } from '@/auth/hooks';
import PlaylistHeader from '@/sections/playlist/PlaylistHeader';
import PlaylistSearchBar from '@/sections/playlist/PlaylistSearchBar';
import PlaylistSongList from '@/sections/playlist/PlaylistSongList';
import { useGetPlaylistQuery } from '@/graphql/generated';
import { calculateTotalDurationFromStrings } from '../utils';
type Props = {
  id: string;
};
export default function PlaylistDetailView({ id }: Props) {
  const { user } = useAuthContext();
  const { loading, data } = useGetPlaylistQuery({ variables: { id } });

  if (loading) {
    return <>Loading...</>;
  }

  return (
    <>
      {data?.playlist && (
        <PlaylistHeader
          name={data.playlist.name}
          creator={user?.username ?? ''}
          songCount={data.playlist.songs?.length ?? 0}
          duration={calculateTotalDurationFromStrings(
            data.playlist.songs ?? []
          )}
        />
      )}
      <div>
        {data?.playlist?.songs && (
          <PlaylistSongList songs={data.playlist.songs ?? []} />
        )}
        <PlaylistSearchBar playlistId={id} />
      </div>
    </>
  );
}
