import HomeView from '@/sctions/home/Home';
export default async function Home() {
  return (
    <HomeView
      loadedSongs={[
        {
          id: 1,
          title: 'Love Yourself',
          artist: 'Justin Bieber',
          album: 'Purpose (Deluxe)',
          duration: '3:53',
          releaseDate: '0 seconds ago',
        },
      ]}
    />
  );
}
