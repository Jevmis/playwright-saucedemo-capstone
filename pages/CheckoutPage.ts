import { Page, expect } from '@playwright/test';

export class CheckoutPage {

    constructor(private page: Page) {}

    cartLink = () =>
        this.page.locator('[data-test="shopping-cart-link"]');

    checkoutButton = () =>
        this.page.locator('[data-test="checkout"]');

    firstNameInput = () =>
        this.page.locator('[data-test="firstName"]');

    lastNameInput = () =>
        this.page.locator('[data-test="lastName"]');

    postalCodeInput = () =>
        this.page.locator('[data-test="postalCode"]');

    continueButton = () =>
        this.page.locator('[data-test="continue"]');

    finishButton = () =>
        this.page.locator('[data-test="finish"]');

    successMessage = () =>
        this.page.locator('[data-test="complete-header"]');

    async proceedToCheckout() {
        await this.cartLink().click();
        await this.checkoutButton().click();
    }

    async enterCheckoutInformation(
        firstName: string,
        lastName: string,
        postalCode: string
    ) {
        await this.firstNameInput().fill(firstName);
        await this.lastNameInput().fill(lastName);
        await this.postalCodeInput().fill(postalCode);
        await this.continueButton().click();
    }

    async finishCheckout() {
        await this.finishButton().click();
    }

    async verifyOrderSuccess() {
        await expect(this.successMessage())
            .toHaveText('Thank you for your order!');
    }

}