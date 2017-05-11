/* eslint-env node */

let config = {
  "framework": "mocha",
  "test_page": "tests/index.html?hidepassed",
  "disable_watching": true,
  "ignore_missing_launchers": true,
  "parallel": 3,
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

if (process.env.TRAVIS) {
  config.browser_args.Chromium.push('--no-sandbox')
  config.browser_args.Chrome.push('--no-sandbox')
}

module.exports = config
