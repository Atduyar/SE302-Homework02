import { Page } from "@playwright/test";

export class BasePage {
	readonly page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	async goto(url: string) {
		await this.page.goto(url);
	}

	async getTitle() {
		return await this.page.title();
	}

	async getUrl() {
		return this.page.url();
	}

	async waitForSelector(selector: string) {
		await this.page.waitForSelector(selector);
	}
}
