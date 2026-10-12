exports.config = {
  user: process.env.AA_USERNAME || 'BROWSERSTACK_USERNAME',
  key: process.env.AA_ACCESS_KEY || 'BROWSERSTACK_ACCESS_KEY',

  updateJob: false,
  specs: [
    './ios/specs/test.js'
  ],
  exclude: [],

  capabilities: [{
    platformName: 'iOS',
    'appium:app': process.env.APP || 'bs://<hashed app-id>',
    'bstack:options': {
      deviceName: 'iPhone 12 Pro',
      osVersion: "17",
      appiumVersion: process.env.APPIUM_VERSION || '2.19.0',
      projectName: "First App Percy Project",
      buildName: 'App Percy Webdriverio iOS',
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
