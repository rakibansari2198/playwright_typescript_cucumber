import { Page, expect } from "@playwright/test";

export class LoginPage {

  private userName = this.page.getByPlaceholder('Username');
  private password = this.page.getByPlaceholder('Password')
  private loginButton = this.page.locator(`//button[text()=' Login ']`);

  constructor(private page: Page) {}

  async login(username: string, password: string) {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',{ waitUntil: 'domcontentloaded'});
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