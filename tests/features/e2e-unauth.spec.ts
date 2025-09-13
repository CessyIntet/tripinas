// This contains tests without login


import { test, expect } from '@playwright/test';
import users from '../../test-data/users.json';

test.describe('Exploratory Testing', () => {
  users.forEach(user => {

    //negative testing
    test(` ${user.username} unable to login due to wrong password`, async ({ page }) => {
      await page.goto('http://localhost:5173/sign-in');

      await page.getByRole('textbox', { name: 'Email address or username' }).fill(user.email);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.locator('[id="password-field"]').fill('reg')
      await page.getByRole('button', { name: 'Continue' }).click();

      // re-enter password again
      await page.waitForURL('http://localhost:5173/sign-in#/factor-one');
      await page.locator('[id="password-field"]').fill('reg')

      await expect(page.locator('#error-password')).toContainText('Password is incorrect. Try again, or use another method.');
    });

    //negative testing empty field
    test(` Unable to login due to empty field`, async ({ page }) => {
      await page.goto('http://localhost:5173/sign-in');

      await page.getByRole('button', { name: 'Continue' }).click();

      // Get validation message
      const validationMsg = await page.locator('[id="identifier-field"]').evaluate(
      (el: HTMLInputElement) => el.validationMessage
      );

      // Assert a validation message exists
        expect(validationMsg).not.toBe('');
    });


    // spotted a security gap HERE (input not sanitized, no error message)
    // to raise this Sir Reg
    test('Security test: Should not allow XSS attack in login form', async ({ page }) => {
      await page.goto('http://localhost:5173/sign-in');

      const payload = "<script>alert('XSS')</script>";

      // ❌ If script executes, the dialog will appear
      page.on('dialog', () => {
        throw new Error('XSS executed! App is vulnerable 🚨');
      });
      await page.getByRole('textbox', { name: 'Email address or username' }).fill(payload);
      await page.getByRole('button', { name: 'Continue' }).click();

      // ✅ Assert: user should not be logged in
      await expect(page.getByRole('heading', { name: 'Welcome to your admin' })).not.toBeVisible();

      // ✅ Assert: input still contains the payload (not sanitized, but not executed)
      const inputValue = await page.getByRole('textbox', { name: 'Email address or username' }).inputValue();
      expect(inputValue).toBe(payload);
    });


  });
});