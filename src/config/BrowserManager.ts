import {
  chromium,
  firefox,
  webkit,
  Browser,
  BrowserContext,
  Page
} from '@playwright/test';

export class BrowserManager {

  private browser!: Browser;

  async launchBrowser(): Promise<void> {

    const browserName = process.env.BROWSER || 'chromium';
    const headless = process.env.HEADLESS !== 'false';

    switch (browserName.toLowerCase()) {
      case 'firefox':
        this.browser = await firefox.launch({ headless });
        break;

      case 'webkit':
        this.browser = await webkit.launch({ headless });
        break;

      default:
        this.browser = await chromium.launch({ headless });
    }
  }

  async createContext(): Promise<{
    context: BrowserContext;
    page: Page;
  }> {

    const context = await this.browser.newContext({
      viewport: { width: 1920, height: 1080 },
      acceptDownloads: true,
      ignoreHTTPSErrors: true
    });

    const page = await context.newPage();

    page.setDefaultTimeout(60000);
    page.setDefaultNavigationTimeout(60000);

    return { context, page };
  }

  async closeBrowser(): Promise<void> {
    await this.browser.close();
  }
}