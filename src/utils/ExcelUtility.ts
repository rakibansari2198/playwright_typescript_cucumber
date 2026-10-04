import ExcelJS from "exceljs";
import fs from "fs";
import path from "path";

export type ExcelValue = string | number | boolean;

export type ExcelRow = Record<string, ExcelValue>;

export class ExcelUtility {

    private workbook: ExcelJS.Workbook;
    private filePath: string;

    constructor(filePath: string) {
        this.filePath = path.resolve(filePath);
        this.workbook = new ExcelJS.Workbook();
    }

    // --------------------------------------------------
    // Load Workbook
    // --------------------------------------------------

    async loadWorkbook(): Promise<void> {

        if (!fs.existsSync(this.filePath)) {
            throw new Error(
                `Excel file not found: ${this.filePath}`
            );
        }

        await this.workbook.xlsx.readFile(this.filePath);
    }

    // --------------------------------------------------
    // Get Worksheet
    // --------------------------------------------------

    private getWorksheet(sheetName: string): ExcelJS.Worksheet {

        const worksheet = this.workbook.getWorksheet(sheetName);

        if (!worksheet) {
            throw new Error(
                `Worksheet '${sheetName}' not found in ${this.filePath}`
            );
        }

        return worksheet;
    }

    // --------------------------------------------------
    // Get All Excel Data
    // --------------------------------------------------

    getExcelData(sheetName: string): ExcelRow[] {

        const worksheet = this.getWorksheet(sheetName);

        const headers: string[] = [];
        const testData: ExcelRow[] = [];

        // Read header row
        worksheet.getRow(1).eachCell(
            (cell, columnNumber) => {

                const header = this.getCellValue(cell);

                headers[columnNumber] = String(header);
            }
        );

        // Read data rows
        for (
            let rowNumber = 2;
            rowNumber <= worksheet.rowCount;
            rowNumber++
        ) {

            const currentRow = worksheet.getRow(rowNumber);

            const rowData: ExcelRow = {};

            for (
                let columnNumber = 1;
                columnNumber <= worksheet.columnCount;
                columnNumber++
            ) {

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

    // --------------------------------------------------
    // Find Single Row
    // --------------------------------------------------

    findRow(
        sheetName: string,
        columnName: string,
        expectedValue: ExcelValue
    ): ExcelRow | undefined {

        const data = this.getExcelData(sheetName);

        return data.find(
            row => row[columnName] === expectedValue
        );
    }

    // --------------------------------------------------
    // Get All Rows
    // --------------------------------------------------

    getAllRows(sheetName: string): ExcelRow[] {

        return this.getExcelData(sheetName);
    }

    // --------------------------------------------------
    // Get Rows By Value
    // --------------------------------------------------

    getRowsByValue(
        sheetName: string,
        columnName: string,
        expectedValue: ExcelValue
    ): ExcelRow[] {

        const data = this.getExcelData(sheetName);

        return data.filter(
            row => row[columnName] === expectedValue
        );
    }

    // --------------------------------------------------
    // Get Cell Value By Address
    // --------------------------------------------------

    getCellValueByAddress(
        sheetName: string,
        cellAddress: string
    ): ExcelValue {

        const worksheet = this.getWorksheet(sheetName);

        return this.getCellValue(
            worksheet.getCell(cellAddress)
        );
    }

    // --------------------------------------------------
    // Get Row Data
    // --------------------------------------------------

    getRowData(
        sheetName: string,
        rowNumber: number
    ): ExcelRow {

        const worksheet = this.getWorksheet(sheetName);

        const headers: string[] = [];
        const rowData: ExcelRow = {};

        // Read headers
        worksheet.getRow(1).eachCell(
            (cell, columnNumber) => {

                headers[columnNumber] =
                    String(this.getCellValue(cell));
            }
        );

        // Read requested row
        worksheet.getRow(rowNumber).eachCell(
            (cell, columnNumber) => {

                const columnName =
                    headers[columnNumber];

                if (columnName) {
                    rowData[columnName] =
                        this.getCellValue(cell);
                }
            }
        );

        return rowData;
    }

    // --------------------------------------------------
    // Get Row Count
    // --------------------------------------------------

    getRowCount(sheetName: string): number {

        return this.getWorksheet(sheetName).rowCount;
    }

    // --------------------------------------------------
    // Get Column Count
    // --------------------------------------------------

    getColumnCount(sheetName: string): number {

        return this.getWorksheet(sheetName).columnCount;
    }

    // --------------------------------------------------
    // Write Data To Excel
    // --------------------------------------------------

    async writeExcelData(
        sheetName: string,
        data: ExcelRow[]
    ): Promise<void> {

        let worksheet =
            this.workbook.getWorksheet(sheetName);

        if (!worksheet) {
            worksheet =
                this.workbook.addWorksheet(sheetName);
        }

        // Remove existing rows
        if (worksheet.rowCount > 0) {
            worksheet.spliceRows(
                1,
                worksheet.rowCount
            );
        }

        if (data.length === 0) {
            return;
        }

        // Get headers
        const headers =
            Object.keys(data[0]);

        // Add header row
        worksheet.addRow(headers);

        // Add data rows
        for (const row of data) {

            worksheet.addRow(
                headers.map(
                    header => row[header] ?? ""
                )
            );
        }
    }

    // --------------------------------------------------
    // Save Workbook
    // --------------------------------------------------

    async saveWorkbook(): Promise<void> {

        await this.workbook.xlsx.writeFile(
            this.filePath
        );
    }

    // --------------------------------------------------
    // Get Cell Value
    // --------------------------------------------------

    private getCellValue(
        cell: ExcelJS.Cell
    ): ExcelValue {

        const value = cell.value;

        // Empty cell
        if (
            value === null ||
            value === undefined
        ) {
            return "";
        }

        // Number
        if (typeof value === "number") {
            return value;
        }

        // Boolean
        if (typeof value === "boolean") {
            return value;
        }

        // String
        if (typeof value === "string") {
            return value;
        }

        // Object-based Excel values
        if (typeof value === "object") {

            // Formula
            if ("result" in value) {

                const result = value.result;

                if (typeof result === "number") {
                    return result;
                }

                if (typeof result === "boolean") {
                    return result;
                }

                return String(result ?? "");
            }

            // Rich text
            if ("richText" in value) {

                return value.richText
                    .map(item => item.text)
                    .join("");
            }

            // Hyperlink
            if ("hyperlink" in value) {

                return String(
                    value.text ??
                    value.hyperlink ??
                    ""
                );
            }

            // Text
            if ("text" in value) {

                return String(
                    value.text ?? ""
                );
            }
        }

        // Fallback
        return String(value);
    }
}