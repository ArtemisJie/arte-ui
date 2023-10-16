module.exports = {
  root: true,
  env: {
    es6: true,
  },
  // plugin: ['react'],
  extends: ["plugin:storybook/recommended"],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  "parserOptions": {
    "sourceType": "module",
  }
  /*   rules: [] */
};