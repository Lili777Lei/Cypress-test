/// <reference types = "cypress" />
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  
  chromeWebSecurity: false,
  e2e: {
    baseUrl:'https://cms-lyart.vercel.app',
    defaultCommandTimeout: 7000,

    //setupNodeEvents(on, config) {
      // implement node event listeners here
    
  },
  env: {
    managerToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hbmFnZXJAYWRtaW4uY29tIiwicm9sZSI6Im1hbmFnZXIiLCJpZCI6MywiaWF0IjoxNjY3MjcyOTM5LCJleHAiOjE2NzUwNDg5Mzl9.wy02uPfHipIHcYEssN_HaY_mf3WyzY8WZFrUvJKmXjY',
    prod:'http://cms.chtoma.com',
  }
});
