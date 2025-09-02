// import { test as setup } from '../shared/base';
// import { STORAGE_STATE } from '../playwright.config';
// // import { LoginPage } from '../pages/LoginPage';

// // Setup test to perform login and save storage state for authenticated tests
// setup('Do Login', async ({ page }) => {
//     const loginPage = new LoginPage(page);

//     // Navigate to Tripinas login page
//     await loginPage.navigateTo();

//     // Perform login using environment variables for credentials
//     await loginPage.login(process.env.TRIPINAS_USERNAME!, process.env.TRIPINAS_PASSWORD!);

//     // Verify successful login by checking dashboard heading
//     await loginPage.verifyLoginSuccess();

//     // Save authenticated storage state for reuse
//     await page.context().storageState({ path: STORAGE_STATE });
// });