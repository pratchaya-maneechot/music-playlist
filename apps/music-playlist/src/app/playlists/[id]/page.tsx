import PlaylistView from '@/sections/playlist/view/PlaylistDetailView';

export const metadata = {
  title: 'Playlist: Details',
};

type Props = {
  params: Promise<{
    id: string;
  }>;
};
export default async function page({ params }: Props) {
  const id = (await params).id;
  return <PlaylistView id={id} />;
}
