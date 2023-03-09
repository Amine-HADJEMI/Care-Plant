const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'cs78sx',
  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },

  e2e: {
    baseUrl: 'http://localhost:19006',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});