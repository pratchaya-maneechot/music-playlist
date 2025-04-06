import { qryDefs } from '../../application';
import { Resolvers } from '../generated';
import { IAppContext } from '../types';

const restaurantResolver: Resolvers<IAppContext> = {
  Query: {
    searchSongs: async (_args, params, ctx) =>
      await ctx.qrybus.execute(new qryDefs.SearchSongQuery(params.q)),
  },
};
export default restaurantResolver;
