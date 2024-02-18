import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: [
    'schema/types.graphql',
    'schema/mutation.graphql',
    'schema/query.graphql',
  ],
  generates: {
    'src/resolvers-types.ts': {
      config: {
        useIndexSignature: true,
      },
      plugins: ['typescript', 'typescript-resolvers'],
    },
  },
  verbose: true,
};
export default config;
