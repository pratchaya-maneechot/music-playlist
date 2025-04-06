import { MOCKs } from '../../_mock';
import { Resolvers } from '../generated';
import { IAppContext } from '../types';

const profileResolver: Resolvers<IAppContext> = {
  Query: {
    profile: async () => MOCKs.profile,
  },
};
export default profileResolver;
