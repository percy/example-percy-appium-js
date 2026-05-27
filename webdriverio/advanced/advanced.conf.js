// PER-8195 Phase 2 — advanced wdio config for @percy/appium-app.
// Runs against the BrowserStack App Automate hub by default (requires
// AA_USERNAME, AA_ACCESS_KEY, APP env vars). The single spec exercises
// every applicable matrix row via per-screenshot options.

exports.config = {
  user: process.env.AA_USERNAME || 'BROWSERSTACK_USERNAME',
  key: process.env.AA_ACCESS_KEY || 'BROWSERSTACK_ACCESS_KEY',

  updateJob: false,
  specs: ['./specs/advanced.test.js'],
  exclude: [],

  capabilities: [
    {
      project: process.env.BROWSERSTACK_PROJECT_NAME || 'Percy Appium App Advanced Example',
      build: process.env.BROWSERSTACK_BUILD_NAME || 'App Percy Advanced Wdio Android',
      name: 'advanced_visual_test',
      device: process.env.DEVICE || 'Google Pixel 6',
      os_version: process.env.OS_VERSION || '12.0',
      app: process.env.APP || 'bs://<hashed app-id>',
    },
  ],

  logLevel: 'warn',
  coloredLogs: true,
  baseUrl: '',
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,

  framework: 'mocha',
  mochaOpts: { ui: 'bdd', timeout: 60000 },
}
