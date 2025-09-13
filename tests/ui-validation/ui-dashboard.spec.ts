 // ---------------- Tripinas UI Dashboard Tests ----------------

import { test, expect } from '../../shared/base';
import { attachScreenshot } from '../../shared/helpers.ts';
// import users from '../../test-data/users.json';

// Screenshot file names
const DASHBOARDLOGIN_SUCCESS_SCREENSHOT = 'login-success-screenshot.png';
const MENUITEMS_SCREENSHOT = 'menu-items-screenshot.png';



 test.describe('Tripinas UI Dashboard - Positive Flow', { tag: [ '@Regression-Testing', '@Smoke-Testing', "@Happy-Path"] }, () => {
  // users.forEach((user) => {
    test.beforeEach(async ({ loginPage }) => {
      await loginPage.navigateTo();
      });



        test('Dashboard displays user profile, security, and email sections correctly', async ({ loginPage, dashboardPage, page }, testInfo) => {
          const profileSection = page.locator('div', { has: page.getByRole('heading', { name: 'Profile details' }) });

          await test.step('Login as tripinas user', async () => {
            await loginPage.login(process.env.TRIPINAS_USERNAME!, process.env.TRIPINAS_PASSWORD!);
          });

          await test.step('Verify dashboard URL', async () => {
            await expect(page).toHaveURL('http://localhost:5173/dashboard');
          });

          await test.step('Open user profile popover', async () => {
            await dashboardPage.clickProfileButton();
          });

          await test.step('Verify "Manage account" menu item is visible', async () => {
            await expect(page.getByRole('menuitem', { name: 'Manage account' })).toBeVisible();
          });

          await test.step('Verify visibility of "Sign out" popover action button', async () => {
            await expect(page.getByRole('menuitem', { name: 'Sign out' })).toBeVisible();
          });

          await test.step('Attach screenshot of menu items', async () => {
            await attachScreenshot(dashboardPage.page,testInfo,MENUITEMS_SCREENSHOT);
          });

          await test.step('Click manage account', async () => {
            await dashboardPage.clickManageAccount();
          });

          await test.step('Verify Navbar: "Profile" button is visible', async () => {
            await expect(page.getByRole('button', { name: 'Profile', exact: true })).toHaveText('Profile');
          });

          await test.step('Verify visibility of "Account" section headings and descriptions', async () => {
            await expect(page.getByRole('heading', { name: 'Account' })).toBeVisible();
            await expect(page.getByText('Manage your account info.')).toBeVisible();
            await expect(page.getByRole('heading', { name: 'Profile details' })).toBeVisible();
            await expect(page.getByRole('paragraph').filter({ hasText: 'Profile' })).toBeVisible();

          });

          await test.step('Verify user full name, username, and label are visible in profile section', async () => {
            // Assert fullname and username inside the profile section only
            await expect(profileSection.getByText(process.env.TRIPINAS_FULLNAME!, { exact: true })).toBeVisible();
            await expect(profileSection.getByText(process.env.TRIPINAS_USERNAME!, { exact: true })).toBeVisible();

            // Scope 'Username' label to profile section as well
            await expect(profileSection.getByText('Username', { exact: true })).toBeVisible();

          });

          await test.step('Verify update profile and update username button is visible', async () => {
            await expect(page.getByRole('button', { name: 'Update profile' })).toBeVisible();
            await expect(page.getByRole('button', { name: 'Update username' })).toBeVisible();
          });

          await test.step('Verify email addresses and "Add email address" button are visible', async () => {
            await expect(page.getByText('Email addresses')).toBeVisible();
            await expect(profileSection.getByText(process.env.TRIPINAS_EMAIL!)).toBeVisible();
            await expect(page.getByRole('button', { name: 'Add email address' })).toBeVisible();

          });

          await test.step('Verify Navbar: "Security" button is visible', async () => {
            await expect(page.getByRole('button', { name: 'Security' })).toBeVisible();
          });

          await test.step('Verify security section headings and password label is visible', async () => {
            await expect(page.getByRole('button', { name: 'Open menu' })).toBeVisible();
            await page.getByRole('button', { name: 'Security' }).click();
            await expect(page.getByRole('heading', { name: 'Security' })).toBeVisible();
            await expect(page.getByText('Password', { exact: true })).toBeVisible();
          });

          await test.step('Verify password is masked', async () => {
            await expect(page.getByText('••••••••••')).toBeVisible();
          });

          await test.step('Verify update password button is visible', async () => {
            await expect(page.getByRole('button', { name: 'Update password' })).toBeVisible();
          });


          await test.step('Verify active sessions section is visible', async () => {
            await expect(page.getByText('Active devices')).toBeVisible();
            await expect(page.locator('div').filter({ hasText: /Windows/ }).nth(1)).toBeVisible();
          });

           await test.step('Attach screenshot of successful login', async () => {
            await attachScreenshot(page, testInfo, DASHBOARDLOGIN_SUCCESS_SCREENSHOT);
          });


        });

  });

          

