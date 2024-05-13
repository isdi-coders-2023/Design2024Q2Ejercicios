import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  resetMocks: true,
  modulePaths: ['<rootDir>'],
  testRegex: '.spec.ts$',
};

// eslint-disable-next-line no-restricted-exports
export default config;
