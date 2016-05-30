# Songreq.me

## About
Songreq provides an easy way to allow rudimentary collaborative playlisting by suggesting songs to an admin (DJ).  It also strives to be a good open source example of an [Angular2](https://angular.io/) / [NodeJS](https://nodejs.org/) web app.  I'm building it to learn the new Angular2 framework and iron out a reference setup to use for future projects, and perhaps other people can do the same.

## Installation
Clone the repo
```
git clone https://github.com/BenOverholts/songreq.git
```

Run `npm install` in both `/server` and `/client`

Install typings globally...
```
npm install -g typings
```
... and run it from `/client`
```
typings install
```

Install gulp globally (optional, I think?)
```
npm install -g gulp
```

## Usage

### Client

* `gulp` or `gulp serve-dev`: run development build and serve in watch mode
* `gulp build`: run production build with bundling, min/uglify, etc.
* `gulp serve-build`: run production build and serve in watch mode

Use the `-p` flag to build with production API endpoint injected, otherwise the default is `localhost:8080`.

### Server

* `node server dev`: run in development mode
* `node server dev-build`: run in development mode (against a bundled build)
* `node server prod`: run in production mode

## Components
Coming Soon
