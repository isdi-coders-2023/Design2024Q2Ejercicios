module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: [".eslintrc.cjs", "./Modulo1/Paradigmas/exercises/FP/*.{ts,tsx,js,jsx}" ],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
  overrides: [
    {
      files: "**/src/**/*.{ts,tsx,js,jsx}",
      rules: {
        "@typescript-eslint/no-explicit-any": "off",
      },
    },
    {
      files: "./Modulo1/Paradigmas/exercises/FP/*.{ts,tsx,js,jsx}",
      rules: {
        "*": "off",
      },
    },
  ],
};
