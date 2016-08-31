module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  },
  extends: 'eslint:recommended',
  env: {
    'browser': true
  },
  rules: {
    "no-eval": [2],
    "brace-style": [2, "1tbs", { "allowSingleLine": true }],
    "func-style": [2, "declaration", { "allowArrowFunctions": true }],
    "max-len": [1, 100],
    "no-mixed-spaces-and-tabs": [2],
    "no-trailing-spaces": [2],
    "object-curly-spacing": [2, "always"],
    "semi-spacing": [2],
    "arrow-body-style": [2],
    "arrow-parens": [1, "always"],
    "arrow-spacing": [2],
    "no-confusing-arrow": [1],
    "no-const-assign": [2],
    "no-var": [2],
    "prefer-arrow-callback": [2, { "allowNamedFunctions": true }],
    "prefer-rest-params": [2],
    "require-yield": [2],
    "template-curly-spacing": [2]
  }
};
