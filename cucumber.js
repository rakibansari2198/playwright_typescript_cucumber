module.exports = {
  default: {
    require: [
      'src/stepDefinitions/**/*.ts',
      'src/hooks/**/*.ts'
    ],
    format: [
      'progress-bar',
      'json:src/reports/cucumber-report.json',
      'html:src/reports/cucumber-report.html'
    ],
    requireModule: ['ts-node/register'],
    paths: ['src/features/**/*.feature'],
    parallel: 2,
    // retry: 1,
    // publishQuiet: true
  }
};