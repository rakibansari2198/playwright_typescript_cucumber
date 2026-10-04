import { Given, When, Then } from "@cucumber/cucumber";
import { LoginPage } from "../pages/LoginPage";
import { CustomWorld } from "../hooks/world";
import { browserManager } from '../hooks/hooks';

Then(
    "user login using Excel credentials from {string}",
    async function (
        this: CustomWorld,
        filePath: string
    ) {

        // Initialize Excel utility
        await this.initializeExcelUtility(filePath);

        // Read all test data from Login sheet
        const allRowsData = this.excelUtility.getAllRows("Login");

        for (const row of allRowsData) {

            const username = String(row["username"]);
            const password = String(row["password"]);

            let context;
            let page;

            try {

                // Create a separate browser context for each user
                ({ context, page } =
                    await browserManager.createContext());

                const loginPage = new LoginPage(page);

                // Perform login
                await loginPage.login(
                    username,
                    password
                );
                await loginPage.verifyLoginSuccess();

            } finally {

                // Always close context
                if (context) {
                    await context.close();
                }
            }
        }
    }
);

When("user login with {string} and {string}", async function (username: string, password: string) {
    await this.loginPage.login(username, password);
    await this.context.close();
});
