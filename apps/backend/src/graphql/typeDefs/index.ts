import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { join } from 'path';

const typeDefsArray = loadFilesSync(join(__dirname, '.'), {
  recursive: true,
  extensions: ['.graphql'],
  ignoreIndex: true,
});
export const typeDefs = mergeTypeDefs(typeDefsArray);
