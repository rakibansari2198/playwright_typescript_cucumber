import { Page, Locator, expect } from "@playwright/test";

export class BasePage {
    constructor(protected page: Page) {}

    async click(locator: Locator) {
        await locator.click();
    }

    async enterText(locator: Locator, text: string) {
        await locator.fill(text);
    }

    async getText(locator: Locator): Promise<string> {
        return (await locator.textContent())?.trim() ?? "";
    }

    async isVisible(locator: Locator): Promise<boolean> {
        return await locator.isVisible();
    }

    async verifyVisible(locator: Locator) {
        await expect(locator).toBeVisible();
    }

    async selectDropdown(locator: Locator, value: string) {
        try {
            await locator.selectOption({ label: value });
            await console.log(`Selected Dropdown : ${value}`);
        } catch (error) {
            throw new Error(`Failed to select "${value}" from dropdown.`);
        }
    }

    async getDropdownOptions(locator: Locator): Promise<string[]> {
        const options = await locator.locator('option').allTextContents();
        return options.map(option => option.trim());
    }

    async checkCheckbox(locator: Locator) {
        await locator.check();
    }

    async uncheckCheckbox(locator: Locator) {
        await locator.uncheck();
    }

    async hover(locator: Locator) {
        await locator.hover();
    }

    async pressKey(locator: Locator, key: string) {
        await locator.press(key);
    }

    async waitForElement(locator: Locator) {
        await locator.waitFor({ state: "visible" });
    }

    async refreshPage() {
        await this.page.reload();
    }

    async goBack() {
        await this.page.goBack();
    }

    async goForward() {
        await this.page.goForward();
    }
}
