import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { CustomWorld } from '../hooks/world';

Given('the user navigates to the login page', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  await loginPage.navigate();
});

When('the user enters username {string} and password {string}', async function (this: CustomWorld, username: string, password: string) {
  const loginPage = new LoginPage(this.page);
  await loginPage.login(username, password);
});

When('clicks the login button', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  await loginPage.submit();
});

Then('the user should see {string}', async function (this: CustomWorld, expectedResult: string) {
  const loginPage = new LoginPage(this.page);

  if (expectedResult === 'Dashboard') {
    await expect(loginPage.dashboardHeader).toBeVisible();
    await expect(loginPage.dashboardHeader).toHaveText('Dashboard');
  } 

});