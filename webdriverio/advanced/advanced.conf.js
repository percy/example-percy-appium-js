// PER-8195 Phase 2 — advanced wdio config for @percy/appium-app.
// Runs against the BrowserStack App Automate hub by default (requires
// AA_USERNAME, AA_ACCESS_KEY, APP env vars). The single spec exercises
// every applicable matrix row via per-screenshot options.

// PLATFORM selects the device/os defaults (android | ios). The CI workflow
// sets it and supplies the matching APP (Android: APP_BS_URL, iOS:
// APP_BS_URL_IOS). DEVICE / OS_VERSION env vars still override per-run.
const isIOS = (process.env.PLATFORM || 'android').toLowerCase() === 'ios'

exports.config = {
  user: process.env.AA_USERNAME || 'BROWSERSTACK_USERNAME',
  key: process.env.AA_ACCESS_KEY || 'BROWSERSTACK_ACCESS_KEY',

  updateJob: false,
  specs: ['./specs/advanced.test.js'],
  exclude: [],

  capabilities: [
    {
      project: process.env.BROWSERSTACK_PROJECT_NAME || 'Percy Appium App Advanced Example',
      build: process.env.BROWSERSTACK_BUILD_NAME || `App Percy Advanced Wdio ${isIOS ? 'iOS' : 'Android'}`,
      name: 'advanced_visual_test',
      device: process.env.DEVICE || (isIOS ? 'iPhone 15' : 'Google Pixel 6'),
      os_version: process.env.OS_VERSION || (isIOS ? '17' : '12.0'),
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
