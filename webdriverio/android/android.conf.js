exports.config = {
  user: process.env.AA_USERNAME || 'BROWSERSTACK_USERNAME',
  key: process.env.AA_ACCESS_KEY || 'BROWSERSTACK_ACCESS_KEY',

  updateJob: false,
  specs: [
    './android/specs/test.js'
  ],
  exclude: [],

  capabilities: [{
    platformName: 'Android',
    'appium:app': process.env.APP || 'bs://<hashed app-id>',
    'bstack:options': {
      deviceName: 'Google Pixel 6',
      osVersion: "12.0",
      appiumVersion: process.env.APPIUM_VERSION || '2.19.0',
      projectName: "First App Percy Project",
      buildName: 'App Percy Webdriverio Android',
      sessionName: 'first_visual_test'
    }
  }],

  logLevel: 'info',
  coloredLogs: true,
  baseUrl: '',
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,

  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 20000
  }
};
