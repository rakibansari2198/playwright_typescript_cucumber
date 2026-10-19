import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { FilePage } from '../pages/FilePage';
import { FileUtility } from '../utils/FileUtility';

const fileUtility = new FileUtility();

Given('user navigates to the file upload page', async function () {
  await this.filePage.openUploadPage();
});

When('user uploads a file', async function () {
  await this.filePage.uploadFile();
});

When('user clicks on the upload button', async function () {
  await this.filePage.clickUploadButton();
});

Then('uploaded file should be displayed successfully', async function () {
  await expect(this.page.getByText('File uploaded successfully')).toBeVisible();
});

Given('user navigates to the file download page', async function () {
  await this.filePage.openDownloadPage();
});

When('user clicks on the download link', async function () {
  const download = await this.filePage.downloadFile();

  this.downloadedFilePath = await fileUtility.saveDownload(download);
});

Then('file should be downloaded successfully', async function () {
  expect(this.downloadedFilePath).toBeTruthy();

  expect(await fileUtility.fileExists(this.downloadedFilePath)).toBe(true);
});

Then('downloaded file should exist in the download directory',async function () {
     // Step 1: Validate file exists
    expect(await fileUtility.fileExists(this.downloadedFilePath)).toBe(true);

    // Step 2: Delete downloaded file
    await fileUtility.deleteFile(this.downloadedFilePath);

    // Step 3: Validate file is deleted
    expect(await fileUtility.fileExists(this.downloadedFilePath)).toBe(false);
  }
);