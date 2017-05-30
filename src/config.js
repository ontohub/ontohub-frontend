let config = {
      version: 'v0.0.0-65'
    },
    development = {},
    production = {},
    test = {}

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
