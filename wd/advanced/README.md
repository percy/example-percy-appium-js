# Advanced Percy + Appium-JS (wd driver)

This directory exercises the full applicable Percy SDK feature surface for `@percy/appium-app` via the `wd` driver. Symmetric to `webdriverio/advanced/`. See the basic `wd/android.js` / `wd/ios.js` for the minimum integration.

## What this example covers

A single sequential Node script (`advanced.js`) that runs `percyScreenshot` calls in order, one per applicable matrix row: device_name override + orientation, fullscreen + status_bar/nav_bar heights, full-page scroll capture (`fullPage` + `screenLengths` + `bottomScrollviewOffset` to scroll past the sticky bottom nav), ignore regions via xpath / custom bbox, consider regions via xpath, sync mode, test_case + labels.

`ignore_region_appium_elements` is `Planned` — needs a wd-style promise chain over `driver.elementByAccessibilityId(...)` before passing to `percyScreenshot`.

Web-only options marked `N/A` in `matrix.yml`.

## Run locally

```bash
cd wd/advanced
npm install
export AA_USERNAME="<browserstack username>"
export AA_ACCESS_KEY="<browserstack access key>"
export APP="bs://<your hashed app id>"
export PERCY_TOKEN="<your project token>"
npx percy app:exec -- npm run test:advanced
```

## CI note

The advanced CI workflow at `.github/workflows/advanced.yml` (repo root) accepts a `driver` input — pass `wd` to run this example, `webdriverio` for the sibling.

## Coverage matrix

States: `Covered` / `N/A — <reason>` / `Planned` / `Deprecated`. Source of truth is [`matrix.yml`](./matrix.yml).
