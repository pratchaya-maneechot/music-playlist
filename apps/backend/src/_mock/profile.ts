import { User } from '../graphql/generated';

export const profile: User = {
  createdAt: new Date().toISOString(),
  email: 'email@gmail.com',
  id: '1',
  playlists: [],
  updatedAt: 'updatedAt',
  username: 'Pratchaya Maneechot',
};
