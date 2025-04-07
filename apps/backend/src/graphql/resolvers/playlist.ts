import { cmdDefs, qryDefs } from '../../application';
import { Resolvers } from '../generated';
import { IAppContext } from '../types';

const restaurantResolver: Resolvers<IAppContext> = {
  Query: {
    playlist: async (_args, params, ctx) =>
      await ctx.qrybus.execute(new qryDefs.GetPlaylistQuery(+params.id)),
    playlists: async (_args, _params, ctx) =>
      await ctx.qrybus.execute(new qryDefs.GetPlaylistsQuery(ctx.identity.id)),
  },
  Mutation: {
    createPlaylist: async (_args, params, ctx) => {
      const createdData = await ctx.cmdbus.send(
        new cmdDefs.CreatePlaylistCommand({
          userId: ctx.identity.id,
          name: params.name,
        })
      );
      return createdData;
    },
    updatePlaylist: async (_args, params, ctx) => {
      const updatedData = await ctx.cmdbus.send(
        new cmdDefs.UpdatePlaylistCommand(+params.id, {
          name: params.name ?? undefined,
        })
      );
      return updatedData;
    },
    deletePlaylist: async (_args, params, ctx) => {
      await ctx.cmdbus.send(new cmdDefs.DeletePlaylistCommand(+params.id));
      return true;
    },
    addSongToPlaylist: async (_args, params, ctx) => {
      await ctx.cmdbus.send(
        new cmdDefs.AddSongToPlaylistCommand({
          referenceId: +params.referenceId,
          playlistId: +params.playlistId,
        })
      );
      return true;
    },
    removeSongFromPlaylist: async (_args, params, ctx) => {
      await ctx.cmdbus.send(
        new cmdDefs.RemoveSongFromPlaylistCommand({
          songId: +params.songId,
          playlistId: +params.playlistId,
        })
      );
      return true;
    },
  },
  Playlist: {
    songs: async (args, params, ctx) => {
      return await ctx.qrybus.execute(new qryDefs.GetSongsQuery(+args.id));
    },
  },
};
export default restaurantResolver;
