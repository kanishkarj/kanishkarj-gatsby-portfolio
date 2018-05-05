---
title: "Webpack Configuration Part 2 : Loaders and Plugins"
date: "30 Jan, 2018"
layout: "post"
subtitle: "Configuring Loaders and plugins in Webpack."
path: "/blog/webpack-loaders-and-plugins"
categories:
  - Webpack
  - Web development
  - Build tools
headerImg: "https://raw.githubusercontent.com/webpack/media/master/logo/logo-on-white-bg.png"
---

# Webpack Configuration Part 1 : HTML, CSS Aand JS

In this blog post, we'll set up webpack to read ES6/ES7 and transcompile them back to ES5. Then we'll process SASS to CSS. First lets learn what are loaders and plugins.

*Loaders:* They allow one to load files other than javascript and process them. Loaders can be configured by defining 2 things _test_ and _use_. _test_ defines what type of files will be selected and _use_ defines which loader will operate over it. Eg :

{ test: /\.js$/, use: 'raw-loader' }

*Plugins:* Loaders are specific to particular file types. But plugins are more generalized and powerful. They can be used to perform tasks like minification. They can be used by importing them and adding them to the plugins array. The instances of the plugins are configurable.

First we define the _module_  object right after the output object in webpack.common.js. then inside it we define a array called _rules_ which will consist of configuration for each loader.

```javascript
output: {
 // ... Other Config ...
},
module: {
 rules: [
     // Loaders are defined in here
 ]
}
```

### Setting up Javascript: ES7 to ES5

We shall use the _babel-loader_ package to read ES7 js files. To install babel-loader and few other packages dependent on it, execute the following command on the command line :

```shell
npm install -D babel-loader babel-core babel-polyfill babel-preset-env
```

Now we will define a Loader to read javascript and transcompile it from ES7 to ES5( latest standard supported by all the browsers). Lets add a config object inside the rules array :  

```javascript
module: {
 rules: [
   {
    test: /\.js$/,
    include: /src/,
    exclude: /node_modules/,
    use: ['babel-loader']
  }
 ]
}
```

_test_ : This attribute defines what kind of file extensions should webpack parse for this particular loader. It is defined using a Regular Expression. Here we are parsing Javascript files hence we write */\.js$/*.

_include_ : This defines the directory webpack should look into (referenced from project root).

_exclude_ : This defines which directory the loader should avoid while parsing.

_use_ : This tells which loader it should use. Here the use attribute is defined in a simple way. The actual configuration of babel-loader is done in _.babelrc_ :

_.babelrc_
```json
{
  "presets": ["env"]
}
```

That is a basic configuration, for more knowledge about configuring babel [check this](https://babeljs.io/docs/plugins/preset-env/).



Now lets test if our configuration works. enter the following code inside _/src/assets/app.js_ :

```javascript
let temp = 5;
const func = (val) => console.log(val);

func(temp);
```

Then run `npm build` in your command line. Open the `/dist/` folder, and you can see bundled files in it. Now open src/assets/app.js and search for "console.log(5)", you should find it. If you noticed above, the code we wrote was written in ES7 but the bundled code is in ES5.

## Clear `dist` directory

Every time we bundle the code, we have to clear the dist directory manually. Hence we'll use a plugin to do this job for us. First lets install it, run the following in your command line : 

```shell
npm i -D clean-webpack-plugin
```

Now import the plugin in our `webpack.common.js` file :

```javascript
// ... other imports
const CleanWebpackPlugin = require('clean-webpack-plugin');

const config = {
  // ... config
}
```

Plugins are defined in an array inside the config object. Now inside this array we instantiate the CleanWebpackPlugin object with the directory to clean as a parameter (dist).

 ```javascript
const config = {
  // ... config
  module: {
    // ...
  },
  plugins: [
    new CleanWebpackPlugin(['dist'])
  ]
}
```

For more information on CleanWebpackPlugin check out the docs [here](https://github.com/johnagan/clean-webpack-plugin).

Until now we only we only have bundled JS files, what about other files such as HTML and CSS ? Lets get to it.

## Reading HTML files

This is how we will implement reading html files. First webpack reads the HTML file as string, then it prints the string back into a HTML file in the directory specified. It is easy to do this, we'll do this with the help of a loader and a plugin : 

[html-loader](https://github.com/webpack-contrib/html-loader) : Exports HTML as string. HTML is minimized when the compiler demands.
[html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) : Simplifies creation of HTML files to serve your webpack bundles.

Lets install them : 
```shell
npm i -D html-loader html-webpack-plugin
```

The config for HTML loader. It is similar to the config we wrote for js :
```javascript
  module: {
    // ...
    {
      test: /\.(html)$/,
      use: {
        loader: 'html-loader',
        options: {
          minimize: true,
          removeComments: true,
          collapseWhitespace: true
        }
      }
    },
  },
```

_use.options.minimize_ : To minify the html files.
_use.options.removeComments_ : All the comments in the HTML file will be discarded.
_use.options.collapseWhitespace_ : All whitespaces will be removed.

The Above configuration will reduce the bundle size. Hence will have a great impact on the performance.

Import `html-webpack-plugin` in webpack.common.js :
               
`webpack.common.js`
```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
```

Then config for html plugin :
```javascript
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html'
    }),
  ]
```

Here we specify two attributes :
_filename_ : It Specified the output filename
_template_ : It Specified the input filename

Now to test whether everything is working, first write the following in `index.html` :

```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Page Title</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>

<body>

</body>

</html>
``` 

Then run `npm run` in the command line. Now if you notice carefully, the `dist` directory is being deleted and created again. Also index.html is created, if you open it and compare it with the  index.html of `/dist/`. You will notice webpack added an additional line :     
`<script type="text/javascript" src="assets/js/app.bundle.js"></script>`

Thats webpack linking the bundled js file for you.

## CSS and SASS

For processing CSS/SASS through webpack it first loads the css first into the js file then it is extracted from it and emmited into a file. To use SASS, webpack trancompiles SASS to CSS and then performs the above mentioned procedure. The list of plugins we need are :

* node-sass : Provides binding for Node.js to LibSass. The sass-loader requires node-sass and webpack as peerDependency. Thus you are able to control the versions accurately.
* sass-loader : Loads a SASS/SCSS file and compiles it to CSS
* css-loader : Interprets @import and url() like import/require() and will resolve them.
* extract-text-webpack-plugin : Extract text from a bundle, or bundles, into a separate file.
* style-loader : Loads the CSS file into the html document with the help of style tag.

> **Note**         
  Before using node-sass ensure the SASS command line tool is installed in your system.  

Now we install the dependencies :
```shell
npm i -D sass-loader node-sass css-loader style-loader extract-text-webpack-plugin
```
First we import `extract-text-webpack-plugin` and then instantiate it with the file output path.

```javascript
// ....
const ExtractTextPlugin = require('extract-text-webpack-plugin');


const ExtractCSSPlugin = new ExtractTextPlugin({
  filename: './assets/css/index.css'
});
```

Now lets configure webpack to use CSS and SASS loader :

```javascript
const config = {
  // ...
  module: {
      // ...
      {
        test: /\.scss$/,
        include: [path.resolve(__dirname, '../src', 'assets', 'scss')],
        use: ExtractCSSPlugin.extract({
          use: [
            {
              loader:'css-loader',
              options: {
                minimize : true
              }
            },
            {
              loader:'sass-loader',
                options: {}
            }
          ],
          fallback: 'style-loader'
        })
      },
  },
  plugins: [
    // ...
    ExtractCSSPlugin
  ]
}
```

Now that needs some explanation.
* _test and include_ : That should be obvious.
* _use_ : Here we are calling ExtractCSSPlugin.extract function with a configuration object as parameter.
  - First we define an array called `use` inside it which will hold configurations for the loaders we'll be using.
  - If you notice the CSS loader has an option minimize set to true. this minifies the generated CSS file.
  - The next config object is the sass-loader
  - _fallback_ : Loader that should be used when the CSS is not extracted(i.e. in an additional chunk when allChunks: false).
* We also have added the extractPlugin to the plugins array.

Now lets test this. Add the following style to _/assets/scss/app.scss_ :
```scss
$bgcolor: #a80c0c;
body {
    background: $bgcolor;
}
```

For webpack to recognise the SASS file we have to import it in our app.js :
```javascript
require('../scss/app.scss');
```

Now lets test if everything is working. Open command line and run `npm run build`. Now if you open `/dist/assets/css/app.css', you should be able to see :
```css
body{background:#a80c0c}
```

## Loading images

Currently our config can bundle all files except images. For bundling images we use file-loader. The config for loading images : 

```javascript
{
  test: /\.(jpeg|jpg|png|gif|svg)$/,
  use: [{
    loader: 'file-loader',
    options: {
      name: '[name].[ext]',
      outputPath: './assets/media/',
    }
  }]
}
```

> The output path must end with `/` else the while saving the files, the output filename will be appended to the output path rather than saving it inside the folder.
      
More details can be found [here](https://github.com/webpack-contrib/file-loader).

Now lets add images, The images should be saved inside /src/assets/media/. We also have to import the image in the HTML file. According to our webpack config the files will be saved in _assets/media_ so we'll reference that path in our HTML file :

```html
<img src="./assets/media/image.jpeg" alt="">
```

Lets test the config, run `npm run start` from the command line. The browser should open up showing a red page with the image. Here's the configuration we wrote till now : 

_/config/webpack.common.js_
```javascript
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const ExtractCSSPlugin = new ExtractTextPlugin({
    filename: './assets/css/[name].css',
});

const config = {
    context: path.resolve(__dirname, "../src"),
    entry: {
        app: './assets/js/app.js'
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'assets/js/[name].bundle.js'
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader'
                }
            },
            {
                test: /\.scss$/,
                include: [path.resolve(__dirname, '../src', 'assets', 'scss')],
                use: ExtractCSSPlugin.extract({
                    use: [{
                            loader: 'css-loader',
                            options: {
                                minimize: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {

                            }
                        }
                    ],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.(jpeg|jpg|png|gif|svg)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: './assets/media/',
                    }
                }]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html'
        }),
        ExtractCSSPlugin
    ]
};

module.exports = config;
```

_/src/assets/scss/app.scss_
```scss
$bgcolor: #a80c0c;
body {
    background: $bgcolor;
}
```

_/src/assets/js/app.js_
```javascript
import '../scss/app.scss';

let temp = 5;
const func = (val) => console.log(val);

func(temp);
```

_/src/index.html_
```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Page Title</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>

<body>
    <h1>hello</h1>
    <img src="./assets/media/image.jpeg" alt="">
</body>

</html>
```

Thats all for this post. In the next post we'll see configuring webpack for production and a powerful feature of webpack called chunks.