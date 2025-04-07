// ----------------------------------------------------------------------

import { User } from '@/graphql/generated';

export type AuthUserType = null | Pick<User, 'id' | 'email' | 'username'>;

export type AuthStateType = {
  status?: string;
  loading: boolean;
  user: AuthUserType;
};

export type JWTContextType = {
  user: AuthUserType;
  method: string;
  loading: boolean;
  authenticated: boolean;
  unauthenticated: boolean;
};

export type ActionMapType<M extends { [index: string]: unknown }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};
