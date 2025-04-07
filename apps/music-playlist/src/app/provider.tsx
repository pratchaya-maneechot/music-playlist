import { AuthProvider } from '@/auth/context';
import { ApolloProvider } from '@/graphql/apollo/apollo-provider';
import React, { PropsWithChildren } from 'react';

export default function AppProvider({ children }: PropsWithChildren) {
  return (
    <ApolloProvider>
      <AuthProvider>{children}</AuthProvider>
    </ApolloProvider>
  );
}
