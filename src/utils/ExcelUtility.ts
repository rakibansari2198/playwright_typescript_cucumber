import ExcelJS from "exceljs";
import fs from "fs";
import path from "path";

export class ExcelUtility {
  private workbook: ExcelJS.Workbook;
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = path.resolve(filePath);
    this.workbook = new ExcelJS.Workbook();
  }


  async loadWorkbook(): Promise<void> {
    if (!fs.existsSync(this.filePath)) {
      throw new Error(`Excel file not found: ${this.filePath}`);
    }
    await this.workbook.xlsx.readFile(this.filePath);
  }

  private getWorksheet(sheetName: string): ExcelJS.Worksheet {
    const worksheet = this.workbook.getWorksheet(sheetName);

    if (!worksheet) {
      throw new Error(
        `Worksheet '${sheetName}' not found in ${this.filePath}`
      );
    }

    return worksheet;
  }

  getExcelData(sheetName: string): Record<string, string>[] {
    const worksheet = this.getWorksheet(sheetName);

    const headers: string[] = [];
    const testData: Record<string, string>[] = [];

    // Read header row
    worksheet.getRow(1).eachCell((cell, columnNumber) => {
      headers[columnNumber] = this.getCellValue(cell);
    });

    // Read data rows
    for (let rowNumber = 2; rowNumber <= worksheet.rowCount; rowNumber++) {
      const currentRow = worksheet.getRow(rowNumber);

      const rowData: Record<string, string> = {};

      for (let columnNumber = 1; columnNumber <= worksheet.columnCount; columnNumber++) {
        const columnName = headers[columnNumber];

        if (!columnName) {
          continue;
        }

        const value = this.getCellValue(
          currentRow.getCell(columnNumber)
        );

        rowData[columnName] = value;
      }

      if (Object.keys(rowData).length > 0) {
        testData.push(rowData);
      }
    }

    return testData;
  }

  findRow(
    sheetName: string,
    columnName: string,
    expectedValue: string
  ): Record<string, string> | undefined {
    const data = this.getExcelData(sheetName);

    return data.find(
      (row) => row[columnName] === expectedValue
    );
  }

  getAllRows(
      sheetName: string
  ): Record<string, string>[] {

      const data = this.getExcelData(sheetName);

      return data;
  }

  getRowsByValue(
    sheetName: string,
    columnName: string,
    expectedValue: string
  ): Record<string, string>[] {
    const data = this.getExcelData(sheetName);

    return data.filter(
      (row) => row[columnName] === expectedValue
    );
  }

  getCellValueByAddress(
    sheetName: string,
    cellAddress: string
  ): string {
    const worksheet = this.getWorksheet(sheetName);

    return this.getCellValue(
      worksheet.getCell(cellAddress)
    );
  }

  getRowData(
    sheetName: string,
    rowNumber: number
  ): Record<string, string> {
    const worksheet = this.getWorksheet(sheetName);

    const headers: string[] = [];
    const rowData: Record<string, string> = {};

    worksheet.getRow(1).eachCell((cell, columnNumber) => {
      headers[columnNumber] = this.getCellValue(cell);
    });

    worksheet.getRow(rowNumber).eachCell((cell, columnNumber) => {
      const columnName = headers[columnNumber];

      if (columnName) {
        rowData[columnName] = this.getCellValue(cell);
      }
    });

    return rowData;
  }

  getRowCount(sheetName: string): number {
    return this.getWorksheet(sheetName).rowCount;
  }

  getColumnCount(sheetName: string): number {
    return this.getWorksheet(sheetName).columnCount;
  }

  async writeExcelData(
    sheetName: string,
    data: Record<string, string | number | boolean>[]
  ): Promise<void> {
    let worksheet = this.workbook.getWorksheet(sheetName);

    if (!worksheet) {
      worksheet = this.workbook.addWorksheet(sheetName);
    }

    // Remove existing rows
    worksheet.spliceRows(1, worksheet.rowCount);

    if (data.length === 0) {
      return;
    }

    const headers = Object.keys(data[0]);

    // Add header row
    worksheet.addRow(headers);

    // Add data rows
    for (const row of data) {
      worksheet.addRow(
        headers.map((header) => row[header] ?? "")
      );
    }
  }

  async saveWorkbook(): Promise<void> {
    await this.workbook.xlsx.writeFile(this.filePath);
  }

  private getCellValue(cell: ExcelJS.Cell): string {
    const value = cell.value;

    if (value === null || value === undefined) {
      return "";
    }

    if (typeof value === "object") {
      if ("text" in value) {
        return String(value.text);
      }

      if ("result" in value) {
        return String(value.result ?? "");
      }

      if ("richText" in value) {
        return value.richText
          .map((item) => item.text)
          .join("");
      }

      // if ("hyperlink" in value) {
      //   return String(value.text ?? value.hyperlink);
      // }
    }

    return String(value);
  }
}