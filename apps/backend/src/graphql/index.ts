import { ApolloServer, ApolloServerPlugin } from '@apollo/server';
import {
  ApolloServerPluginInlineTraceDisabled,
  ApolloServerPluginLandingPageDisabled,
} from '@apollo/server/plugin/disabled';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import http from 'http';
import { IAppContext } from './types';
import { ApolloLoggerPlugin } from '../utils/graphql-logger';
import { logger } from '../utils/logger';
import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';

export async function graphqlServer(
  httpServer: http.Server<
    typeof http.IncomingMessage,
    typeof http.ServerResponse
  >
) {
  const plugins: ApolloServerPlugin<IAppContext>[] = [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    ApolloServerPluginInlineTraceDisabled(),
    ApolloLoggerPlugin(),
  ];

  if (process.env.NODE_ENV === 'production') {
    plugins.push(ApolloServerPluginLandingPageDisabled());
  }

  const server = new ApolloServer({
    resolvers,
    typeDefs,
    plugins,
    logger,
  });

  await server.start();

  return server;
}
