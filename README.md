# craft-starter

[Batch](https://batch.nz)'s Craft project starter that integrates VueJS and Tailwind CSS and Docksal configuration.

## Dependencies

* [Docksal](https://docksal.io/)

## What's Included

* Craft Starter - A starter Craft installation, setup with Twigpack configured for loading production and development assets
* Craft Webpack - A Craft/Tailwind/Vue Webpack configuration
* Docksal Configuration - A default docksal environment, configured for webpack development with Ngrok support.

## Getting Started
Create project with Composer

`fin rc composer create-project batch/craft-starter myproject --remove-vcs`

### Setup Docksal
Edit the .docksal/docksal.env and configure the `VIRTUAL_HOST` and `VIRTUAL_HOST_CERT_NAME` environment variables

run `fin up`

run `fin exec craft install` and follow the prompts

### Craft Plugins
Use the `fin exec craft plugin/install` command to install any required plugins.
At a minimum, you will need Twigpack to load the CSS/Javascript assets into the template

 `fin exec craft plugin/install twigpack`

By default, we also include

* [Mailgun](https://github.com/craftcms/mailgun) - `fin exec craft plugin/install mailgun`
* [Redactor](https://github.com/craftcms/redactor) - `fin exec craft plugin/install redactor`
* [SEOMatic](https://github.com/nystudio107/craft-seomatic) -  `fin exec craft plugin/install seomatic`
* [Freeform](https://github.com/solspace/craft3-freeform) -  `fin exec craft plugin/install freeform`
* [Navigation](https://github.com/verbb/navigation)  - `fin exec craft plugin/install navigation`

### Webpack / Build Tool
Install the depdendencies for the build tool

`fin exec npm install`

Create a Tailwind config file

`fin exec npx tailwind init`

**Production**

`fin exec npm run build`

**Development**

Run the development pipeline on the docksal container. It will be available at webpack.{yourdomain}

`fin exec npm run dev`

Use the following commands to specifically generate a *legacy* or *combined* browser build during development

`fin exec npm run dev-legacy`

`fin exec npm run dev-combined`

### SSL Certificate generation

Generate a new certificate (requires [mkcert addon](https://docs.docksal.io/tools/mkcert#setup-and-usage-via-addon))

`fin mkcert create`

Reset vhost-proxy to pick-up the new certificate

`fin system reset vhost-proxy`

## Build Configuration

**Settings**

The build settings in [webpack.settings.js](https://github.com/batchnz/craft-webpack/blob/master/webpack.settings.js) can be overridden at a project level by placing a webpack.settings.js file in the project root. This will be merged with the base webpack.settings.js file during build.

Example:

```javascript
module.exports = {
    paths: {
        src: {
            base: "./resources/",
            css: "./resources/css/",
            js: "./resources/js/"
        }
    }
};
```

**Webpack Config**

Any custom Webpack config can be included by adding a webpack.config.js in the project root. This will be merged with the final Webpack config during build.

Example:

```javascript
const path = require("path");

module.exports = {
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src/vue/")
    }
  }
};
```

## Testing

**Frontend**

The starter comes with [Jest](https://jestjs.io/) installed and configured, plus the [Vue testing framework](https://testing-library.com/docs/vue-testing-library/intro) helper library. To run the test suite, you can use the command `npm run test`. 

