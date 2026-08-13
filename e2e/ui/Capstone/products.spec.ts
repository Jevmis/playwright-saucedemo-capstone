import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { InventoryPage } from '../../../pages/InventoryPage';
import users from '../../../utils/test-data/users.json';

test.describe('Products Tests', () => {

    test('Add Product To Cart', async ({ page }) => {

        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);

        await loginPage.navigate();

        await loginPage.login(
            users.validUser.username,
            users.validUser.password
        );

        await inventoryPage.addBackpackToCart();

        await expect(
            page.locator('.shopping_cart_badge')
        ).toContainText('1');

    });

    test('Sort Products Low To High', async ({ page }) => {

        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);

        await loginPage.navigate();

        await loginPage.login(
            users.validUser.username,
            users.validUser.password
        );

        await inventoryPage.sortLowToHigh();

        await expect(
            page.locator('[data-test="product-sort-container"]')
        ).toHaveValue('lohi');

        const prices = await page
            .locator('.inventory_item_price')
            .allTextContents();

        const numericPrices = prices.map(price =>
            Number(price.replace('$', ''))
        );

        const sortedPrices = [...numericPrices]
            .sort((a, b) => a - b);

        expect(numericPrices).toEqual(sortedPrices);

    });

});