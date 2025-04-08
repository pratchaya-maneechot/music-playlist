import { config } from '@/config-global';
import { HttpLink } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client-integration-nextjs';
import { onError } from '@apollo/client/link/error';

const httpLink = new HttpLink({
  uri: config.GRAPHQL_ENDPOINT,
});

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      console.log(graphQLErrors);
      alert(graphQLErrors.map((err) => err.message).join(','));
      return;
    }

    if (networkError) {
      console.error(networkError);
      alert(`[Network error]: ${networkError.message}`);
      return;
    }
  }
);

export function makeClient() {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: errorLink.concat(httpLink),
  });
}
