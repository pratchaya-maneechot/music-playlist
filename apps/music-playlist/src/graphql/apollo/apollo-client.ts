import { config } from '@/config-global';
import { HttpLink } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client-integration-nextjs';

export function makeClient() {
  const httpLink = new HttpLink({
    uri: config.GRAPHQL_ENDPOINT,
    fetchOptions: { cache: 'no-store' },
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
  });
}
