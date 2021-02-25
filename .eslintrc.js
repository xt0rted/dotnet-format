module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint",
  ],
  rules: {
    "array-bracket-spacing": "error",
    "comma-dangle": ["error", "always-multiline"],
    eqeqeq: ["error", "smart"],
    indent: ["error", 2],
    "object-curly-newline": ["error", {
      ExportDeclaration: {
        multiline: true,
        minProperties: 2,
      },
      ImportDeclaration: {
        multiline: true,
        minProperties: 2,
      },
      ObjectExpression: {
        multiline: true,
        minProperties: 2,
      },
      ObjectPattern: { consistent: true },
    }],
    "object-shorthand": "error",
    quotes: ["error", "double"],
    "quote-props": ["error", "as-needed"],
    semi: "error",
    // strings
    "no-nonoctal-decimal-escape": "error",
    // variables
    "no-const-assign": "error",
    "no-var": "error",
    "prefer-const": "error",
    // arrow functions
    "arrow-body-style": ["error", "as-needed"],
    "arrow-parens": ["error", "always"],
    "arrow-spacing": ["error", {
      before: true, after: true,
    }],
    "implicit-arrow-linebreak": ["error", "beside"],
    "prefer-arrow-callback": "error",
    // classes
    "class-methods-use-this": "error",
    "no-dupe-class-members": "error",
    "no-useless-constructor": "error",
    // modules
    "no-duplicate-imports": ["error", { includeExports: true }],
  },
  overrides: [
    {
      files: ["*.ts"],
      extends: [
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
      parserOptions: {
        project: "./tsconfig.json",
        sourceType: "module",
      },
      rules: {
        camelcase: "off",
        indent: "off",
        quotes: "off",
        "@typescript-eslint/indent": ["error", 2],
        "@typescript-eslint/naming-convention": [
          "error",
          // eslint defaults
          {
            selector: "default",
            format: ["camelCase"],
          },
          {
            selector: "variable",
            format: ["camelCase", "UPPER_CASE"],
          },
          {
            selector: "parameter",
            format: ["camelCase"],
            leadingUnderscore: "allow",
          },
          {
            selector: "memberLike",
            modifiers: ["private"],
            format: ["camelCase"],
            leadingUnderscore: "require",
          },
          {
            selector: "typeLike",
            format: ["PascalCase"],
          },
          // project specific settings
          {
            selector: "enumMember",
            format: ["StrictPascalCase"],
          },
          {
            selector: "property",
            format: null,
          },
        ],
        "@typescript-eslint/quotes": ["error", "double"],
      },
    },
  ],
};
