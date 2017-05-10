[![Build Status](https://travis-ci.org/ontohub/ontohub-frontend.svg?branch=master)](https://travis-ci.org/ontohub/ontohub-frontend)
[![Coverage Status](https://coveralls.io/repos/github/ontohub/ontohub-frontend/badge.svg?branch=master)](https://coveralls.io/github/ontohub/ontohub-frontend?branch=master)
[![Dependency Status](https://gemnasium.com/badges/github.com/ontohub/ontohub-frontend.svg)](https://gemnasium.com/github.com/ontohub/ontohub-frontend)
[![GitHub issues](https://img.shields.io/github/issues/ontohub/ontohub-frontend.svg?maxAge=2592000)](https://waffle.io/ontohub/ontohub-backend?source=ontohub%2Fontohub-frontend)

# ontohub-frontend
The Ontohub web UI for the end user.

## Run the frontend

To run the frontend, the [backend](https://github.com/ontohub/ontohub-backend) has to be started and listen
on `localhost` port 3000. Then the frontend can be started in development mode
with `ember serve`. The frontend is then reachable from the browser via
`localhost` port 4200.

## Dependencies

There are two kinds of dependencies:

- Build dependencies and
- Runtime dependencies

Build dependencies are managed with [yarn](https://yarnpkg.com/). To install
the build dependencies, run `yarn install --pure-lockfile`.

Runtime dependencies are managed with [bower](https://bower.io/). To install
the runtime dependencies, run `bower install`.

Please note: Since ember-cli does not yet support yarn, after installing a new
ember build addon with `ember install xyz`, you still need to run `yarn
install` to add the new dependency to the lock file. This step is not needed,
if the addon is a runtime dependency, which are managed by bower.
