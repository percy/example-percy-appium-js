# Advanced Percy + Appium-JS (webdriverio driver)

This directory exercises the full applicable Percy SDK feature surface for `@percy/appium-app` via the webdriverio driver. See the basic webdriverio example at `webdriverio/android/` / `webdriverio/ios/` for the minimum integration.

## What this example covers

A single mocha spec (`specs/advanced.test.js`) where each `it(...)` block exercises one row of the App Percy / Appium Native matrix (source of truth: [`matrix.yml`](./matrix.yml)):

- `device_name` override
- `orientation` (portrait/landscape)
- `fullscreen` + `status_bar_height` + `nav_bar_height`
- `fullPage` + `screenLengths` + `bottomScrollviewOffset` (full-page scroll capture — the offset scrolls past the sticky bottom nav)
- `ignore_regions_xpaths`
- `ignore_region_appium_elements`
- `custom_ignore_regions` (bounding boxes)
- `consider_regions_xpaths`
- `sync` mode
- `test_case` + `labels` metadata
- Build metadata via env (`BROWSERSTACK_PROJECT_NAME` / `BROWSERSTACK_BUILD_NAME` / `DEVICE` / `OS_VERSION` / `APP`)
- env-driven `PERCY_BRANCH` / `PERCY_COMMIT` override

Web-only options (widths, percyCSS, minHeight, scope, discovery, domTransformation, responsiveSnapshotCapture, readiness preset, devicePixelRatio, browsers) are marked `N/A` in `matrix.yml` — there's no DOM in native App Percy; screenshots are taken on-device.

## Run locally

Requires BrowserStack App Automate hub credentials and an app uploaded to the BrowserStack cloud:

```bash
cd webdriverio/advanced
npm install
export AA_USERNAME="<browserstack username>"
export AA_ACCESS_KEY="<browserstack access key>"
export APP="bs://<your hashed app id>"
export PERCY_TOKEN="<your project token>"      # do NOT commit this
npx percy app:exec -- npm run test:advanced
```

## CI note

App Percy CI cannot run without a real BrowserStack device session, and forks / Dependabot don't have access to the hub secrets. The shipped CI job therefore runs **manually only**, via `workflow_dispatch` — it does not run automatically on pushes or PRs. Trigger it from the Actions tab once `AA_USERNAME` and `AA_ACCESS_KEY` secrets are configured.

See the comment at the top of `.github/workflows/advanced.yml` for details.

## Coverage matrix

States: `Covered` / `N/A — <reason>` / `Planned` / `Deprecated`. Source of truth is [`matrix.yml`](./matrix.yml).
