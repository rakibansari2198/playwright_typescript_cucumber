import { Given, When, Then } from "@cucumber/cucumber";
import {expect} from "@playwright/test";


Then("user compare the data from excel sheet with db table data", async function () {
    await this.initializeDatabase();
    await this.initializeExcelUtility('src/testData/users_test_data.xlsx');
    const excelData = await this.excelUtility.getAllRows("Users");
    const dbData = await this.db.executeQuery("SELECT * FROM users");
    // Add comparison logic here
    console.log("Excel Data:", excelData);
    console.log("Database Data:", dbData);
    await expect(excelData).toEqual(dbData);
    await this.db.closeConnection();
});

