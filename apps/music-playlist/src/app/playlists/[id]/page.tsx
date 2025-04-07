import PlaylistView from '@/sections/playlist/view/PlaylistDetailView';

export const metadata = {
  title: 'Playlist: Details',
};

type Props = {
  params: {
    id: string;
  };
};
export default function page({ params }: Props) {
  return <PlaylistView id={params.id} />;
}
