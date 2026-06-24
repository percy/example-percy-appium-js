// PER-8195 Phase 2 — appium-js webdriverio advanced example.
// Each `it` exercises one row of the App Percy / Appium Native matrix.
// See ../matrix.yml for the canonical mapping.
//
// Run against the BrowserStack App Automate hub. Requires AA_USERNAME,
// AA_ACCESS_KEY, APP env vars. See ../README.md.

const percyScreenshot = require('@percy/appium-app')

describe('Wikipedia App — App Percy Advanced', () => {
  it('takes a baseline screenshot (no options)', async () => {
    await browser.pause(5000)
    await percyScreenshot('Wikipedia Home')
  })

  it('exercises device_name override + orientation', async () => {
    // The `orientation` snapshot option is metadata only — physically rotate
    // the device so the snapshot actually reflects landscape.
    await browser.setOrientation('LANDSCAPE')
    try {
      await percyScreenshot('Wikipedia Home — landscape', {
        device_name: process.env.DEVICE || 'Google Pixel 6',
        orientation: 'landscape',
      })
    } finally {
      await browser.setOrientation('PORTRAIT')
    }
  })

  it('exercises fullscreen + status_bar_height + nav_bar_height', async () => {
    // The SDK option key is `full_screen` (with underscore) — `fullscreen`
    // is silently ignored, which is why the snapshot looked like the baseline.
    await percyScreenshot('Wikipedia Home — fullscreen', {
      full_screen: true,
      status_bar_height: 24,
      nav_bar_height: 0,
    })
  })

  it('exercises full-page scroll capture with bottom scroll offset', async () => {
    // Full-page (scroll-and-stitch) capture — App Automate only. The device's
    // bottom navigation/system bar is sticky, so the scroll engine treats it
    // as the end of the page and grabs a single tile. Ignoring the bottom
    // `bottomScrollviewOffset` pixels lets the scroll advance past the fixed
    // bar and stitch the real content. Verified on Pixel 6: without the offset
    // = 1 tile, with offset = ~7 tiles. Default = Pixel 6 nav-bar height (160
    // device px); override via BOTTOM_SCROLLVIEW_OFFSET.
    await percyScreenshot('Wikipedia Home — fullpage', {
      fullPage: true,
      screenLengths: 4,
      bottomScrollviewOffset: Number(process.env.BOTTOM_SCROLLVIEW_OFFSET || 160),
    })
  })

  it('exercises ignore regions via xpath', async () => {
    await percyScreenshot('Wikipedia Home — ignore via xpath', {
      ignore_regions_xpaths: ['//*[@resource-id="org.wikipedia.alpha:id/search_container"]'],
    })
  })

  it('exercises ignore regions via appium elements', async () => {
    const el = await $('~Search Wikipedia')
    await percyScreenshot('Wikipedia Home — ignore via appium element', {
      ignore_region_appium_elements: [el],
    })
  })

  it('exercises ignore regions via custom bounding boxes', async () => {
    await percyScreenshot('Wikipedia Home — ignore via custom region', {
      custom_ignore_regions: [
        { top: 0, bottom: 100, left: 0, right: 300 },
      ],
    })
  })

  it('exercises consider regions via xpath', async () => {
    await percyScreenshot('Wikipedia Home — consider via xpath', {
      consider_regions_xpaths: ['//*[@resource-id="org.wikipedia.alpha:id/search_container"]'],
    })
  })

  it('exercises sync mode', async () => {
    // sync: true blocks until Percy returns the comparison result.
    const result = await percyScreenshot('Wikipedia Home — sync', { sync: true })
    console.log('Percy sync result:', JSON.stringify(result))
    expect(result).toBeDefined()
  })

  it('exercises test_case + labels metadata', async () => {
    await percyScreenshot('Wikipedia Home — test_case + labels', {
      test_case: 'home-smoke',
      labels: 'smoke,appium-js,wdio',
    })
  })
})
