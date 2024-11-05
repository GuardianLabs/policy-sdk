import typescriptEslint from "@typescript-eslint/eslint-plugin";
import unusedImports from "eslint-plugin-unused-imports";
import mocha from "eslint-plugin-mocha";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: [
      "node_modules/",
      "**/node_modules",
      "**/dist",
      "eslint.config.*",
    ],
  },
  ...compat.extends(
    "plugin:prettier/recommended",
    "plugin:n/recommended",
    "plugin:promise/recommended",
  ),
  {
    plugins: {
      "@typescript-eslint": typescriptEslint,
      "unused-imports": unusedImports,
      mocha,
    },

    files: ["src/**/*.ts", "test/**/*.ts"],

    languageOptions: {
      globals: {
        ...Object.fromEntries(
          Object.entries(globals.browser).map(([key]) => [key, "off"]),
        ),
        ...globals.mocha,
        ...globals.node,
      },

      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.lint.json",
      },
      ecmaVersion: 14,
      sourceType: "commonjs",
    },

    rules: {
      "n/no-unsupported-features/es-syntax": [
        "error",
        {
          ignores: ["modules"],
        },
      ],

      "n/no-extraneous-import": [
        "error",
        {
          allowModules: [],
        },
      ],

      "n/no-unpublished-import": "off",

      "unused-imports/no-unused-imports": "error",

      "n/no-missing-import": [
        "error",
        {
          tryExtensions: [".js", ".json", ".node", ".ts"],
        },
      ],

      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto",
        },
      ],

      camelcase: [
        "error",
        {
          ignoreImports: true,
          allow: ["__factory$"],
        },
      ],

      "n/no-process-exit": "off",
    },
  },
];
