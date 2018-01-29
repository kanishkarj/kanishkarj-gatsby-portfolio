---
title: "Webpack Configuration Part 1 : Getting started"
date: "30 Jan, 2018"
layout: "post"
subtitle: "Getting started with configuring Webpack from scratch."
path: "/blog/webpack-getting-started/"
categories:
  - Webpack
  - Web development
  - Build tools
headerImg: "https://raw.githubusercontent.com/webpack/media/master/logo/logo-on-white-bg.png"
---

# Webpack Configuration Part 1 : Getting started

In this blog post, we'll configure a webpack project from scratch. I would recommend that you read the previous post [Introduction to Webpack](www.google.com) if you haven't already. The following is for Linux/Mac systems. It is expected that you have Node js and npm installed.

## Creating the required folders


First we'll create the required folders to save our files. Open the terminal, and execute the following commands in it :

```shell
mkdir [folder-name] && cd [folder-name]
mkdir src src/assets src/assets/fonts src/assets/js src/assets/media src/assets/scss
```

## Creating required files

Execute the following commands in the terminal :

```shell
touch .babelrc .gitignore README.md webpack.common.js webpack.dev.js webpack.prod.js src/app.html src/assets/js/app.js src/assets/app.scss
```

## Initiating npm and git

Execute the following commands in the terminal :

```shell
git init
npm init
```

## Installing webpack and dependencies

Lets now install webpack and other modules that we'll need. Run the following command in the terminal :

```shell
npm install -D webpack-dev-server webpack webpack-merge
```

It's obvious why we installed webpack. but why the other two? webpack basically bundles all the modules and emits them into a file. but during development, we cannot afford to repetitively bundle the modules after every small change. This is where webpack-dev-server comes into play. this package sets up a development server with hot reloading and other cool features. Also if you noticed we have 3 webpack config files. webpack.common.js contains the common configurations. webpack.dev.js contains configurations specific to the development stage, and similarly webpack.prod.js for Production specific configurations. Now we have to import webpack.common.js in the other two files and merge their specific configurations with it. This is where the webpack-merge package comes into play, it merges the webpack configuration objects.

## Writing npm scripts

Add the following scripts to the scripts section in the package.json :

> package.json
```javascript
"scripts": {
  "start": "webpack-dev-server --inline --hot --open --config webpack.dev.js",
  "build": "webpack --config webpack.common.js",
  "build:prod": "webpack --config webpack.prod.js"
},
```

## Webpack Configuration

Now let's started off with writing the configuration files. First, we define a constant object inside the webpack.common.js and export it :

```javascript
const config = {
  // Here goes the configuration
};
module.exports = config;
```

## Defining the entry point

Let's define the entry point for the application :

```javaScript
const config = {
  entry: './src/app.js',
}
```

## Defining the output point

This is the path where the bundled files will be saved. we shall define the output point as an object with 2 attributes, path, and filename :

- path : Its the absolute path to the prefered output directory.
- filename : it determines the name of each output bundle.   

Now, we cannot define path variable with a definite string. as it would change if the repository is copied to another directory or to another computer. Hence we use Node js path module which gives us the absolute path to the project root directory.

```javascript
const path = require('path');

const config = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'assets/js/bundle.js'
  }
}
```

Note that when configuring multiple output paths, you should use one of the following substitutions to give each bundle a unique name. One of which id entry name :

```javaScript
filename: "assets/js/[name].bundle.js"
```

for other naming options <https://webpack.js.org/configuration/output/#output-filename>

## Defining the context

Context refers to the base directory. it is an absolute path, for resolving entry points and loaders from the configuration. By default, the current directory is used, but it's recommended to pass a value in your configuration. This makes your configuration independent from the current working directory.

``` javaScript
const config = {
  context: path.resolve(__dirname, "src"),
  // Rest of the configuration
}
```

## Configuring the development server

The dev server package sets up a local development server, hence you won't be accessing the application using file path. Also if you look at the npm start script : ```webpack-dev-server --inline --hot --open --config webpack.dev.js```. --hot enables hot-reloading which means the code will be bundled as soon as webpack notices changes in the files.

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
    port: 8000,
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

So this is what we have so far :

_packages.json_
```javaScript
{
  "name": "webpack-config",
  "version": "1.0.0",
  "description": "",
  "main": "webpack.common.js",
  "scripts": {
    "start": "webpack-dev-server  --inline --hot --open --config webpack.dev.js",
    "build": "webpack --config webpack.common.js",
    "build:prod": "webpack --config webpack.prod.js"
  },
  "keywords": [
    "webpack"
  ],
  "author": "kanishkarj",
  "license": "MIT",
  "devDependencies": {
    "webpack": "^3.10.0",
    "webpack-dev-server": "^2.9.7",
    "webpack-merge": "^4.1.1"
  },
  "dependencies": {

  }
}

```

_webpack.common.js_
```javaScript
const path = require('path')

const config = {
  context: path.resolve(__dirname, "src"),
  entry: {
    app: './assets/js/app.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
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
    port: 8000,
    stats: 'errors-only',
    open: true
  }
});
```

Let's test our Configuration. Open the terminal and navigate to the project directory and then execute ```npm run start```. Everything should work fine. An instance of the browser will start saying "CANNOT GET /", that is because we have not defined any HTML file. Now let's move on and enable our configuration to load HTML files and to read ES6 using Babel.
