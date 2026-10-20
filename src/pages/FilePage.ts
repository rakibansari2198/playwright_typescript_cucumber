
import { Page, Download } from '@playwright/test';
import { fileConfig } from '../config/fileConfig';
import { config } from '../config/config';
import { BasePage } from './BasePage';

export class FilePage extends BasePage {

  private downloadButton = this.page.getByRole('link', { name: 'Download' });
  private uploadInput = this.page.locator('input[type="file"]');
  private uploadButton = this.page.getByRole('button', { name: 'Upload' });

  constructor( page: Page) {
    super(page);
  }

  async openUploadPage(): Promise<void> {
    await this.page.goto(config.fileUploadPath, { waitUntil: 'domcontentloaded' });
  }

  async uploadFile(): Promise<void> {
    await this.uploadSelectedFile(this.uploadInput, fileConfig.uploadFile);
  }
   async clickUploadButton(): Promise<void> {
    await this.click(this.uploadButton);
  }

  async openDownloadPage(): Promise<void> {
    await this.page.goto(config.fileDownloadPath, { waitUntil: 'domcontentloaded' });
  }

  async downloadFile(): Promise<Download> {
    return await this.clicksOnDownloadLink(this.downloadButton);
  }
  
}
