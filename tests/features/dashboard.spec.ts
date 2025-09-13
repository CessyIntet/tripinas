//Tripinas Test Suite Activity
import { test, expect } from '../../shared/base';
import { attachScreenshot } from '../../shared/helpers.ts';
import users from '../../test-data/users.json';
import customers from "../../test-data/customers.json";

// Screenshot file names
const LOGIN_SUCCESS_SCREENSHOT = 'login-success-screenshot.png';
const LOGOUT_SUCCESS_SCREENSHOT = 'logout-success-screenshot.png';



  // ---------------- Positive Tests ----------------
 test.describe('Dashboard - Positive Tests', { tag: [ '@Regression-Testing', '@Smoke-Testing', "@Happy-Path"] }, () => {
  users.forEach((user) => {
    test.beforeEach(async ({ loginPage }) => {
      await loginPage.navigateTo();
      });



      test(`should login as ${user.username} and verify profile - POM`, async ({ loginPage, page }, testInfo) => {
        testInfo.annotations.push({
          type: 'data-test note',
          description: 'Data-test attributes aren’t present. Add stable data-test attributes (e.g. data-test="user-fullname") so tests don’t break when UI markup changes.',
          });

          await test.step('Login with valid credentials', async () => {
            await loginPage.login(process.env.TRIPINAS_USERNAME!, process.env.TRIPINAS_PASSWORD!);
          });

          await test.step('Verify dashboard URL', async () => {
            await expect(page).toHaveURL('http://localhost:5173/dashboard');
          });

          await test.step('Verify visibility of welcome heading', async () => {
            await expect(page.getByRole('heading', { name: 'Welcome to your admin dashboard!' })).toHaveText('Welcome to your admin dashboard!');
          });

          await test.step('Verify fullname', async () => {
            await expect(page.getByText(process.env.TRIPINAS_FULLNAME!)).toBeVisible();
          });

          await test.step('Verify username', async () => {
            await expect(page.getByText(process.env.TRIPINAS_USERNAME!)).toBeVisible();
          });

          await test.step('Verify email', async () => {
            await expect(page.getByText(process.env.TRIPINAS_EMAIL!)).toBeVisible();
          });
          await test.step('Attach screenshot of successful login', async () => {
            await attachScreenshot(page,testInfo,LOGIN_SUCCESS_SCREENSHOT,);
          });
      });


      test(`${user.username} can click profile Popover and view correct details`, async ({ loginPage, dashboardPage, page }, testInfo) => {
        testInfo.annotations.push({
          type: 'flaky',
          description: 'Tests failing intermittently',
          });
        
        await test.step('Login with valid credentials', async () => {
            await loginPage.login(process.env.TRIPINAS_USERNAME!, process.env.TRIPINAS_PASSWORD!);
          });

          await test.step('Verify dashboard login and user details', async () => {
            await expect(page).toHaveURL('http://localhost:5173/dashboard');
            await expect(page.getByRole('heading', { name: 'Welcome to your admin dashboard!' })).toHaveText('Welcome to your admin dashboard!');
            await expect(page.getByText(process.env.TRIPINAS_FULLNAME!)).toBeVisible();
            await expect(page.getByText(process.env.TRIPINAS_USERNAME!)).toBeVisible();
            await expect(page.getByText(process.env.TRIPINAS_EMAIL!)).toBeVisible();
          });


          await test.step('Click profile popover', async () => {
            await dashboardPage.clickProfileButton();
          });


          await test.step('Verify popover visibility', async () => {
            await expect(page.getByRole('dialog', { name: 'User button popover' })).toBeVisible();
          }); 

          await test.step('Verify user fullname in popover', async () => {
            // Verify user fullname in the popover
             const popover = page.getByRole('dialog', { name: 'User button popover' });
            await expect(popover.getByText(process.env.TRIPINAS_FULLNAME!)).toBeVisible();
          });


          await test.step('Verify username in popover', async () => {
            // Verify username in the popover
            const popover = page.getByRole('dialog', { name: 'User button popover' });
            await expect(popover.getByText(process.env.TRIPINAS_USERNAME!)).toBeVisible();
          }); 

          await test.step('Attach screenshot of profile popover', async () => {
            await attachScreenshot(page, testInfo, LOGIN_SUCCESS_SCREENSHOT);
          });
      });

      test(`${user.username} can logout and return to login page`, async ({ loginPage, dashboardPage, page }, testInfo) => {
        testInfo.annotations.push({
          type: 'flaky',
          description: 'Tests failing intermittently',
          });

        await test.step('Login with valid credentials', async () => {
          await loginPage.login(process.env.TRIPINAS_USERNAME!, process.env.TRIPINAS_PASSWORD!);
        });

        await test.step('Verify dashboard login and user details', async () => {
            await expect(page).toHaveURL('http://localhost:5173/dashboard');
            await expect(page.getByRole('heading', { name: 'Welcome to your admin dashboard!' })).toHaveText('Welcome to your admin dashboard!');
            await expect(page.getByText(process.env.TRIPINAS_FULLNAME!)).toBeVisible();
            await expect(page.getByText(process.env.TRIPINAS_USERNAME!)).toBeVisible();
            await expect(page.getByText(process.env.TRIPINAS_EMAIL!)).toBeVisible();
        });

        await test.step('Attach screenshot of successful login', async () => {
          await attachScreenshot(loginPage.page,testInfo,LOGIN_SUCCESS_SCREENSHOT,);
        });

        await test.step('Logout and verify login page', async () => {
          await dashboardPage.logout(); 
          await expect(page).toHaveURL('http://localhost:5173/sign-in');
          await expect(page.getByRole('heading', { name: 'Sign in to Tripinas' })).toHaveText('Sign in to Tripinas');
        });

        await test.step('Attach screenshot after logout', async () => {
          await attachScreenshot(page,testInfo,LOGOUT_SUCCESS_SCREENSHOT,);
        });
      });
    });
});


 // ---------------- Updating User Details----------------
 test.describe('Dashboard - User Update Tests', { tag: [ '@Regression-Testing', '@Smoke-Testing', "@Happy-Path"] }, () => {
    
  // pick customer index 3 (4th customer) from customers.json
   const customer = customers[3];
  test.beforeEach(async ({ loginPage }) => {
      await loginPage.navigateTo();
      });



      test(`${customer.username} can edit first and last name`, async ({ loginPage, dashboardPage, page }, testInfo) => {
        const profileSection = page.locator('div', { has: page.getByRole('heading', { name: 'Profile details' }) });

        testInfo.annotations.push({
          type: 'data-test note',
          description: 'Data-test attributes aren’t present. Add stable data-test attributes (e.g. data-test="user-fullname") so tests don’t break when UI markup changes.',
          });

          await test.step('Login with valid credentials', async () => {
            await loginPage.login(customer.username, customer.password);
          });


          await test.step('Verify dashboard URL', async () => {
            await expect(page).toHaveURL('http://localhost:5173/dashboard');
          });
          
          await test.step('Open user profile popover', async () => {
            await dashboardPage.clickProfileButton();
          });
          
          await test.step('Click manage account', async () => {
              await dashboardPage.clickManageAccount();
          });
          
          
          await test.step('Verify user full name, username, and label are visible in profile section', async () => {
            // Assert fullname and username inside the profile section only
              await expect(profileSection.getByText(`${customer.firstName} ${customer.lastName}`, { exact: true })).toBeVisible();
              await expect(profileSection.getByText(customer.username, { exact: true })).toBeVisible();

          });

          await test.step("Click update profile button", async () => {
            await dashboardPage.clickUpdateProfile();
          });

          await test.step('Assert visibility of first name and last name text box', async () => {
            await expect(page.getByRole('textbox', { name: 'First name' })).toBeVisible();
            await expect(page.getByRole('textbox', { name: 'Last name' })).toBeVisible();
          });

          await test.step('Input new first name and last name ', async () => {
            await page.getByRole('textbox', { name: 'First name' }).fill('Lanie');
            await page.getByRole('textbox', { name: 'Last name' }).fill('Vargas');
          });

          await test.step('Click save changes button', async () => {
            await dashboardPage.clickSaveButton();
            
            // wait for any potential loading or processing to complete
            await page.locator('selector-for-loading-spinner').waitFor({ state: 'hidden' });
          });

           await test.step('Verify if the new first and last name has been reflected', async () => {
            // Assert fullname and username inside the profile section only
              await expect(profileSection.getByText(`Lanie Vargas`, { exact: true })).toBeVisible({ timeout: 5000 });
              await expect(profileSection.getByText(customer.username, { exact: true })).toBeVisible({ timeout: 5000 });

          });

        });


  test(`${customer.username} can update username`, async ({ loginPage, dashboardPage, page }, testInfo) => {
    const profileSection = page.locator('div', { has: page.getByRole('heading', { name: 'Profile details' }) });



        testInfo.annotations.push({
          type: 'data-test note',
          description: 'Data-test attributes aren’t present. Add stable data-test attributes (e.g. data-test="user-fullname") so tests don’t break when UI markup changes.',
          });

          await test.step('Login with valid credentials', async () => {
            await loginPage.login(customer.username, customer.password);
          });


          await test.step('Verify dashboard URL', async () => {
            await expect(page).toHaveURL('http://localhost:5173/dashboard');
          });
          
          await test.step('Open user profile popover', async () => {
            await dashboardPage.clickProfileButton();
          });

          
          await test.step('Click manage account', async () => {
              await dashboardPage.clickManageAccount();
          });
          
          
          await test.step('Verify user full name, username, and label are visible in profile section', async () => {
            // Assert fullname and username inside the profile section only
              await expect(profileSection.getByText(`${customer.firstName} ${customer.lastName}`, { exact: true })).toBeVisible();
              await expect(profileSection.getByText(customer.username, { exact: true })).toBeVisible();

          });

          await test.step("Click update username button", async () => {
            await dashboardPage.clickUpdateUsername();
          });

          await test.step('Assert visibility of first name and last name text box', async () => {
            await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible();
          });

          await test.step('Input new username ', async () => {
            await page.getByRole('textbox', { name: 'Username' }).fill('amy785');
          });

          await test.step('Click save changes button', async () => {
            await dashboardPage.clickSaveButton();
            // wait for any potential loading or processing to complete
            await page.locator('selector-for-loading-spinner').waitFor({ state: 'hidden' });
          });

           await test.step('Verify if the new username has been reflected', async () => {
            // Assert fullname and username inside the profile section only
              await expect(profileSection.getByText(`amy785`, { exact: true })).toBeVisible({ timeout: 5000 });

          });

     });

});
