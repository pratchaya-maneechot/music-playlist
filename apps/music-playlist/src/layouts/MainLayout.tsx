'use client';
import { useAuthContext } from '@/auth/hooks';
import Sidebar from '@/components/Sidebar';
import {
  GetPlaylistsDocument,
  useCreatePlaylistMutation,
  useDeletePlaylistMutation,
  useGetPlaylistsQuery,
} from '@/graphql/generated';
import { paths } from '@/routes/paths';
import { IPlaylist } from '@/types/playlist';
import { useRouter } from 'next/navigation';
import React, { PropsWithChildren } from 'react';

export default function MainLayout({ children }: PropsWithChildren) {
  const { loading, deleting, submitting, onCreate, onDelete, playlists } =
    useMainLayout();
  return (
    <div className="flex h-screen bg-[#121212]">
      {!!playlists.length && (
        <Sidebar
          loading={loading}
          deleting={deleting}
          submitting={submitting}
          onNewPlaylist={onCreate}
          onDeletePlaylist={onDelete}
          playlists={playlists}
        />
      )}
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}

function useMainLayout() {
  const { user } = useAuthContext();
  const router = useRouter();
  const [callDeletePlaylist, { loading: deleting }] =
    useDeletePlaylistMutation();
  const [callCreatePlaylist, { loading: submitting }] =
    useCreatePlaylistMutation();
  const { loading, data } = useGetPlaylistsQuery({
    variables: { userId: user?.id as string },
    skip: !user,
  });

  const refetchPlaylistQueries = [
    {
      query: GetPlaylistsDocument,
      variables: { userId: user?.id as string },
    },
  ];

  const onCreate = async () => {
    const { data: playlistCreated } = await callCreatePlaylist({
      variables: { name: `My Playlist #${(data?.playlists?.length ?? 0) + 1}` },
      refetchQueries: refetchPlaylistQueries,
    });

    if (playlistCreated?.createPlaylist.id) {
      router.push(paths.playlist.detail(playlistCreated.createPlaylist.id));
    }
  };

  const onDelete = (item: IPlaylist) => {
    if (confirm('Are you sure?')) {
      callDeletePlaylist({
        variables: { id: item.id },
        refetchQueries: refetchPlaylistQueries,
      });
      router.push(paths.home);
    }
  };

  return {
    playlists: data?.playlists ?? [],
    deleting,
    submitting,
    loading,
    onCreate,
    onDelete,
  };
}
