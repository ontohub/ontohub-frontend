/* eslint-env node */

module.exports = {
  "framework": "mocha",
  "test_page": "tests/index.html?hidepassed",
  "disable_watching": true,
  "ignore_missing_launchers": true,
  "launch_in_ci": [
    "PhantomJS",
    "Chromium",
    "Chrome"
  ],
  "launch_in_dev": [
    "PhantomJS",
    "Chromium",
    "Chrome"
  ],
  "browser_args": {
    "Chromium": [
      "--headless",
      "--disable-gpu",
      "--remote-debugging-port=9222"
    ],
    "Chrome": [
      "--headless",
      "--disable-gpu",
      "--remote-debugging-port=9222"
    ]
  }
}
