import { expect, test as setup } from '@playwright/test';
import { STORAGE_STATE } from '../../playwright.config';
import { LoginPage } from '../../pages/LoginPage';
// import { test } from '../../shared/base';


//  await test.step('__', async () => {
        
//       });


//  Setup test to perform login and save storage state for authenticated tests.
// shorten URL

setup('Do Login', async ({ page }) => {

    const loginPage = new LoginPage(page);
            await loginPage.navigateTo();
            await loginPage.login(process.env.TRIPINAS_USERNAME!, process.env.TRIPINAS_PASSWORD!)
            await loginPage.verifyLoginSuccess({
                fullName: process.env.TRIPINAS_FULLNAME!,
                username: process.env.TRIPINAS_USERNAME!,
                email: process.env.TRIPINAS_EMAIL!,
            });


        await page.context().storageState({ path: STORAGE_STATE });


     /**FOR SESSION 13 | commented for session 14
    await page.locator('[id="identifier-field"]').fill(process.env.TRIPINAS_USERNAME!);
    await page.locator('[id="password-field"]').fill(process.env.TRIPINAS_PASSWORD!);
    await page.getByRole('button', { name: 'Continue' }).click();
    
    await expect(page).toHaveURL('http://localhost:5173/');
    await expect(page.getByText('Welcome to your admin')).toBeVisible();
    await expect(page.getByTestId('user-fullname')).toBeVisible();
    */


});

