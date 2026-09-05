const report = require('multiple-cucumber-html-reporter');

report.generate({
  jsonDir: 'src/reports',
  reportPath: 'src/reports/html-report',
  metadata: {
    browser: {
      name: 'chrome',
      version: 'latest'
    },
    device: 'Local Machine',
    platform: {
      name: 'windows',
      version: '11'
    }
  }
});