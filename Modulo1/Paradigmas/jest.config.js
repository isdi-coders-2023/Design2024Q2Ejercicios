module.exports = {
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "tests/**/*.{ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
  ],
  coverageReporters: ["cobertura", "clover", "json", "lcov", "text"],
  testMatch: ["**/*.test.jsx", "**/*.test.tsx", "**/*.test.ts", "**/*.test.js"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": [
      "babel-jest",
      {
        presets: [
          ["@babel/preset-env", { targets: { node: "current" } }],
          ["@babel/preset-react", { runtime: "automatic" }],
          "@babel/preset-typescript",
        ],
      },
    ],
  },

  transformIgnorePatterns: [
    `/node_modules/(?!(swiper|ssr-window|dom7))`,
    "^.+\\.module\\.(css|sass|scss)$",
  ],

  modulePathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/src/main/"],
};
