import { Page, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class HomePage extends BasePage {
  readonly sweetsLink = this.page.locator('a:has-text("Sweets")');
  readonly aboutLink = this.page.locator('a:has-text("About")');
  readonly loginLink = this.page.locator('a:has-text("Login")');
  readonly basketLink = this.page.locator('.nav-link:has-text("Basket")');
  readonly basketBadge = this.page.locator('.badge.badge-success');
  readonly browseSweetsButton = this.page.locator('a:has-text("Browse Sweets")');

  async navigate() {
    await this.goto('/');
  }

  async navigateToSweets() {
    await this.sweetsLink.first().click();
  }

  async navigateToAbout() {
    await this.aboutLink.click();
  }

  async navigateToLogin() {
    await this.loginLink.click();
  }

  async navigateToBasket() {
    await this.basketLink.click();
  }

  async assertOnHomePage() {
    await expect(this.page).toHaveURL(/https:\/\/sweetshop\.netlify\.app\/?$/);
  }
}
