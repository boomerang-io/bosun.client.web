module.exports = {
  extends: ["react-app", "plugin:jest/recommended", "plugin:jsx-a11y/recommended"],
  plugins: ["jest", "jsx-a11y"],
  env: {
    "jest/globals": true
  },
  overrides: [
    {
      files: ["*.spec.js"],
      rules: {
        "no-unused-expressions": "off",
        "no-unused-vars": "off",
        "jest/no-commented-out-tests": "off"
      }
    }
  ],
  globals: {
    cy: true,
    shallow: true,
    render: true,
    mount: true,
    renderer: true,
    rtlRender: true,
    rtlReduxRender: true,
    rtlRouterRender: true,
    rtlReduxRouterRender: true,
    rtlContextRouterRender: true,
    cy: true
  }
};
