module.exports = {
  default: {
    paths: ['test/**/*.feature'],
    requireModule: ['ts-node/register', 'tsconfig-paths/register'],
    require: ['test/acceptance/**/*.ts'],
    format: ['summary'],
  },
};
