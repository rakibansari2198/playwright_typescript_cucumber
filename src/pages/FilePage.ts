
import { Page, Download } from '@playwright/test';
import { fileConfig } from '../config/fileConfig';
import { config } from '../config/config';

export class FilePage {

  private downloadButton = this.page.getByRole('link', { name: 'Download' });
  private uploadInput = this.page.locator('input[type="file"]');
  private uploadButton = this.page.getByRole('button', { name: 'Upload' });

  constructor(private readonly page: Page) {}

  async openUploadPage(): Promise<void> {
    await this.page.goto(config.fileUploadPath, { waitUntil: 'domcontentloaded' });
  }

  async uploadFile(): Promise<void> {
    await this.uploadInput.setInputFiles(fileConfig.uploadFile);
  }
   async clickUploadButton(): Promise<void> {
    await this.uploadButton.click();
  }

  async openDownloadPage(): Promise<void> {
    await this.page.goto(config.fileDownloadPath, { waitUntil: 'domcontentloaded' });
  }

  async downloadFile(): Promise<Download> {
    const downloadPromise = this.page.waitForEvent('download', { timeout: 180000 });
    await this.downloadButton.click();
    return await downloadPromise;
  }
}
