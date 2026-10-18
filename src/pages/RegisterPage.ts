import { Page } from "@playwright/test";
import { BasePage } from "../pages/BasePage";

export class RegisterPage extends BasePage {

  public countryDropdown = this.page.locator(`xpath=//select[@id='country']`);
  public selectedCountry = this.page.locator(`//select[@id='country']/following-sibling::span//span[@id='select2-country-container']`);

  constructor(page: Page) {super(page);}

  async selectCountry(country: string) {
    await this.selectDropdown(this.countryDropdown, country);
  }

  async selectCountryByValue(value: string) {
    await this.countryDropdown.selectOption(value);
  }

  async getAllCountries(): Promise<string[]> {
    return await this.getDropdownOptions(this.countryDropdown);
  }

  async getSelectedCountry(): Promise<string> {
        const country = await this.selectedCountry.textContent();

        if (!country) {
            throw new Error("No country is selected or selected country text is empty.");
        }   
        return country.trim();
    }
  
  
}