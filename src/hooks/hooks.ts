import { Before,After,BeforeAll,AfterAll,Status } from '@cucumber/cucumber';
import { BrowserManager } from '../config/BrowserManager';
import { CustomWorld } from '../hooks/world';
import { setDefaultTimeout } from '@cucumber/cucumber';

export const browserManager = new BrowserManager();
setDefaultTimeout(90 * 1000); 

BeforeAll(async function () {
  await browserManager.launchBrowser();
});

Before(async function (this: CustomWorld) {
  const { context, page } = await browserManager.createContext();

  this.context = context;
  this.page = page;

  // Page objects
  await this.initializePages();

  // Database
  await  this.initializeDatabase();

  // Excel Utility
  await this.initializeExcelUtility('src/testData/TestData.xlsx');
});

After(async function (this: CustomWorld, { result, pickle }) {

  if (result?.status === Status.FAILED) {
    const screenshot = await this.page.screenshot({
      path: `src/reports/screenshots/${pickle.name.replace(/\s+/g, '_')}.png`,
      fullPage: true
    });

    await this.attach(screenshot, 'image/png');
  }

  await this.page.close();
  await this.context.close();
  await this.db.closeConnection();
});

AfterAll(async () => {
  await browserManager.closeBrowser();
});