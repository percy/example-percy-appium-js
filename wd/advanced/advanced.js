// PER-8195 Phase 2 — appium-js wd-driver advanced example.
// Sequentially exercises one matrix row per percyScreenshot call.
// See ../../matrix.yml (or this dir's matrix.yml) for the canonical mapping.
//
// Run against the BrowserStack App Automate hub. Requires AA_USERNAME,
// AA_ACCESS_KEY, APP env vars. See README.md.

const percyScreenshot = require('@percy/appium-app')
const wd = require('wd')

const desiredCaps = {
  'bstack:options': {
    userName: process.env.AA_USERNAME,
    accessKey: process.env.AA_ACCESS_KEY,
    projectName: process.env.BROWSERSTACK_PROJECT_NAME || 'Percy Appium App Advanced (wd)',
    buildName: process.env.BROWSERSTACK_BUILD_NAME || 'App Percy Advanced wd Android',
  },
  percyOptions: { enabled: true, ignoreErrors: true },
  app: process.env.APP,
  device: process.env.DEVICE || 'Google Pixel 6',
  os_version: process.env.OS_VERSION || '12',
  project: 'First Node App Percy Project',
  build: 'App Percy Advanced wd',
  name: 'advanced_visual_test',
}

async function run() {
  const driver = wd.promiseRemote('https://hub-cloud.browserstack.com/wd/hub')
  try {
    await driver.init(desiredCaps)
    await new Promise((r) => setTimeout(r, 5000))

    // 1. Baseline screenshot — matrix row: baseline.
    await percyScreenshot(driver, 'Wikipedia Home (wd)')

    // 2. device_name + orientation. The `orientation` snapshot option is
    // metadata only — physically rotate the device so the snapshot actually
    // reflects landscape.
    await driver.setOrientation('LANDSCAPE')
    try {
      await percyScreenshot(driver, 'Wikipedia Home (wd) — landscape', {
        device_name: process.env.DEVICE || 'Google Pixel 6',
        orientation: 'landscape',
      })
    } finally {
      await driver.setOrientation('PORTRAIT')
    }

    // 3. fullscreen + status_bar_height + nav_bar_height. The SDK option key
    // is `full_screen` (with underscore) — `fullscreen` is silently ignored.
    await percyScreenshot(driver, 'Wikipedia Home (wd) — fullscreen', {
      full_screen: true,
      status_bar_height: 24,
      nav_bar_height: 0,
    })

    // 3b. full-page (scroll-and-stitch) capture — App Automate only. The
    // device's bottom navigation/system bar is sticky, so the scroll engine
    // treats it as the end of the page and grabs a single tile. Ignoring the
    // bottom `bottomScrollviewOffset` pixels lets the scroll advance past the
    // fixed bar and stitch the real content. Verified on Pixel 6: without the
    // offset = 1 tile, with offset = ~7 tiles. Default = Pixel 6 nav-bar
    // height (160 device px); override via BOTTOM_SCROLLVIEW_OFFSET.
    await percyScreenshot(driver, 'Wikipedia Home (wd) — fullpage', {
      fullPage: true,
      screenLengths: 4,
      bottomScrollviewOffset: Number(process.env.BOTTOM_SCROLLVIEW_OFFSET || 160),
    })

    // 4. ignore_regions_xpaths.
    await percyScreenshot(driver, 'Wikipedia Home (wd) — ignore via xpath', {
      ignore_regions_xpaths: ['//*[@resource-id="org.wikipedia.alpha:id/search_container"]'],
    })

    // 5. custom_ignore_regions.
    await percyScreenshot(driver, 'Wikipedia Home (wd) — custom ignore region', {
      custom_ignore_regions: [{ top: 0, bottom: 100, left: 0, right: 300 }],
    })

    // 6. consider_regions_xpaths.
    await percyScreenshot(driver, 'Wikipedia Home (wd) — consider via xpath', {
      consider_regions_xpaths: ['//*[@resource-id="org.wikipedia.alpha:id/search_container"]'],
    })

    // 7. sync mode.
    // sync: true blocks until Percy returns the comparison result. With a
    // full-access PERCY_TOKEN that's the comparison payload; with a write-only
    // token (the common CI setup) Percy responds 403 and the SDK returns the
    // error payload instead. Both are valid, so only fail on a missing/non-object
    // result rather than requiring real comparison data.
    const result = await percyScreenshot(driver, 'Wikipedia Home (wd) — sync', { sync: true })
    console.log('Percy sync result:', JSON.stringify(result))
    if (result !== null && typeof result !== 'object') {
      throw new Error(`unexpected sync result: ${JSON.stringify(result)}`)
    }

    // 8. test_case + labels.
    await percyScreenshot(driver, 'Wikipedia Home (wd) — test_case + labels', {
      test_case: 'home-smoke',
      labels: 'smoke,appium-js,wd',
    })
  } finally {
    await driver.quit()
  }
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
