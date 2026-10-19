
import path from 'path';

const PROJECT_ROOT = process.cwd();

export const fileConfig = {
  uploadFile: path.join(
    PROJECT_ROOT,
    'src',
    'testData',
    'TestData.xlsx'
  ),

  downloadDirectory: path.join(
    PROJECT_ROOT,
    'test-results',
    'downloads'
  ),

  reportDirectory: path.join(
    PROJECT_ROOT,
    'src',
    'reports'
  )
};
