let config = {
      version: '> 0.0.0-90',
      api: {
        endpoint: 'http://localhost:3000'
      }
    },
    development = {},
    production = {},
    test = {}

/* istanbul ignore next */
switch (process.env.NODE_ENV) {
case 'development':
  Object.assign(config, development)
  break
case 'production':
  Object.assign(config, production)
  break
case 'test':
  Object.assign(config, test)
  break
default:
}

export default config
