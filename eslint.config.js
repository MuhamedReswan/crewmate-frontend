import js from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  {
    ignores: ["dist", "node_modules"],
  },

  js.configs.recommended,

  ...tseslint.configs.recommended,

  {
    files: ["**/*.{ts,tsx}"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },

      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },

    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },

    settings: {
      react: {
        version: "detect",
      },
    },

    rules: {
      // -----------------------------
      // JavaScript
      // -----------------------------
      "no-unused-vars": "off",
      "no-undef": "off",
      "prefer-const": "error",
      "no-useless-catch": "error",
      "no-constant-binary-expression": "error",

      // -----------------------------
      // TypeScript
      // -----------------------------
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^(Messages|Role)$",
          ignoreRestSiblings: true,
        },
      ],

      "@typescript-eslint/no-explicit-any": "warn",

      // -----------------------------
      // React
      // -----------------------------
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/jsx-uses-react": "off",

      // -----------------------------
      // React Hooks
      // -----------------------------
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // -----------------------------
      // React Refresh
      // -----------------------------
      "react-refresh/only-export-components": [
        "warn",
        {
          allowConstantExport: true,
        },
      ],
    },
  },
  eslintConfigPrettier,
];

// // eslint.config.js
// import tseslint from "typescript-eslint";
// import js from "@eslint/js";
// import react from "eslint-plugin-react";
// import reactHooks from "eslint-plugin-react-hooks";
// import globals from "globals";

// export default [
//   {
//     ignores: ["dist", "node_modules"],
//   },
//   ...tseslint.configs.recommended,
//   {
//     files: ["**/*.{ts,tsx,js,jsx}"],
//     languageOptions: {
//       parserOptions: {
//         ecmaVersion: "latest",
//         sourceType: "module",
//         ecmaFeatures: { jsx: true },
//       },
//       globals: {
//         ...globals.browser,
//         ...globals.node,
//       },
//     },
//     plugins: {
//        "@typescript-eslint": tseslint.plugin,
//       react,
//       "react-hooks": reactHooks,
//     },
//     settings: {
//       react: {
//         version: "detect",
//       },
//     },
//     rules: {
//       ...js.configs.recommended.rules,
//       ...react.configs.recommended.rules,
//       ...reactHooks.configs.recommended.rules,
//        "no-undef": "off",
//       "react/react-in-jsx-scope": "off",
//       "@typescript-eslint/no-unused-vars": [
//         "warn",
//         {
//           varsIgnorePattern: "Messages|Role",
//           argsIgnorePattern: "^_",
//         },
//       ],
//     },
//   },
// ];
