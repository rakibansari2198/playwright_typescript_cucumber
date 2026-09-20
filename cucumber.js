module.exports = {
  default: {
    require: [
      'src/stepDefinitions/**/*.ts',
      'src/hooks/**/*.ts'
    ],
    format: [
      // 'progress-bar',
      'summary',
      'json:src/reports/cucumber-report.json',
      'html:src/reports/cucumber-report.html'
    ],
    requireModule: ['ts-node/register',"dotenv/config"],
    paths: ['src/features/**/*.feature'],
    // parallel: 2,
    // retry: 1,
    // publishQuiet: true
  }
};