import {
  World,
  IWorldOptions,
  setWorldConstructor
} from '@cucumber/cucumber';

import {
  BrowserContext,
  Page
} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DatabaseUtility } from '../utils/DatabaseUtility';
import { ExcelUtility } from '../utils/ExcelUtility';
import { BrowserManager } from '../config/BrowserManager';
import { Browser } from '@playwright/test';

export class CustomWorld extends World {

  browser!: Browser;  
  context!: BrowserContext;
  page!: Page;
  loginPage!: LoginPage;
  db!: DatabaseUtility;
  excelUtility!: ExcelUtility; 
  

  constructor(options: IWorldOptions) {
    super(options);
  }

    async initializeExcelUtility(SheetPath: string) {
        this.excelUtility = new ExcelUtility(SheetPath);
        await this.excelUtility.loadWorkbook();
    }

   async initializePages() {
        this.loginPage = new LoginPage(this.page);
    }

    async initializeDatabase() {
        this.db = new DatabaseUtility();
        await this.db.connect();
    }

    // async initializeBrowserManager() {
    //     this.browserManager = new BrowserManager();
    // }

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
    

}

setWorldConstructor(CustomWorld);