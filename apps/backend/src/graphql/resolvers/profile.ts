import { MOCKs } from '../../_mock';

const profileResolver = {
  Query: {
    profile: async () => MOCKs.profile,
  },
};
export default profileResolver;
