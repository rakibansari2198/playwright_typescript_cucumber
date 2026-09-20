import { Page, expect } from "@playwright/test";

export class LoginPage {
  constructor(private page: Page) {}

  async login(username: string, password: string) {
    await this.page.goto(
        'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
        {
            waitUntil: 'domcontentloaded'
        }
    );
    await this.page.getByPlaceholder('Username').fill(username);
    await this.page.getByPlaceholder('Password').fill(password);
    await this.page.locator(`//button[text()=' Login ']`).click();
    await this.page.waitForLoadState('domcontentloaded');
  }
  
}