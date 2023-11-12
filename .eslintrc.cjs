module.exports = {
  root: true,
  env: {
    es6: true,
  },
  plugin: ['react'],
  extends: ["plugin:storybook/recommended", "plugin:@typescript-eslint/recommended"],
  parser: '@typescript-eslint/parser',
  parserOptions: { "project": ["./tsconfig.json"] },
  plugins: ['@typescript-eslint'],
  "parserOptions": {
    "sourceType": "module",
  }
  /*   rules: [] */
};