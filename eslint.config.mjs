// eslint.config.mjs
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import unusedImports from "eslint-plugin-unused-imports";
import importPlugin from "eslint-plugin-import";

export default tseslint.config(
  // 0) Ignore junk globally
  {
    ignores: [
      "**/dist/**",
      "**/build/**",
      "**/.turbo/**",
      "**/.next/**",
      "**/coverage/**",
      "**/*.d.ts",
    ],
  },

  // 1) Base JS rules
  {
    ...js.configs.recommended,
    languageOptions: {
      globals: { ...globals.node, ...globals.browser },
    },
  },

  // 2) Type-checked TS rules (from typescript-eslint)
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,

  // 3) Repo-wide rules
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      parserOptions: {
        // Magic: auto-detect nearest tsconfig.json in each package/app
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },

    settings: {
      "import/resolver": {
        typescript: {
          project: ["packages/*/tsconfig.json", "apps/*/tsconfig.json"],
          alwaysTryTypes: true,
        },
      },
    },

    plugins: {
      "unused-imports": unusedImports,
      import: importPlugin,
    },
    rules: {
      // TS hygiene
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports" },
      ],
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-misused-promises": [
        "error",
        { checksVoidReturn: { attributes: false } },
      ],

      // unused code cleanup
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],

      // import ordering (your custom rule)
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          pathGroups: [
            { pattern: "@/**", group: "internal", position: "after" },
            { pattern: "@daily-walk/**", group: "internal", position: "after" },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
    },
  },

  // 4) Next.js app-specific overrides
  {
    files: ["packages/your-app/**/*.{ts,tsx,js,jsx}"],
    rules: {
      // Allow devDependencies in config/test files
      "import/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: [
            "packages/your-app/next.config.{js,cjs,mjs,ts}",
            "packages/your-app/**/*.config.{js,cjs,mjs,ts}",
            "packages/your-app/**/*.test.{ts,tsx,js,jsx}",
            "packages/your-app/**/*.spec.{ts,tsx,js,jsx}",
            "packages/your-app/jest.setup.{ts,js}",
          ],
        },
      ],
    },
  }
);
