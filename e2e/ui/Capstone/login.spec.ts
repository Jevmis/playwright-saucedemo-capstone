import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import users from '../../../utils/test-data/users.json';

test.describe('Login Tests', () => {

    test('Valid Login', async ({ page }) => {

        const loginPage = new LoginPage(page);

        await loginPage.navigate();

        await loginPage.login(
            users.validUser.username,
            users.validUser.password

            // process.env.STANDARD_USERNAME!,
            // process.env.STANDARD_PASSWORD!
        );

        await expect(page).toHaveURL(/inventory/);
        await expect(page.locator('.title')).toContainText('Products');

    });

    test('Invalid Login', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.navigate();

    await loginPage.login(
        users.invalidUser.username,
        users.invalidUser.password
    );

    await loginPage.verifyLoginError();

    await expect(
        page.locator('[data-test="error"]')
    ).toContainText(
        'Epic sadface: Username and password do not match any user in this service'
    );

});

});