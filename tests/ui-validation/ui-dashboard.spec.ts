import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {

  await page.goto('http://localhost:5173/sign-in');
  await page.getByRole('textbox', { name: 'Email address or username' }).click();
  await page.getByRole('textbox', { name: 'Email address or username' }).fill('regietest21');
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('regietest');
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByRole('button', { name: 'Open user button' }).click();
  await page.getByRole('menuitem', { name: 'Sign out' }).click();
  await page.waitForURL('http://localhost:5173/sign-in');
  await expect(page).toHaveURL('http://localhost:5173/sign-in');
  
});