module.exports = {
  env: {
    browser: false,
    es2023: true,
    mocha: true,
    node: true,
  },
  plugins: ['@typescript-eslint', 'unused-imports'],
  extends: ['plugin:prettier/recommended', 'plugin:n/recommended', 'plugin:promise/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 14,
  },
  rules: {
    'n/no-unsupported-features/es-syntax': [
      'error',
      { ignores: ['modules'] },
    ],
    'n/no-missing-import': [
      'error',
      {
        // todo: typescript approach
        tryExtensions: ['.js', '.json', '.node', '.ts'],
      },
    ],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'n/no-process-exit': 'off',
    camelcase: [
      'error',
      {
        ignoreImports: true,
        allow: ['__factory$'],
      },
    ],
  },
};
