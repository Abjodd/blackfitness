module.exports = {
  env: {
    node: true, // Enable Node.js globals
    es2021: true,
  },
  globals: {
    module: "readonly",
    require: "readonly",
    exports: "writable",
    process: "readonly",
    console: "readonly", // Add this line
  },
  extends: ["eslint:recommended", "google"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    "no-unused-vars": "warn",
    "no-undef": "off", // Disable undef checks for globals
  },
};