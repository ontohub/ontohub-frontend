/* eslint-env node */

/*
 * Default testem settings. You can locally override these by creating a file
 * `testem.local.js`. Example:
 * ```
 * module.exports = (defaults) => ({
 *   launch_in_ci: defaults.launch_in_ci.concat(['Chrome', 'Safari']),
 *   parallel: 3
 * })
 * ```
 */

let config = {
  framework: 'mocha',
  test_page: 'tests/index.html?hidepassed',
  disable_watching: true,
  launch_in_ci: ['PhantomJS'],
  launch_in_dev: ['PhantomJS', 'Chromium', 'Chrome'],
  browser_args: {
    Chromium: ['--headless', '--disable-gpu', '--remote-debugging-port=9222'],
    Chrome: ['--headless', '--disable-gpu', '--remote-debugging-port=9222']
  }
}

if (process.env.TRAVIS) {
  Object.assign(
    config,
    ((defaults) => ({
      parallel: 2,
      launch_in_ci: ['PhantomJS', 'Chromium'],
      browser_args: {
        Chromium: defaults.browser_args.Chromium.concat(['--no-sandbox'])
      }
    }))(config)
  )
}

try {
  let localConf = require('./testem.local')

  Object.assign(config, localConf(config))
} catch (e) {
  // No local overrides
}
module.exports = config
