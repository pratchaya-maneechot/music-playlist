'use client';
import { useAuthContext } from '@/auth/hooks';
import Sidebar from '@/components/Sidebar';
import {
  GetPlaylistsDocument,
  useCreatePlaylistMutation,
  useDeletePlaylistMutation,
  useGetPlaylistsQuery,
} from '@/graphql/generated';
import { IPlaylist } from '@/types/playlist';
import React, { PropsWithChildren } from 'react';

export default function MainLayout({ children }: PropsWithChildren) {
  const { loading, deleting, submitting, onCreate, onDelete, playlists } =
    useMainLayout();
  return (
    <div className="flex h-screen bg-[#121212]">
      <Sidebar
        loading={loading}
        deleting={deleting}
        submitting={submitting}
        onNewPlaylist={onCreate}
        onDeletePlaylist={onDelete}
        playlists={playlists}
      />
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}

function useMainLayout() {
  const { user } = useAuthContext();
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
    await callCreatePlaylist({
      variables: { name: `My Playlist #${(data?.playlists?.length ?? 0) + 1}` },
      refetchQueries: refetchPlaylistQueries,
    });
  };

  const onDelete = (item: IPlaylist) => {
    if (confirm('Are you sure?')) {
      callDeletePlaylist({
        variables: { id: item.id },
        refetchQueries: refetchPlaylistQueries,
      });
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
