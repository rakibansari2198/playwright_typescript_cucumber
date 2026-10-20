
import path from 'path';

const PROJECT_ROOT = process.cwd();

export const fileConfig = {
  uploadFile: path.join(
    PROJECT_ROOT,
    'src',
    'testData',
    'TestData.xlsx'
  )
};
