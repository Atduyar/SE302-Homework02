import { Page, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  readonly emailInput = this.page.locator('input[type="email"]');
  readonly passwordInput = this.page.locator('input[type="password"]');
  readonly loginButton = this.page.locator('button:has-text("Login")');
  readonly errorMessage = this.page.locator('.error-message');
  readonly invalidEmailError = this.page.locator('.invalid-feedback.invalid-email');

  async navigate() {
    await this.goto('/login');
  }

  async enterEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async enterPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async clickLogin() {
    await this.loginButton.click();
  }

  async login(email: string, password: string) {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  async assertOnLoginPage() {
    await expect(this.page).toHaveURL(/.*\/login/);
  }
}
