'use client';

import { ApolloNextAppProvider } from '@apollo/client-integration-nextjs';
import { makeClient } from './apollo-client';

export function ApolloProvider({ children }: React.PropsWithChildren) {
  return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>;
}
