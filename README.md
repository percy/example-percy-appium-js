# example-percy-appium-js
Example app used by the [Percy JS Appium tutorial](https://docs.percy.io/v2-app/docs/appium-for-javascript) and [Percy JS WebdriverIO tutorial](https://docs.percy.io/v2-app/docs/webdriverio-for-javascript) demonstrating App Percy's JS Appium and WebdriverIO integrations.

> **New:** This repo ships an [`advanced/`](./webdriverio/advanced) example covering the full applicable App Percy SDK feature surface for `@percy/appium-app` via the webdriverio driver. See the [Percy SDK Feature Matrix](https://docs.percy.io/docs/sdk-feature-matrix) for cross-SDK coverage. A `wd/advanced/` symmetric example for the wd driver is planned.

## Examples

| Driver | Example | What it shows | Run command |
|---|---|---|---|
| webdriverio | `webdriverio/android/` (basic) | Minimum viable: one `percyScreenshot(name)` call per test. | `cd webdriverio && npm run android` |
| webdriverio | [`webdriverio/advanced/`](./webdriverio/advanced) | Full applicable App Percy SDK feature surface: orientation, ignore/consider regions (xpath, appium element, custom bounding box), fullscreen + status/nav bar heights, build metadata via env, sync mode, test_case + labels. See [`webdriverio/advanced/README.md`](./webdriverio/advanced/README.md). | `cd webdriverio/advanced && npm install && npx percy app:exec -- npm run test:advanced` |
| wd | `wd/android.js` (basic) | Minimum viable: one `percyScreenshot(driver, name)` call per test. | `cd wd && node android.js` |
| wd | `wd/advanced/` (planned) | Planned — same matrix-row coverage as `webdriverio/advanced/` using the `wd` driver. | — |

## JS Appium Tutorial

The tutorial assumes you're already familiar with JavaScript and the [Appium](https://appium.io/) [wd](https://github.com/admc/wd)/[webdriverio](https://github.com/webdriverio/webdriverio) framework. You'll still
be able to follow along if you're not familiar with Appium concepts, but we won't spend time introducing JS Appium concepts.


This tutorial also assumes you have [Node 14+ with npm](https://nodejs.org/en/download/) and
[git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) installed.

Depending on which framework you use for testing, please follow the tutorial in either `wd` directory or `webdriverio` directory.
