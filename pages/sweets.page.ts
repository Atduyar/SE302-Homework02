import { Page, expect } from "@playwright/test";
import { BasePage } from "./base.page";

export class SweetsPage extends BasePage {
	readonly productCards = this.page.locator(".card");
	readonly addToCartButtons = this.page.locator("a.addItem");
	readonly productTitles = this.page.locator(".card h4");
	readonly productPrices = this.page.locator(".card small.text-muted");
	readonly basketCount = this.page.locator(".badge-success");

	async navigate() {
		await this.goto("/sweets");
	}

	async getBasketItemCount() {
		let count = await this.basketCount.textContent();
		return count;
	}

	async getAddToCartButton(index: number) {
		return this.addToCartButtons.nth(index);
	}

	async addProductToCart(index: number) {
		const button = await this.getAddToCartButton(index);
		await button.click();
	}

	async getProductTitle(index: number) {
		return await this.productTitles.nth(index).textContent();
	}

	async getProductPrice(index: number) {
		const priceText = await this.productPrices.nth(index).textContent();
		return priceText ? parseFloat(priceText.replace("£", "")) : 0;
	}

	async assertOnSweetsPage() {
		await expect(this.page).toHaveURL(/.*\/sweets/);
	}

	async assertProductsVisible() {
		await expect(this.productCards.first()).toBeVisible();
	}
}
