const restaurantResolver = {
  Query: {
    playlist: async () => null,
    playlists: async () => [],
  },
  Mutation: {
    createPlaylist: async () => null,
    updatePlaylist: async () => null,
    deletePlaylist: async () => null,
    addSongToPlaylist: async () => null,
    removeSongFromPlaylist: async () => null,
  },
};
export default restaurantResolver;
