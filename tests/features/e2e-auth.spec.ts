// This contains tests with login - Storage State



import { test, expect } from '@playwright/test';
import { STORAGE_STATE } from '../../playwright.config';
import users from '../../test-data/users.json';

test.use({ storageState: STORAGE_STATE });

test.describe('Tripinas EtoE Test', () => {
  users.forEach(user => {

    test(`should login as ${user.username} and verify dashboard`, async ({ page }) => {
        await page.goto('http://localhost:5173/');

      // Dashboard verification

      await expect(page.getByTestId('user-fullname')).toContainText(user.fullName);
      await expect(page.getByTestId('user-username')).toContainText(user.username);
      await expect(page.getByTestId('user-email')).toContainText(user.email);
    });

    test(` ${user.username} can click profile Popover and view correct details`, async ({ page }) => {
        await page.goto('http://localhost:5173/');

      await page.getByRole('button', { name: 'Open user button' }).click();
      await expect(page.getByLabel('User button popover')).toContainText(user.fullName);
      await expect(page.getByLabel('User button popover')).toContainText(user.username);
    });

    test(` ${user.username} can logout and return to login page`, async ({ page }) => {
        await page.goto('http://localhost:5173/');

      await page.getByRole('button', { name: 'Open user button' }).click();
      await page.getByRole('menuitem', { name: 'Sign out' }).click();

      // logout successful
      await page.waitForURL('http://localhost:5173/sign-in');
      await expect(page.getByRole('heading', { name: 'Sign in to Tripinas' })).toBeVisible();
    });
  });
});
