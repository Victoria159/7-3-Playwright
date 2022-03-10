const { test, expect } = require('@playwright/test');
const user = require('../user');

test.beforeEach(async ({ page }) => {
    await page.goto('https://netology.ru/?modal=sign_in');
});

test.afterEach(async ({ page }) => {
    await page.close();
});

test.describe('Authorization', () => {
    test('Authorization with valid data', async ({ page }) => {
        await page.locator('[placeholder="Email"]').fill(user.validUser);
        await page.locator('[placeholder="Пароль"]').fill(user.validPassword);
        await page.locator('button:has-text("Войти")').click();
        await expect(page).toHaveURL('https://netology.ru/profile');
        await expect(
            page.locator('.components-pages-Profile-Programs--title--NCjbp')
        ).toHaveText('Мои курсы и профессии');
        await page.screenshot({ path: './screenshots/screenshotSuccess.png' });
    });
    test('Authorization with invalid data', async ({ page }) => {
        await page.locator('[placeholder="Email"]').fill(user.invalidUser);
        await page.locator('[placeholder="Пароль"]').fill(user.invalidPassword);
        await page.locator('button:has-text("Войти")').click();
        await expect(
            page.locator(
                '._-packages-ui-kit-components-v2-Input--error--1QFF1  div'
            )
        ).toHaveText('Вы ввели неправильно логин или пароль');
        await page.screenshot({ path: './screenshots/screenshotError.png' });
        await page.goto('https://netology.ru/profile');
        await expect(
            page.locator(
                '.shared-components-Errors-components-NoAccess--header--1wZNf'
            )
        ).toHaveText('Вы не авторизированы');
        await page.screenshot({
            path: './screenshots/screenshotAfterFail.png',
        });
    });
});
// npx playwright codegen https://netology.ru/?modal=sign_in
