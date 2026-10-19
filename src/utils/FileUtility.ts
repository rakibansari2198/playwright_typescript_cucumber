
import * as fs from 'fs/promises';
import path from 'path';
import { Download } from '@playwright/test';
import { fileConfig } from '../config/fileConfig';

export class FileUtility {

  async createDirectory(directoryPath: string): Promise<void> {
    await fs.mkdir(directoryPath, { recursive: true });
  }

  async saveDownload(download: Download): Promise<string> {
    await this.createDirectory(fileConfig.downloadDirectory);

    const filePath = path.join(
      fileConfig.downloadDirectory,
      download.suggestedFilename()
    );

    await download.saveAs(filePath);

    return filePath;
  }

  async fileExists(filePath: string): Promise<boolean> {
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }

  async deleteFile(filePath: string): Promise<void> {
    await fs.unlink(filePath);
  }
  
}
