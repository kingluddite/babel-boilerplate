# Babel Boilerplate

## A Quickstart for the following:
* ES Next code
* Webpack
* Webpack Dev Server with Hot Code Push
* Sass
* SMACKS setup for Sass
* Eslint
* Stylelint

## Install all dependencies
`$ npm run install`

## Run the app
* Scripts set up in `package.json`

```
// MORE CODE

  "scripts": {
    "dev": "webpack-dev-server --mode development",
    "prod": "npm run clean && NODE_ENV=production webpack --mode production",
    "clean": "rimraf ./dist/*"
  },

// MORE CODE
```

* Run the dev server with:

`$ npm run dev`

* Compile all production code with:

`$ npm run prod`

* Delete `dist` folder and all contents with:

`$ npm run clean`

