---
title: "Webpack Configuration Part 1 : Getting started"
date: "15 Feb, 2018"
layout: "post"
index: 2
subtitle: "Getting started with configuring Webpack."
path: "/blog/webpack-getting-started/"
categories:
  - Webpack
  - Web development
  - Build tools
headerImg: "https://raw.githubusercontent.com/webpack/media/master/logo/logo-on-white-bg.png"
---

# Webpack Configuration Part 1 : Getting started

In this blog post, we'll configure a webpack project from scratch. I would recommend that you read the previous post [Introduction to Webpack](/blog/intro-to-webpack/) if you haven't already. The following is for Linux/Mac systems. It is expected that you have Node js and npm installed. We'll be configuring webpack 4, that is the latest version as of this time.

## Creating the required folders


First we'll create the required folders to save our files. Open the terminal, and execute the following commands in it :

```shell
mkdir [folder-name] && cd [folder-name]
mkdir src src/assets src/assets/js src/assets/media src/assets/scss config
```

## Creating required files

Execute the following commands in the terminal :

```shell
touch .babelrc .gitignore README.md config/webpack.common.js config/webpack.dev.js config/webpack.prod.js src/index.html src/assets/js/app.js src/assets/scss/app.scss
```

## Initiating npm and git

Execute the following commands in the terminal :

```shell
git init
npm init
```

![Project file structure](./file-structure.png)

## Installing webpack and dependencies

Lets now install webpack and other modules that we'll need. Run the following command in the terminal :

```shell
npm install -D webpack-dev-server webpack webpack-merge webpack-cli
```

It's obvious why we installed webpack. but why the other two? webpack basically bundles all the modules and emits them into a file. but during development, we cannot afford to repetitively bundle the modules after every small change. This is where webpack-dev-server comes into play. This package sets up a development server with hot reloading and other cool features. Also if you noticed we have 3 webpack config files. webpack.common.js contains the common configurations. webpack.dev.js contains configurations specific to the development stage, and similarly webpack.prod.js for Production specific configurations. Now we have to import webpack.common.js in the other two files and merge their specific configurations with the common one. This is done by the webpack-merge package.

## Writing npm scripts

Add the following scripts to the scripts section in the package.json :

> package.json
```javascript
"scripts": {
  "start": "webpack-dev-server --inline --hot --open --config config/webpack.dev.js",
  "build": "webpack --config config/webpack.common.js",
  "build:prod": "webpack -p --config config/webpack.prod.js"
},
```

_start_ : starts the webpack dev server
_build_ : builds the project and outputs the files in developer mode.
_build:prod_ : builds the project and outputs the files in production mode.

## Webpack Configuration

Now let's started off with writing the configuration files. First, we define a constant object inside the webpack.common.js and export it :

```javascript
const config = {
  // Here goes the configuration
};
module.exports = config;
```

## Defining the context

Context refers to the base directory. it is an absolute path, for resolving entry points and loaders from the configuration. By default, the current directory is used, but it's recommended to pass a value in your configuration. This makes your configuration independent from the current working directory.

``` javaScript
const config = {
  context: path.resolve(__dirname, "../src"),
  // Rest of the configuration
}
```

We are referencing it by '../src' rather than 'src/' because the path is defined with respect to the current directory, which is _config_.

## Defining the entry point

Let's define the entry point for the application :

```javaScript
const config = {
  entry: './src/app.js',
}
```

Let us assume a case where we need to specify different entry points. In that case we define _entry_ as an object, then specify the entry path with a name to it. For example, here below we are calling it 'app' :

```javaScript
const config = {
  entry: {
    app: './assets/js/app.js'
  },
}
```

## Defining the output point

This is the path where the bundled files will be saved. we shall define the output point as an object with 2 attributes, path, and filename :

- path : Its the absolute path to the prefered output directory.
- filename : it determines the name of each output bundle.   

Now, we cannot define path variable with a definite string. as it would change if the repository is copied to another directory or to another computer. Hence we use Node js _Path_ module which gives us the absolute path to the project root directory.

```javascript
const path = require('path');

const config = {
  entry: {
    app: './assets/js/app.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'assets/js/bundle.js'
  }
}
```

Note that when configuring multiple output paths, i.e when multiple output files are expected; you should use one of the following substitutions to give each bundle a unique name. For example:

```javaScript
filename: "assets/js/[name].bundle.js"
```

for other naming options <https://webpack.js.org/configuration/output/#output-filename>

## Configuring the development server

The dev server package sets up a local development server, hence you won't be accessing the application using file path. Also if you look at the npm _start_ script : ```webpack-dev-server --inline --hot --open --config webpack.dev.js```. --hot enables hot-reloading which means the code will be re-bundled as soon as webpack notices changes in the files.

The development configurations will be written in the webpack.dev.js file. first, we import webpack-merge and webpack.common.js, and the Node js path package.

```javaScript
const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
```

Now lets first write the configuration, then we'll try to understand what it means :

```javaScript
module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, "./dist/assets/media"),
    compress: true,
    port: 8004,
    stats: 'errors-only',
    open: true
  }
});
```

- _devtool_ : It refers to the style of source mapping, its value can affect the build and rebuild speed dramatically. [to learn more](https://webpack.js.org/configuration/devtool/)
- _devServer.contentBase_ : It refers to the path from where all media/static files will be served. [to learn more](https://webpack.js.org/configuration/dev-server/#devserver-stats-)
- _devServer.compress_ : Enables gzip compression for everything served. [to learn more](https://webpack.js.org/configuration/dev-server/#devserver-compress)
- _devServer.port_ : The port no. you want your application to be deployed to. [to learn more](https://webpack.js.org/configuration/dev-server/#devserver-port)
- _devServer.stats_ : It lets you precisely control what bundle information gets displayed. [to learn more](https://webpack.js.org/configuration/dev-server/#devserver-stats-)
- _devServer.open_ : If set true, the sever opens the browser. [to learn more](https://webpack.js.org/configuration/dev-server/#devserver-open)

-----------------------------------------

So this is what we have so far :

_packages.json_
```javaScript
{
  "name": "webpack-config",
  "version": "1.0.0",
  "description": "",
  "main": "webpack.common.js",
  "scripts": {
    "start": "webpack-dev-server --inline --hot --open --config config/webpack.dev.js",
    "build": "webpack --config config/webpack.common.js",
    "build:prod": "webpack --optimize-minimize --config config/webpack.prod.js"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^4.4.1",
    "webpack-cli": "^2.0.13",
    "webpack-dev-server": "^3.1.1",
    "webpack-merge": "^4.1.2"
  }
}
```

_webpack.common.js_
```javaScript
const path = require('path')

const config = {
  context: path.resolve(__dirname, "../src"),
  entry: {
    app: './assets/js/app.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'assets/js/[name].bundle.js'
  }
};

module.exports = config;
```

_webpack.dev.js_
```javaScript
const path = require('path')
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, "./dist/assets/media"),
    compress: true,
    port: 8004,
    stats: 'errors-only',
    open: true
  }
});
```

Let's test our Configuration. Open the terminal and navigate to the project directory and then execute ```npm run start```. Everything should work fine. An instance of the browser will start saying "CANNOT GET /", that is because we have not defined any HTML file. Now let's move on and enable our configuration to load HTML files and to read ES6 using Babel.
