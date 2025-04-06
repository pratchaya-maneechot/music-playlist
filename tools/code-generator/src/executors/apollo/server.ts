import { CodegenConfig, generate } from '@graphql-codegen/cli';
import { PromiseExecutor } from '@nx/devkit';
import { print } from 'graphql';
import { ApolloServerExecutorSchema } from './schema';

const runExecutor: PromiseExecutor<ApolloServerExecutorSchema> = async (
  options,
  ctx
) => {
  const generates = options.generatedPath;
  const typeDefs = require(options.schemaPath).typeDefs;

  const config: CodegenConfig & { name?: string } = {
    name: ctx.projectName,
    overwrite: true,
    schema: print(typeDefs),
    generates: {
      [generates]: {
        plugins: ['typescript', 'typescript-resolvers'],
        config: { federation: true },
      },
    },
  };
  await generate(config);
  return {
    success: true,
  };
};

export default runExecutor;
