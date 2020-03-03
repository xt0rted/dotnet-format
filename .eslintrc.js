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
    indent: ["error", 2],
    "object-shorthand": "error",
    quotes: ["error", "double"],
    semi: "error",
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
        "@typescript-eslint/camelcase": ["error", {
          properties: "always",
          genericType: "always",
          ignoreDestructuring: false,
          allow: [
            "pull_number",
          ],
        }],
        "@typescript-eslint/indent": ["error", 2],
        "@typescript-eslint/quotes": ["error", "double"],
      },
    },
  ],
};
