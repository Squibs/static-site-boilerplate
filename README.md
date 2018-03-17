# Boilerplate for Static Websites

This is a boilerplate for static websites uses Webpack to optimize and bundle files. 

## Introduction

At the time of creating this boilerplate, Webpack 4 was just barely released; and I hade little knowledge of using any form of task runner (Gulp/Grunt), build tool/system, or module bundler. I managed to increase my knowledge of Webpack enough to create this boilerplate using the little amount of Webpack 4 documentation and tutorials available (mainly what was on the `next` branch on the webpack.js.org repository), and the previous documentation and tutorials for Webpack (Webpack 2 & 3); so hopefully I am learning/using Webpack 4 correctly.

## Features

I wanted to include a few useful(?) features for this boilerplate just to get more experience when working with Webpack.

Features being:

- Bundling and file optimization using **Webpack 4**.
- Linting with **ESLint** using **Airbnb's .eslintrc** config.
- Ability to use **ES6** syntax via use of **Babel** transpiling.
- Compile **Sass** to **CSS with vendor prefixes** (minified by Webpack).
- **Bootstrap 4** style library (jQuery & Popper.js dependencies).
- **FontAwesome v5** icons/font toolkit.
- Server-side scripts - **PHP** (mainly for forms).
- Automatic browser reloading using **Browsersync**

Files can be served using the **Webpack-Dev-Server**; however I have included a pre-configured **Vagrant** Box (**Scotch Box**) for development instead. The reason being I could not figure out a way to get the Webpack-Dev-Server to serve PHP files (would probably need a dedicated PHP server to work along with Webpack-Dev-Server). To make it easier I just decided to use Scotch Box and Browsersync to accomplish the same thing.

## Folder Structure

I have the project structured like this:

```
.
├── public (web root - for Vagrant/Distribution)
│   ├── css (compiled/minified CSS; bundled)
│   │   └── bundle.css
│   ├── img (optimized images - small images become DataURL)
│   │   └── img-large.jpg
│   ├── js (transpiled and bundled)
│   │   └── bundle.js
│   ├── php (PHP files)
│   │   └── test-form.php
│   ├── webfonts (local webfonts)
│   │   ├── rtraleway-regular-webfont.eot
│   │   ├── rtraleway-regular-webfont.svg
│   │   ├── rtraleway-regular-webfont.ttf
│   │   ├── rtraleway-regular-webfont.woff
│   │   └── rtraleway-regular-webfont.woff2
│   ├── favicon.ico (favicon related files at web root)
│   ├── index.html (index at web root)
│   └── page2.html (second or more html files)
├── src (development/source code which will be 'packed' by Webpack)
│   ├── favicon (favicon related files)
│   │   ├── android-chrome-512x512.png
│   │   ├── apple-touch-icon.png
│   │   ├── browserconfig.xml
│   │   ├── favicon.ico
│   │   ├── favicon-32x32.png
│   │   ├── safari-pinned-tab.svg
│   │   └── site.webmanifest
│   ├── img (unoptimized images)
│   │   ├── img-large.jpg
│   │   └── img-small.svg
│   ├── js (JavaScript files)
│   │   ├── entry.js (Webpack JS entry point)
│   │   └── main.js (JS for index/other html files)
│   ├── php
│   │   └── test-form.php (PHP files)
│   ├── scss (Sass files)
│   │   ├── entry.scss (Webpack scss entry point)
│   │   ├── main.scss (styles for index/other pages)
│   │   └── postcss.config.js (PostCSS config)
│   ├── webfonts (local webfonts)
│   │   ├── rtraleway-regular-webfont.eot
│   │   ├── rtraleway-regular-webfont.svg
│   │   ├── rtraleway-regular-webfont.ttf
│   │   ├── rtraleway-regular-webfont.woff
│   │   └── rtraleway-regular-webfont.woff2
│   ├── index.html (landing page)
│   └── page2.html (second or more pages)
├── .babelrc (babel config/environment)
├── .eslintrc (eslint config)
├── .gitignore (git ignored files)
├── package.json (npm dependencies/scripts)
├── package-lock.json
├── README.md
├── Vagrantfile (Vagrant Box setup from Scotch Box)
└── webpack.config.js (Webpack configuraton)
```

## Scripts

When repository is initially cloned run Initial setup:

```
npm install
```

Create the Scotch Box pre-configured Vagrant Box:

```
vagrant up
```

Watch for file changes and auto refresh via Browsersync:

```
npm run watch
```

Bundle the website for distribution (using Webpack 4 production mode flag):

```
npm run build
```

Alternatively use webpack-dev-server over `watch` script:

```
npm run start
```
