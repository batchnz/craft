<?php

/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here. You can see a
 * list of the available settings in vendor/craftcms/cms/src/config/GeneralConfig.php.
 *
 * @see \craft\config\GeneralConfig
 */

// Define dev config based on defined environment variables
$isHttps = getenv('HTTP_X_FORWARDED_PROTO') === 'https';
$virtualHost = getenv('VIRTUAL_HOST');
$scheme = 'http' . ($isHttps ? 's' : '') . '://';
$devHost = $virtualHost ? $scheme . $virtualHost . '/' : null;

// Work out whether this site is being server via ngrok
$isNgrok = array_key_exists('HTTP_X_ORIGINAL_HOST', $_SERVER) && strpos($_SERVER['HTTP_X_ORIGINAL_HOST'], 'ngrok');
$devHost = $scheme . $_SERVER[$isNgrok ? 'HTTP_X_ORIGINAL_HOST' : 'SERVER_NAME'] . '/';

return [
    // Global settings
    '*' => [
        // Default Week Start Day (0 = Sunday, 1 = Monday...)
        'defaultWeekStartDay' => 1,

        // Whether generated URLs should omit "index.php"
        'omitScriptNameInUrls' => true,

        // Control Panel trigger word
        'cpTrigger' => 'admin',

        // The secure key Craft will use for hashing and encrypting data
        'securityKey' => getenv('SECURITY_KEY'),

        // Whether to save the project config out to config/project.yaml
        // (see https://docs.craftcms.com/v3/project-config.html)
        'useProjectConfigFile' => true,
    ],

    // Dev environment settings
    'dev' => [
        // Dev Mode (see https://craftcms.com/guides/what-dev-mode-does)
        'devMode' => true,
        'siteUrl' => $devHost ?? 'http://localhost/'
    ],

    // Testing environment settings
    'testing' => [
        // Dev Mode (see https://craftcms.com/guides/what-dev-mode-does)
        'devMode' => true,
        'siteUrl' => $testHost,
    ],

    // Staging environment settings
    'staging' => [
        // Set this to `false` to prevent administrative changes from being made on staging
        'allowAdminChanges' => false,
    ],

    // Production environment settings
    'production' => [
        // Set this to `false` to prevent administrative changes from being made on production
        'allowAdminChanges' => false,
    ],
];
