'use strict';

module.exports = {
  extends: ['airbnb-base', 'prettier'],
  env: {
    node: true,
  },

  plugins: ['import'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'script',
    ecmaFeatures: {
      modules: false,
      experimentalObjectRestSpread: true,
    },
  },
  rules: {
    'no-unexpected-multiline': 'off',
    'no-else-return': 'off',
    'no-restricted-syntax': 'off',
    'max-len': 'off',
    'func-names': 'off',
    'import/no-dynamic-require': 'off',
    'no-plusplus': [
      'error',
      {
        allowForLoopAfterthoughts: true,
      },
    ],
    'no-param-reassign': [
      'error',
      {
        props: false,
      },
    ],
    camelcase: [
      'error',
      {
        properties: 'never',
      },
    ],
    'no-underscore-dangle': ['off'],
    strict: [2, 'global'],
    'no-use-before-define': [
      'error',
      {
        functions: false,
      },
    ],
    quotes: ['error', 'single'],
    // we want to force semicolons
    semi: ['error', 'always'],
    // we use 2 spaces to indent our code
    indent: ['error', 2, { SwitchCase: 1 }],
    // we want to avoid useless spaces
    'no-multi-spaces': ['error'],
  },
  globals: {
    _: true,
  },
};
