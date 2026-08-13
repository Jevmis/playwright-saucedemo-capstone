import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { InventoryPage } from '../../../pages/InventoryPage';
import { CheckoutPage } from '../../../pages/CheckoutPage';
import users from '../../../utils/test-data/users.json';

test.describe('Checkout Tests', () => {

    test('Complete Checkout Flow', async ({ page }) => {

        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        const checkoutPage = new CheckoutPage(page);

        await loginPage.navigate();

        await loginPage.login(
            users.validUser.username,
            users.validUser.password
        );

        await inventoryPage.addBackpackToCart();

        await checkoutPage.proceedToCheckout();

        await checkoutPage.enterCheckoutInformation(
            users.checkout.firstName,
            users.checkout.lastName,
            users.checkout.postalCode
        );

        await checkoutPage.finishCheckout();

        await expect(page.locator('.complete-header'))
            .toContainText('Thank you for your order');
        await expect(page).toHaveURL(/checkout-complete/);

    });

    test('Checkout Without First Name', async ({ page }) => {

        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        const checkoutPage = new CheckoutPage(page);

        await loginPage.navigate();

        await loginPage.login(
            users.validUser.username,
            users.validUser.password
        );

        await inventoryPage.addBackpackToCart();

        await checkoutPage.proceedToCheckout();

        await checkoutPage.lastNameInput().fill(
            users.checkout.lastName
        );

        await checkoutPage.postalCodeInput().fill(
            users.checkout.postalCode
        );

        await checkoutPage.continueButton().click();

        await expect(
            page.locator('[data-test="error"]')
        ).toContainText('First Name is required');

    });

});