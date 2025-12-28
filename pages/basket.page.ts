import { Page, expect } from "@playwright/test";
import { BasePage } from "./base.page";

export class BasketPage extends BasePage {
	readonly cartItems = this.page.locator("#basketItems li");
	readonly basketCount = this.page.locator("#basketCount");
	readonly emptyBasketMessage = this.page.locator(
		"text=/empty|basket is empty/i",
	);
	readonly standartShipBtn = this.page.locator("#exampleRadios2");
	readonly total = this.page.locator("li", { hasText: "Total (GBP)" });

	async navigate() {
		await this.goto("/basket");
	}

	async getTotalValue() {
		const totalValue = await this.total.locator("strong").innerText();
		return totalValue;
	}

	async getCartItemCount() {
		const countText = await this.basketCount.textContent();
		return parseInt(countText || "0");
	}

	async assertOnBasketPage() {
		await expect(this.page).toHaveURL(/.*\/basket/);
	}
}
