---
title: "Webpack Configuration Part 3 : Advanced topics"
date: "30 Jan, 2018"
layout: "post"
subtitle: "Production configuration in webpack, and chunks in webpacks."
path: "/blog/webpack-advanced/"
categories:
  - Webpack
  - Web development
  - Build tools
headerImg: "https://raw.githubusercontent.com/webpack/media/master/logo/logo-on-white-bg.png"
---

In this post we'll make some changes to our configuration so that the finally built files are ready for production. If you notice, `/dist/assets/js/app.bundle.js` is a huge file. Now as we start using more libraries the file gets bigger and bigger. That impacts the performance of the application as the browser will have to load bigger files. One way to reduce the file size is to minimize the js files.

## Minimizing JS files

To minimze files we use `uglifyjs-webpack-plugin`. To configure it, we first import _webpack.common.js_ in _webpack.prod.js_ : 

**webpack.prod.js** 
```javascript
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
  
});
```

Now run the follwing on command line to install _uglifyjs-webpack-plugin_ :

```shell
npm i -D uglifyjs-webpack-plugin
```

Lets import it inside our file : 
```javascript
// ...
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
```

The config for minimzing the files :
```javascript
module.exports = merge(common, {
  devtool: 'source-map',
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true
    })
  ]
});
```

`devtool: 'source-map'` : A full SourceMap is emitted as a separate file. It adds a reference comment to the bundle so development tools know where to find it.

Run `npm run build:prod` in the command line. Now if you open _/dist/assets/js/app.bundle.js_ you'll notice the code has been minified, i.e the whole code is in one line.

We'll also specify to webpack that it is running under production mode, so that webpack can manage the libraries. That is webpack can remove the testing libraries while bundling. So lets add another plugin to the plugins array :

```javascript
new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify('production')
})
```

So at the end of this we have :

**webpack.prod.js**
```javascript
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
    devtool: 'source-map',
    plugins: [
        new UglifyJSPlugin({
            sourceMap: true
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ]
});
```

## Webpack Chunks

Chunks enables one to split code into different bundles. This can be used to improve performance of the application. For understanding this more clearly lets create another JS, SCSS, HTML file. 


**/src/assets/scss/page.scss**
```SCSS
$bgcolor: gray;
body {
    background: $bgcolor;
}
```

**/src/assets/js/page.js**
```javascript
import '../scss/page.scss';

let temp = "page.js";
const func = (val) => console.log(val);

func(temp);
```

**/src/page.html**
```HTML
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Page Title</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>

<body>
    <h1>Page Chunk</h1>
</body>

</html>
```

We'll make some modifications to _webpack.common.js_ :

### Add another entry point

```javascript
const config = {
  entry: {
    app: './assets/js/app.js',
    page: './assets/js/page.js'
  },
  // ...
}
```

Here `app` and `page` are chunk names. Chunks are basically names used to identify bundles. Lets test it, run `npm run build`. You should see 2 different files created _app.bundle.js_ and _page.bundle.js_ . But if you remember we didn't specify any output path for the other file. That wasnt a problem as the specifed output path was `[name].bundle.js`, hence a file is created for each chunk and named as specified.

### Specify the Chunks in HTML Plugin

```javascript
const config = {
    // ...
    plugins: [
        // ...
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            chunks: ['app']
        }),
        new HtmlWebpackPlugin({
            filename: 'page.html',
            template: 'page.html',
            chunks: ['page']
        }),
    ]
}
```

We have created a new instance of HTMLWebpackPlugin with the configuration for _page.html_. Now below it we have added a new line called `chunks`, which is an array that defines all the chunks the particular html file will be using. On building the project you'll notice that 2 files are created _index.html_ and _page.html_. On opening you'll find that the specified js file is referenced in it.

----------------------------

Thats it I guess, we have covered the basics about webpack. This should help you build your own config as per your requirements. If you run into any issue feel free to contact me.
