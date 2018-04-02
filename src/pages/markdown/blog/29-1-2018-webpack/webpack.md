---
title: "Introduction to Webpack"
date: "29 Jan, 2018"
layout: "post"
subtitle: "A powerful and versatile build tool."
path: "/blog/intro-to-webpack/"
headerImg: "./static/webpack-snap-from-website.png"
categories:
  - Webpack
  - Web development
  - Build tools
---

# Introduction to Webpack

Webpack is a powerful module bundler that is used in frontend web development. By definition, a module bundler is a build tool that takes modules with dependencies and emits static assets representing those modules. When working on bigger projects, the codebase gets bigger and unmanageable over time. Hence to maintain the understandability and scalability of the code, we split the code into modules. A module bundler basically takes in all your modules and stitches them together into a single file.

---------------------------

![Chinese Salty Egg](./webpack-snap-from-website.png)

## Lets get started !

So before getting started with setting up Webpack, we need to understand the four Core Concepts of any Webpack configuration:

- Entry
- Output
- Loaders
- Plugins

Now, lets get to them one by one!                

#### Entry

The entry point indicates the Module that Webpack will use to begin building the internal dependency graph. after entering the entry module, it will figure out other modules and libraries that the entry module uses. now, this process happens recursively. i.e every time a module is imported it will check on the other modules that it depends on and import them. hence, building up a dependency graph.

#### Output

The output point indicates the path to where the bundled code will be saved, and how it should be named.

#### Loaders

Loaders enable Webpack to process more than just JavaScript files. hence, using loaders we can bundle other files such as CSS, images etc. essentially all the files are converted to modules that can be included in the dependency graph.

#### Plugins

Plugins are kind of similar to modules, and it can be confusing sometimes to understand them. plugins basically can be used to perform a wider range of tasks. eg: file minification, bundle optimization. Loaders work at individual file level during or before the build. While Plugins are way more powerful than loaders. they can also modify how the bundles themselves are created.

---------------------------

I have just briefly explained to you about Webpack and its Concepts. For more understanding, I would recommend you to configure Webpack from scratch.
