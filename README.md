[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]



<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/batchnz/craft">
    <img src="https://www.batch.nz/batch-logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Batch Craft Starter</h3>

  <p align="center">
    An opinionated Craft CMS project starter that integrates VueJS and Tailwind CSS and Docksal configuration.
    <br />
    <a href="https://github.com/batchnz/craft"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/batchnz/craft/issues">Report Bug</a>
    ·
    <a href="https://github.com/batchnz/craft/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)
* [Acknowledgements](#acknowledgements)



<!-- ABOUT THE PROJECT -->
## About The Project

This package pulls together a series of 

Our workflow goes something like this:
1. A new branch is created from master
2. Changes are committed using Commitizen and linted with Commitlint
3. A pull request is raised targeting the master branch
4. Once merged, a GitLab pipeline will run analysing the new commits and generating a changelog, release notes and semver tag

The idea behind this project was to create a simple installable dev tool that enforces consistest, high quality commit messages with auto-generated changelogs/release notes and to remove human emotion from the versioning.


### Built With

* [CraftCMS](https://craftcms.com/)
* [VueJS](https://vuejs.org/)
* [Tailwind CSS](https://tailwindcss.com/)
* [Webpack](https://commitlint.js.org)
* [Jest](https://jestjs.io/)
* [Docksal](https://docksal.io/)


<!-- GETTING STARTED -->
## Getting Started

To create a new project using this starter, follow these steps

### Prerequisites

In order to use the docksal configuration in this starter, you'll need to have Docksal up and running. You can find instructions at [https://docksal.io/](https://docksal.io/)

### Installation

1. Create a new project via composer, replacing 'myproject' with the desired project directory name
```sh
fin rc composer create-project batch/craft-starter myproject --remove-vcs
```
2. Edit the .docksal/docksal.env file and configure `VIRTUAL_HOST` and `VIRTUAL_HOST_CERT_NAME` to match the local host name you want to use eg. `craftstarter.batch`
***Note:*** By default Docksal will only automatically resolve .docksal domains. [More info here](https://docs.docksal.io/core/system-dns/)

3. Generate an SSL certificate. We recommend using the [mkcert global addon](https://docs.docksal.io/tools/mkcert#setup-and-usage-via-addon) which can be installed with

`fin addon install --global mkcert`

```sh
fin mkcert create
```

4. Reset vhost-proxy to pick-up the new certificate
```sh
fin system reset vhost-proxy
```

5. Start up the docksal containers
```sh
fin up
```

6. Install Craft via the command line installer
```sh
fin exec craft install
```

7. Install NPM dependencies
```sh
fin exec npm install
```

8. Generate a Tailwind config file
```sh
fin exec npx tailwind init
```

9. Build the asset files
```sh
fin exec npm run build
```

10. That's it!

Your new project should now be available at the configured domain and you should see a demo/Hello World page to confirm. 

<!-- USAGE EXAMPLES -->
## Usage



### Webpack / Build Tool
Install the depdendencies for the build tool
```sh
fin exec npm install
```

Create a Tailwind config file
```sh
fin exec npx tailwind init
```

**Production**
```sh
fin exec npm run build
```

**Development**

Run the development pipeline on the docksal container. It will be available at webpack.{yourdomain}
```sh
fin exec npm run dev
```

Use the following commands to specifically generate a *legacy* or *combined* browser build during development
```sh
fin exec npm run dev-legacy
fin exec npm run dev-combined
```

### Build Configuration

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

### Craft Plugins
Use the `fin exec craft plugin/install` command to install any additional plugins.

Twigpack is required, and installed by default. We also include the following common plugins in the composer.json dependencies

* [Mailgun](https://github.com/craftcms/mailgun) - `fin exec craft plugin/install mailgun`
* [Redactor](https://github.com/craftcms/redactor) - `fin exec craft plugin/install redactor`
* [SEOMatic](https://github.com/nystudio107/craft-seomatic) -  `fin exec craft plugin/install seomatic`
* [Freeform](https://github.com/solspace/craft3-freeform) -  `fin exec craft plugin/install freeform`
* [Navigation](https://github.com/verbb/navigation)  - `fin exec craft plugin/install navigation`


## Testing

**Frontend**

The starter comes with [Jest](https://jestjs.io/) installed and configured, plus the [Vue testing framework](https://testing-library.com/docs/vue-testing-library/intro) helper library. To run the test suite, you can use the command

`fin exec npm run test`. 


<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/batchnz/craft/issues) for a list of proposed features (and known issues).


<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

Josh Smith - [@batchnz](https://twitter.com/batchnz) - josh@batch.nz

Jude Reid - [@batchnz](https://twitter.com/batchnz) - jude@batch.nz

Project Link: [https://github.com/batchnz/craft](https://github.com/batchnz/craft)



<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements

Thanks to all the hard work by the teams behind the tools used in this project.



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/batchnz/craft.svg?style=flat-square
[contributors-url]: https://github.com/batchnz/craft/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/batchnz/craft.svg?style=flat-square
[forks-url]: https://github.com/batchnz/craft/network/members
[stars-shield]: https://img.shields.io/github/stars/batchnz/craft.svg?style=flat-square
[stars-url]: https://github.com/batchnz/craft/stargazers
[issues-shield]: https://img.shields.io/github/issues/batchnz/craft.svg?style=flat-square
[issues-url]: https://github.com/batchnz/craft/issues
[license-shield]: https://img.shields.io/github/license/batchnz/craft.svg?style=flat-square
[license-url]: https://github.com/batchnz/craft/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/batchnz
[product-screenshot]: images/screenshot.png
