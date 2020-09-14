module.exports = {
  plugins: [
    require('postcss-import', {
      plugins: [require('stylelint')({
        rules: {
          'at-rule-no-unknown': [
            true,
            {
              ignoreAtRules: ['screen','tailwind']
            }
          ]
        }
      })]
    }),
    require('tailwindcss')('./tailwind.config.js'),
    require('postcss-extend-rule'),
    require('postcss-advanced-variables'),
    require('postcss-preset-env'), // Defaults to Stage 2
    require('postcss-atroot'),
    require('postcss-property-lookup'),
    require('postcss-nested'),
    require('autoprefixer')({
      autoprefixer: {
        grid: true
      },
      features: {
        'nesting-rules': true
      }
    }),
    require('postcss-reporter')({ clearReportedMessages: true }),
    require('postcss-inline-svg')
  ]
};
