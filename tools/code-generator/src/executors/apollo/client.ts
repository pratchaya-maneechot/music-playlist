import { PromiseExecutor } from '@nx/devkit';
import { ApolloCodeGenExecutorSchema } from './schema';
import { CodegenConfig, generate } from '@graphql-codegen/cli';
import { print } from 'graphql';

const runExecutor: PromiseExecutor<ApolloCodeGenExecutorSchema> = async (
  options,
  ctx
) => {
  const generates = options.generatedPath;
  const typeDefs = require(options.schemaPath).typeDefs;

  const config: CodegenConfig & { name?: string } = {
    name: ctx.projectName,
    overwrite: true,
    schema: print(typeDefs),
    documents: options.documentPath,
    generates: {
      [generates]: {
        plugins: [
          'typescript',
          'typescript-operations',
          'typescript-react-apollo',
        ],
        config: {
          withHooks: true,
          withRefetchFn: true,
          withMutationFn: true,
        },
      },
    },
  };
  await generate(config);
  return {
    success: true,
  };
};

export default runExecutor;
