import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

Given('user navigates to the file upload page', async function () {
  await this.filePage.openUploadPage();
});

When('user uploads a file', async function () {
  await this.filePage.uploadFile();
});

When('user clicks on the upload button', async function () {
  await this.filePage.clickUploadButton();
});

Given('user navigates to the file download page', async function () {
  await this.filePage.openDownloadPage();
});

When('user clicks on the download link', async function () {
  this.download = await this.filePage.downloadFile();
});

Then('file should be downloaded successfully', async function () {
  expect(await this.download.failure()).toBeNull();
});
