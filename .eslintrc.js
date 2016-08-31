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
    "no-eval": ["error"],
    "brace-style": ["error", "1tbs", { "allowSingleLine": true }],
    "func-style": ["error", "declaration", { "allowArrowFunctions": true }],
    "max-len": ["warn", 100],
    "no-mixed-spaces-and-tabs": ["error"],
    "no-trailing-spaces": ["error"],
    "object-curly-spacing": ["error", "always"],
    "semi-spacing": ["error"],
    "arrow-body-style": ["error"],
    "arrow-parens": ["warn", "always"],
    "arrow-spacing": ["error"],
    "no-confusing-arrow": ["warn"],
    "no-const-assign": ["error"],
    "no-var": ["error"],
    "prefer-arrow-callback": ["error", { "allowNamedFunctions": true }],
    "prefer-rest-params": ["error"],
    "require-yield": ["error"],
    "template-curly-spacing": ["error"]
  }
};
