# craft-starter

[Batch](https://batch.nz)'s Craft project starter that integrates VueJS and Tailwind CSS and Docksal configuration.

## Dependencies

* [Composer](https://getcomposer.org/)
* [Node/Npm](https://nodejs.org/en/)
* [Docksal](https://docksal.io/)

## What's Included

* Craft Starter - A starter Craft installation, setup with Twigpack configured for loading production and development assets
* Craft Webpack - A Craft/Tailwind/Vue Webpack configuration
* Docksal Configuration - A default docksal environment, configured for webpack development with Ngrok support.



## Getting Started
### Installation

Create project with Composer and install dependencies

1. `composer create-project batchnz/craft-starter myproject`
2. `cd myproject`
3. `composer install`

### Docksal Setup
1. Edit .docksal/docksal.env and configure the VIRTUAL_HOST and VIRTUAL_HOST_CERT_NAME environment variables

2. run `fin up`

3. run `fin exec craft setup` and follow the prompts

   The default Docksal database details are

   * Host: DB
   * Username: root
   * Password: root
   * database: default

### SSL Certificate generation
(requires [mkcert](https://docs.docksal.io/tools/mkcert))

Generate a new certificate using the environment variables

`fin debug -c 'mkdir -p ${CONFIG_CERTS}; mkcert -key-file ${CONFIG_CERTS}/${VIRTUAL_HOST}.key -cert-file ${CONFIG_CERTS}/${VIRTUAL_HOST}.crt *.${VIRTUAL_HOST} ${VIRTUAL_HOST}'`

Reset the vhost-proxy container to load the new certificate

`fin system reset vhost-proxy`

### Craft Plugins
Use the `fin exec craft plugin/install` command to install any required plugins.
At a minimum, you will need Twigpack to load the CSS/Javascript assets into the template

 `fin exec craft plugin/install twigpack`

By default, we also include

* [Mailgun](https://github.com/craftcms/mailgun)
* [Redactor](https://github.com/craftcms/redactor)
* [SEOMatic](https://github.com/nystudio107/craft-seomatic)
* [Freeform](https://github.com/solspace/craft3-freeform)
* [Navigation](https://github.com/verbb/navigation)

### Webpack / Build Tool
Install the depdendencies for the build tool

`npm/yarn install`

Create a Tailwind config file

`npx/yarn tailwind init`

**Production**

`npm run/yarn build`

**Development**

Run the development pipeline on the docksal container. It will be available at webpack.{yourdomain}

`fin exec npm run/yarn dev`

If want to use the legacy or combined build types during development, you use the`dev-modern` or `dev-combined` tasks

## Build Configuration

**Settings**

The settings in [webpack.settings.js](https://github.com/batchnz/craft-webpack/blob/master/webpack.settings.js) can be overridden at a project level by placing a webpack.settings.js file in the project root. This will be merged with the base webpack.settings.js file during build.

eg.

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

eg. 

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

