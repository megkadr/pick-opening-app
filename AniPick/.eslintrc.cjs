module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
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
