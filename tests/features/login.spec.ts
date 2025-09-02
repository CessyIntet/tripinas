import { test, expect } from '@playwright/test';
import users from '../../test-data/users.json';

test.describe('Login and Profile Verification', () => {
  users.forEach(user => {
    test(`should login as ${user.username} and verify profile`, async ({ page }) => {
      await page.goto('http://localhost:5173/sign-in');

      await page.getByRole('textbox', { name: 'Email address or username' }).fill(user.email);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.getByRole('textbox', { name: 'Password' }).fill(user.password);
      await page.getByRole('button', { name: 'Continue' }).click();

      // Wait for navigation to dashboard
      await page.waitForURL('http://localhost:5173/');

      await expect(page.getByTestId('user-fullname')).toContainText(user.fullName);
      await expect(page.getByTestId('user-username')).toContainText(user.username);
      await expect(page.getByTestId('user-email')).toContainText(user.email);
    });

    test(` ${user.username} can click profile Popover and view correct details`, async ({ page }) => {
      await page.goto('http://localhost:5173/sign-in');

      await page.getByRole('textbox', { name: 'Email address or username' }).fill(user.email);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.getByRole('textbox', { name: 'Password' }).fill(user.password);
      await page.getByRole('button', { name: 'Continue' }).click();

      // Wait for navigation to dashboard and click profile dropdown
      await page.waitForURL('http://localhost:5173/');

      await page.getByRole('button', { name: 'Open user button' }).click();
      await expect(page.getByLabel('User button popover')).toContainText(user.fullName);
      await expect(page.getByLabel('User button popover')).toContainText(user.username);
    });

    test(` ${user.username} can logout and return to login page`, async ({ page }) => {
      await page.goto('http://localhost:5173/sign-in');

      await page.getByRole('textbox', { name: 'Email address or username' }).fill(user.email);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.getByRole('textbox', { name: 'Password' }).fill(user.password);
      await page.getByRole('button', { name: 'Continue' }).click();

      // Wait for navigation to dashboard
      await page.waitForURL('http://localhost:5173/');

      await page.getByRole('button', { name: 'Open user button' }).click();
      await page.getByRole('menuitem', { name: 'Sign out' }).click();

      // logout successful
      await page.waitForURL('http://localhost:5173/sign-in');
      await expect(page.getByRole('heading', { name: 'Sign in to Tripinas' })).toBeVisible();
    });

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

test.describe('Login Using Email', () => {
  users.forEach(user => {
    test('Successful Login with Username Instead of Email & Profile verification', async ({ page }) => {
    await page.goto('http://localhost:5173/sign-in');
    await page.getByRole('textbox', { name: 'Email address or username' }).click();
    await page.getByRole('textbox', { name: 'Email address or username' }).fill('regietest@example.com');
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('regietest');
    await page.getByRole('button', { name: 'Continue' }).click();

  
      // Wait for navigation to dashboard
      await page.waitForURL('http://localhost:5173/');

      await expect(page.getByTestId('user-fullname')).toContainText(user.fullName);
      await expect(page.getByTestId('user-username')).toContainText(user.username);
      await expect(page.getByTestId('user-email')).toContainText(user.email);
    });
  });
});