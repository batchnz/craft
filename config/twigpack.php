<?php
/**
 * Twigpack Configuration
 */

return [
  // Global settings
  '*' => [
    // If `devMode` is on, use webpack-dev-server to all for HMR (hot module reloading)
    'useDevServer' => false,

    // The JavaScript entry from the manifest.json to inject on Twig error pages
    'errorEntry' => '',

    // Manifest file names
    'manifest' => [
      'legacy' => 'manifest-legacy.json',
      'modern' => 'manifest.json',
    ],

    // Public server config
    'server' => [
      'manifestPath' => '@webroot/dist',
      'publicPath' => '/',
    ],

    // webpack-dev-server config
    'devServer' => [
      'manifestPath' => 'http://localhost:8080/',
      'publicPath' => 'http://localhost:8080/',
    ],

    // Local files config
    'localFiles' => [
      'basePath' => '@webroot/dist',
      'criticalPrefix' => 'dist/criticalcss/',
      'criticalSuffix' => '_critical.min.css',
    ],
  ],

  // Dev environment settings
  'dev' => [
    // If `devMode` is on, use webpack-dev-server to all for HMR (hot module reloading)
    'useDevServer' => true,
  ],
  
  // Staging environment settings
  'staging' => [
  ],
  
  // Production environment settings
  'production' => [
  ],
];