
import { Given, When, Then } from "@cucumber/cucumber";
import { config } from "../config/config";
import {expect} from "@playwright/test";


Given("user is on the register page", async function () {
  await this.page.goto(config.registerPath, { waitUntil: 'domcontentloaded' });

});

When(
  "user selects {string} from country dropdown",
  async function (country: string) {
    await this.registerPage.selectCountry(country);
  }
);

Then("selected country should be {string}", async function (country: string) {
  const selectedCountry = await this.registerPage.getSelectedCountry();
  await expect(selectedCountry).toBe(country);
});

When("user retrieves all country dropdown options", async function () {
    const countries: string[] = await this.registerPage.getAllCountries();
    await console.log("All countries in dropdown:", countries);
});

Then(
    "country dropdown should contain {string}",
    async function (country: string) {
        expect(await this.registerPage.getAllCountries()).toContain(country);
    }
);
