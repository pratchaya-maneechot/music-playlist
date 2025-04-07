'use client';
import { useAuthContext } from '@/auth/hooks';
import PlaylistHeader from '@/components/PlaylistHeader';
import Sidebar from '@/components/Sidebar';
import React, { PropsWithChildren } from 'react';

export default function MainLayout({ children }: PropsWithChildren) {
  const { user } = useAuthContext();
  console.log(user);

  return (
    <div className="flex h-screen bg-[#121212]">
      <Sidebar playlists={[]} />
      <div className="flex-1 overflow-y-auto">
        <PlaylistHeader
          name="My Playlist #1"
          creator={user?.username ?? ''}
          songCount={10}
          duration="3 min 53 sec"
        />
        {children}
      </div>
    </div>
  );
}
