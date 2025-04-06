import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeResolvers } from '@graphql-tools/merge';
import { join } from 'path';

const resolverFiles = loadFilesSync(join(__dirname, '.'), {
  recursive: true,
  extensions: ['.ts', '.js'],
  ignoredExtensions: ['.d.ts'],
});
export const resolvers = mergeResolvers(resolverFiles);
