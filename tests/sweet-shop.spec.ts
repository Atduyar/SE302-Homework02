import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { LoginPage } from "../pages/login.page";
import { SweetsPage } from "../pages/sweets.page";
import { BasketPage } from "../pages/basket.page";

test.describe("Sweet Shop Tests", () => {
	test.beforeEach(async ({ page }) => {
		const homePage = new HomePage(page);
		await homePage.navigate();
		await page.evaluate(() => localStorage.clear());
	});

	// TC01: Verify User Login (Positive + Form interaction)
	test("TC01 - verify user login with valid credentials", async ({
		page,
	}) => {
		const loginPage = new LoginPage(page);
		loginPage.navigate();

		await loginPage.assertOnLoginPage();
		const loginUrl = page.url();
		await loginPage.login("test@example.com", "password123");

		await page.waitForTimeout(500);
		await expect(page).not.toHaveURL(loginUrl);
	});

	// TC02: Verify Adding Product to Basket (Positive + Button interaction)
	test("TC02 - verify adding product to basket", async ({ page }) => {
		const sweetsPage = new SweetsPage(page);

		await sweetsPage.assertOnSweetsPage();
		await sweetsPage.assertProductsVisible();

		const addToBasketButton = sweetsPage.addToCartButtons.first();
		await expect(addToBasketButton).toBeVisible();

		await addToBasketButton.click();

		await page.waitForTimeout(500);

		await expect(addToBasketButton).toBeVisible();
		expect(await sweetsPage.getBasketItemCount()).toBe("1");
	});

	// TC04: Verify Login Fails with Invalid Email Format (Negative + Form interaction)
	test("TC04 - verify login fails with invalid email format", async ({
		page,
	}) => {
		const loginPage = new LoginPage(page);
		loginPage.navigate();

		await loginPage.assertOnLoginPage();

		await loginPage.enterEmail("invalidemail");
		await loginPage.enterPassword("password123");
		await loginPage.clickLogin();

		await expect(loginPage.invalidEmailError).toBeVisible();
	});

	// TC07: Verify Cart Price Calculation (Boundary + Locator assertion)
	test("TC07 - verify cart price calculation", async ({ page }) => {
		const homePage = new HomePage(page);
		const sweetsPage = new SweetsPage(page);
		const basketPage = new BasketPage(page);

		await homePage.navigateToSweets();

		const price1 = await sweetsPage.getProductPrice(0);
		const price2 = await sweetsPage.getProductPrice(1);
		const price3 = await sweetsPage.getProductPrice(2);

		expect(price1).toBeGreaterThan(0);
		expect(price2).toBeGreaterThan(0);
		expect(price3).toBeGreaterThan(0);

		const expectedTotal = price1 + price2 + price3;

		const buttons = await sweetsPage.addToCartButtons.all();
		expect(buttons.length).toBeGreaterThanOrEqual(3);

		await page.waitForTimeout(1000);
		await buttons[0].click();
		await page.waitForTimeout(1000);
		await buttons[1].click();
		await page.waitForTimeout(1000);
		await buttons[2].click();
		await page.waitForTimeout(1000);

		await homePage.navigateToBasket();
		await basketPage.assertOnBasketPage();

		await page.waitForTimeout(1000);
		expect(await basketPage.getTotalValue()).toContain(
			expectedTotal.toString(),
		);
		await basketPage.standartShipBtn.check({ force: true });

		expect(await basketPage.getTotalValue()).toContain(
			(expectedTotal + 1.99).toString(),
		);
		const basketItemsList = await basketPage.cartItems.all();
		expect(basketItemsList.length).toBeGreaterThan(0);
		expect(expectedTotal).toBeGreaterThan(0);
	});

	// TC08: Verify Product Cards Display Images (Usability)
	test("TC08 - verify product cards display images", async ({ page }) => {
		const homePage = new HomePage(page);
		const sweetsPage = new SweetsPage(page);

		await homePage.navigateToSweets();
		await sweetsPage.assertOnSweetsPage();

		const productCards = await sweetsPage.productCards.all();
		expect(productCards.length).toBeGreaterThan(0);

		await page.waitForTimeout(500);

		for (let i = 0; i < productCards.length; i++) {
			const card = productCards[i];
			const image = card.locator("img.card-img-top");

			const imageSrc = await image.getAttribute("src");
			await image.evaluate((img: HTMLImageElement) => {
				if (img.complete) return;
				return new Promise((resolve, reject) => {
					img.onload = resolve;
					img.onerror = reject;
				});
			});
			const naturalWidth = await image.evaluate(
				(img) => (img as HTMLImageElement).naturalWidth,
			);

			expect(
				naturalWidth,
				`Broken image detected: ${imageSrc}`,
			).toBeGreaterThan(0);
		}
	});
});
