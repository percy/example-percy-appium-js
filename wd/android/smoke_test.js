const percyScreenshot = require('@percy/appium-app');
const wd = require('wd');
var asserters = wd.asserters;

// Note: While this example shows how to use percyScreenshot with Browserstack App
// Automate, percyScreenshot method just expects a initialized driver object and does
// not care if its connected to App Automate or any other appium server. 
// You are free to create `driver` object anyway you want and can pass it
// to the percyScreenshot function.

const desiredCaps = {
  // Set BStack options that would allow App Automate to run
  'bstack:options': {
    userName: process.env.BROWSERSTACK_USERNAME,
    accessKey: process.env.BROWSERSTACK_ACCESS_KEY
  },

  // Percy Options (defaults)
  'percyOptions': {
    enabled: true,
    ignoreErrors: true
  },

  // Set URL of the application under test
  app: process.env.APP_URL,

  // Specify device and os_version for testing
  device: 'Samsung Galaxy S21 Ultra',
  os_version: '11',

  // Set other BrowserStack capabilities
  project: 'POA App Percy',
  build: 'App Percy Smoke Test - Android',
  name: 'Smoke test'
};

// Initialize the remote Webdriver using BrowserStack remote URL
// and desired capabilities defined above
const driver = wd.promiseRemote('https://hub-cloud.browserstack.com/wd/hub');

// Test case for the BrowserStack sample Android app.
// If you have uploaded your app, update the test case here.
driver.init(desiredCaps)
  .then(function() {
    // wait for app to load
    return new Promise((resolve) => setTimeout(resolve, 5000))
  })
  .then(function () {
    return driver.waitForElementByAccessibilityId('History', asserters.isDisplayed && asserters.isEnabled, 30000);
  })
  .then(function (searchElement) {
    return searchElement.click();
  })
  .then(function() {
    return percyScreenshot(driver, 'History tab');
  })
  .then(function () {
    return driver.waitForElementByAccessibilityId('My lists', asserters.isDisplayed && asserters.isEnabled, 30000);
  })
  .then(function (searchElement) {
    return searchElement.click();
  })
  .then(function() {
    return percyScreenshot(driver, 'Lists tab');
  })
  .fin(function() {
    // Invoke driver.quit() after the test is done to indicate that the test is completed.
    return driver.quit();
  })
  .done();
