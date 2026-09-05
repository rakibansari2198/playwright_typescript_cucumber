import {
  Before,
  After,
  BeforeAll,
  AfterAll,
  Status,
  setDefaultTimeout
} from '@cucumber/cucumber';

import { BrowserManager } from '../config/BrowserManager';
import { CustomWorld } from '../hooks/world';

setDefaultTimeout(60000);

const browserManager = new BrowserManager();

BeforeAll(async () => {
  await browserManager.launchBrowser();
});

Before(async function (this: CustomWorld) {
  const { context, page } = await browserManager.createContext();

  this.context = context;
  this.page = page;
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
});

AfterAll(async () => {
  await browserManager.closeBrowser();
});