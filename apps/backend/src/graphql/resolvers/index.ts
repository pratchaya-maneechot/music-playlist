import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeResolvers } from '@graphql-tools/merge';
import { join } from 'path';
import { IResolvers } from '@graphql-tools/utils';

const resolverFiles = loadFilesSync(join(__dirname, '.'), {
  recursive: true,
  extensions: ['.ts', '.js'],
  ignoredExtensions: ['.d.ts'],
  ignoreIndex: true,
});

export const resolvers: IResolvers = mergeResolvers(resolverFiles);
