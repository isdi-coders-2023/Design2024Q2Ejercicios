module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testRegex: ".*\\.spec\\.ts$",
  moduleFileExtensions: ["ts", "js"],
  collectCoverage: true,
  coverageReporters: ["html", "text-summary"],
};
