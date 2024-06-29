module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/stylistic-type-checked',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.app.json'],
    tsconfigRootDir: __dirname,   
  },
  plugins: ['react-refresh'],
  rules: {
    "no-control-regex": 0,
    'react-refresh/only-export-components': "error",
    "@typescript-eslint/array-type": [
      "error",
      {
        "default": "array"
      }
    ],
    "default-param-last": "off",
    "@typescript-eslint/default-param-last": "error"
  },
}