import { test } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import users from '../.../../../../utils/test-data/users.json';

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

        await loginPage.verifySuccessfulLogin();

    });

    test('Invalid Login', async ({ page }) => {

        const loginPage = new LoginPage(page);

        await loginPage.navigate();

        await loginPage.login(
            users.invalidUser.username,
            users.invalidUser.password

            // process.env.INVALID_USERNAME!,
            // process.env.INVALID_PASSWORD!
        );

        await loginPage.verifyLoginError();

    });

});