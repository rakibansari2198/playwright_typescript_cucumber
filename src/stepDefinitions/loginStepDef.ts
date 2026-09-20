import { Given, When, Then } from "@cucumber/cucumber";
import { LoginPage } from "../pages/LoginPage";
import { CustomWorld } from "../hooks/world";
import { browserManager } from '../hooks/hooks';


Given("user read login data for test case",function () {
    const allRowsData = this.excelUtility.getAllRows("Login");
    console.log("All Rows from Excel:", allRowsData);
  }
);

Then("user login using Excel credentials", async function (this: CustomWorld) {
    const allRowsData = this.excelUtility.getAllRows("Login");
    for (const row of allRowsData) {
        const username = row["username"];
        const password = row["password"];
        const { context, page } =await browserManager.createContext();
        const loginPage = new LoginPage(page);
        await loginPage.login( username, password );
        await context.close();  
    }
});

Then("user fetch all data from TestData table", async function () {
    const result = await this.db.executeQuery(
        "SELECT * FROM TestData"
    );
    console.log(result);
});


When("user login with {string} and {string}", async function (username: string, password: string) {
    await this.loginPage.login(username, password);
    await this.context.close();
});
