import { Page, expect } from '@playwright/test';

export class InventoryPage {

    constructor(private page: Page) {}

    backpackAddToCartButton = () =>
        this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');

    cartBadge = () =>
        this.page.locator('[data-test="shopping-cart-badge"]');

    sortDropdown = () =>
        this.page.locator('[data-test="product-sort-container"]');

    async addBackpackToCart() {
        await this.backpackAddToCartButton().click();
    }

    async verifyItemAddedToCart() {
        await expect(this.cartBadge()).toHaveText('1');
    }

    async sortLowToHigh() {
        await this.sortDropdown().selectOption('lohi');
    }

    async verifySortApplied() {
        await expect(this.page.locator('.inventory_item').first())
            .toBeVisible();
    }

}