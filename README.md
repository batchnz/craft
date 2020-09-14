# craft-starter

[Batch](https://batch.nz)'s Craft project starter that integrates VueJS and Tailwind CSS and Docksal configuration.

## What's Included
[craft-webapack](https://github.com/batchnz/craft-webpack) A Craft/Tailwind/Vue Webpack Configuration with:

* Core JS 3
* Vue Loader
* PostCSS
* PurgeCSS
* Manifest Configuration with Twigpack
* State Preserving Hot Reload
* Build/Dev Pipelines
* Source Maps
* Modern/Legacy Builds using Browserlist
* Compression

## Getting Started
### Installation

Create project with Composer and install dependencies

1. `composer create-project batchnz/craft-starter myproject`
2. `cd myproject`
3. `composer install`

### Docksal Setup
1. `fin up`
2. `fin exec craft setup`
3. `Install Plugins`

### SSL Certificate generation
(requires [mkcert](https://docs.docksal.io/tools/mkcert))

`fin debug -c 'mkdir -p ${CONFIG_CERTS}; mkcert -key-file ${CONFIG_CERTS}/${VIRTUAL_HOST}.key -cert-file ${CONFIG_CERTS}/${VIRTUAL_HOST}.crt *.${VIRTUAL_HOST} ${VIRTUAL_HOST}'`
`fin system reset vhost-proxy`

### Craft Plugins
Use fin exec to install any required plugins.
At a minimum, will need Twigpack to load assets in to the template

 `fin exec craft plugin/install twigpack`
 
### Webpack / Build Tool
1. `npm/yarn install`
2. `npm run/yarn build`

### Development
Run the development pipeline on the docksal container. It will be available at webpack.{domain}

`fin exec npm run/yarn dev`