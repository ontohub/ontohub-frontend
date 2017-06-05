[![Travis branch](https://img.shields.io/travis/ontohub/ontohub-frontend/react.svg)](https://travis-ci.org/ontohub/ontohub-frontend)
[![Codecov branch](https://img.shields.io/codecov/c/github/ontohub/ontohub-frontend/react.svg)](https://codecov.io/gh/ontohub/ontohub-frontend)
[![GitHub issues](https://img.shields.io/github/issues/ontohub/ontohub-frontend.svg?maxAge=2592000)](https://waffle.io/ontohub/ontohub-backend?source=ontohub%2Fontohub-frontend)

# Ontohub frontend

## Table of Contents

- [Setting up the development environment](#setting-up-the-development-environment)
  - [Clone the repository](#clone-the-repository)
  - [Install the dependencies](#install-the-dependencies)
  - [Visual Studio Code](#visual-studio-code)
- [Used technologies](#used-technologies)
- [Common Tasks](#common-tasks)
  - [Running the app in development mode](#running-the-app-in-development-mode)
  - [Run the tests](#run-the-tests)
  - [Run the type checker](#run-the-type-checker)
  - [Run the linter on the entire project](#run-the-linter-on-the-entire-project)
  - [Build the app in production mode](#build-the-app-in-production-mode)


## Setting up the development environment

We are using `yarn` to manage our frontend dependencies. If you haven't installed `yarn` yet, check out the install instructions [here](https://yarnpkg.com/en/docs/install).

### Clone the repository

```bash
git clone git@github.com:ontohub/ontohub-frontend
```

### Install the dependencies

Inside the project directory, run `yarn` to install all needed dependencies.

### Visual Studio Code

If you are using Visual Studio Code, there are some Plugins we recommend using while developing on this project:

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint): Display code style issues in the editor
- [Prettier - ESLint](https://marketplace.visualstudio.com/items?itemName=RobinMalfait.prettier-eslint-vscode): Automatically format the code according to our code style
- [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome): Launch a Chrome instance and debug from within the editor
- [Auto Close Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag): Automatically close HTML (and JSX) tags
- [Flow Language Support](https://marketplace.visualstudio.com/items?itemName=flowtype.flow-for-vscode): Annotate expressions with flow types

You can install them via the Plugin Manager from inside the editor.

## Used technologies

**Language features and extensions**
- ECMAScript 7 via [Babel](https://babeljs.io/)
- [JSX](https://facebook.github.io/jsx/)
- [flow](https://flow.org/)

**Rendering**
- [React](https://facebook.github.io/react/)
- [Semantic UI](http://react.semantic-ui.com/)

**Routing**
- [React Router](https://reacttraining.com/react-router/web)

**API**
- [GraphQL](http://graphql.org/)
- [React Apollo](http://dev.apollodata.com/react/index.html)

**Tests**
- [Jest](https://facebook.github.io/jest/)

## Common tasks

### Running the app in development mode

```bash
yarn start
```

### Run the tests

```bash
yarn test
```

### Run the type checker

```bash
yarn flow
```

### Run the linter on the entire project

```bash
yarn lint
```

### Run the code formatter on the entire project

```bash
yarn format
```

### Build the app in production mode

```bash
yarn build
```
