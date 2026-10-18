import { Page, expect } from "@playwright/test";
import { BasePage } from "../pages/BasePage";
import { config } from "../config/config";

export class LoginPage extends BasePage {

  private userName = this.page.getByPlaceholder('Username');
  private password = this.page.getByPlaceholder('Password')
  private loginButton = this.page.locator(`//button[text()=' Login ']`);

  constructor(page: Page) {super(page);}

  async login(username: string, password: string) {
    await this.page.goto(config.loginPath, { waitUntil: 'domcontentloaded' });
    await this.userName.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async verifyLoginSuccess() {
    const dashboardHeader = this.page.locator('h6:has-text("Dashboard")');
    await expect(dashboardHeader).toBeVisible();
  }
  
  
}