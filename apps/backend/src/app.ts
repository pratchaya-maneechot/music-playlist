import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import express, { Express, Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import http from 'http';
import {
  CORS_HEADERS,
  CORS_METHODS,
  DEFAULT_PORT,
  GRAPHQL_PATH,
  HEALTH_PATH,
  JSON_LIMIT,
  RATE_LIMIT_MAX,
  RATE_LIMIT_WINDOW_MS,
} from './config/const';
import { graphqlServer } from './graphql';
import { createContext } from './graphql/context';
import { logger } from './utils/logger';
import { expressLogger } from './utils/express-logger';
import { Container } from 'inversify';
import { initializes } from './initialize';

interface ServerConfig {
  port: number;
  corsOrigins: string[] | undefined;
  isProd: boolean;
  container: Container;
}

async function startServer(config: ServerConfig): Promise<http.Server> {
  const { port, corsOrigins, isProd, container } = config;
  const app: Express = express();
  const httpServer = http.createServer(app);

  app.use(
    cors({
      origin: corsOrigins,
      methods: CORS_METHODS,
      allowedHeaders: CORS_HEADERS,
    })
  );

  app.use(express.json({ limit: JSON_LIMIT }));

  if (isProd) {
    app.set('trust proxy', 1);
    app.use(
      rateLimit({
        windowMs: RATE_LIMIT_WINDOW_MS,
        max: RATE_LIMIT_MAX,
        message: { error: 'Too many requests, please try again later.' },
      })
    );
  }

  app.get(HEALTH_PATH, (_req: Request, res: Response) => {
    res
      .status(200)
      .json({ status: 'healthy', timestamp: new Date().toISOString() });
  });
  app.use(expressLogger());
  const apolloServer = await graphqlServer(httpServer);
  app.use(
    GRAPHQL_PATH,
    expressMiddleware(apolloServer, {
      context: async ({ req }) => createContext(req, container),
    })
  );

  return new Promise((resolve) => {
    httpServer.listen({ port }, () => {
      logger.info(
        `🚀 Server ready at http://localhost:${port}${GRAPHQL_PATH}`,
        { HELLO: 'SSSS' }
      );
      resolve(httpServer);
    });
  });
}

function setupGracefulShutdown(server: http.Server): void {
  const shutdownSignals: NodeJS.Signals[] = ['SIGTERM', 'SIGINT'];

  process.on('warning', (warning) => {
    logger.warn(`Process warning: ${warning.message}`, {
      stack: warning.stack,
    });
  });

  process.on('uncaughtException', (error) => {
    logger.error('Uncaught Exception:', { error, stack: error.stack });
    shutdownServer(server, 1);
  });

  process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection:', { promise, reason });
    shutdownServer(server, 1);
  });

  shutdownSignals.forEach((signal) => {
    process.on(signal, async () => {
      logger.info(`Received ${signal}, initiating graceful shutdown...`);
      shutdownServer(server, 0);
    });
  });
}

function shutdownServer(server: http.Server, exitCode: number): void {
  server.close((err) => {
    if (err) {
      logger.error('Error during server shutdown:', { error: err });
      process.exit(1);
    }
    logger.info('Server shut down successfully.');
    process.exit(exitCode);
  });
}

export async function run(): Promise<void> {
  try {
    const config: ServerConfig = {
      port: Number(process.env.PORT) || DEFAULT_PORT,
      corsOrigins: process.env.CORS?.split(','),
      isProd: process.env.NODE_ENV === 'production',
      container: await initializes(),
    };

    const server = await startServer(config);
    setupGracefulShutdown(server);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
