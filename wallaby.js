const babel = require('babel-core');

module.exports = function WallabySettings(wallaby) {
  return {
    files: [{ pattern: 'app/**/*.js' }, { pattern: '__tests__/**/*.spec.js', ignore: true }],
    tests: [{ pattern: '__tests__/**/*.spec.js' }],
    compilers: {
      '**/**/*.js': wallaby.compilers.babel(),
    },
    env: {
      type: 'node',
      runner: 'node',
    },
    debug: true,
    testFramework: 'jest',
  };
};
