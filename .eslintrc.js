module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ["prettier", "plugin:react-hooks/recommended"],
  plugins: ["prettier", "react-hooks"],
  rules: { "react/prop-types": 0 },
};
