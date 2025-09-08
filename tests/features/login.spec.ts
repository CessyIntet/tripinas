//Tripinas Test Suite Activity

import { test, expect } from '../../shared/base';
import { attachScreenshot } from '../../shared/helpers.ts';
import users from '../../test-data/users.json';

// Screenshot file names
const LOGIN_SUCCESS_SCREENSHOT = 'login-success-screenshot.png';
const LOGOUT_SUCCESS_SCREENSHOT = 'logout-success-screenshot.png';
const LOGIN_FAILURE_SCREENSHOT = 'login-failure-screenshot.png';
const EMPTY_FIELD_VALIDATION_SCREENSHOT = 'empty-field-validation-screenshot.png';
const XSS_LOGIN_ATTEMPT_SCREENSHOT = 'xss-login-attempt.png';


  // ---------------- Positive Tests ----------------
 test.describe('Login & Profile - Positive Tests', { tag: [ '@Regression-Testing', '@Smoke-Testing', "@Happy-Path"] }, () => {
  users.forEach((user) => {
    test.beforeEach(async ({ loginPage }) => {
      await loginPage.navigateTo();
      });

      
    
      test(`should login as ${user.username} and verify profile - POM`, async ({ loginPage }, testInfo) => {
        testInfo.annotations.push({
          type: 'flaky',
          description: 'Tests failing intermittently',
          });

        await test.step('Login with valid credentials', async () => {
          await loginPage.login(process.env.TRIPINAS_USERNAME!, process.env.TRIPINAS_PASSWORD!);
        });

        await test.step('Verify user details', async () => {
          await loginPage.verifyLoginSuccess(user);
        });

        await test.step('Attach screenshot of successful login', async () => {
          await attachScreenshot(loginPage.page,testInfo,LOGIN_SUCCESS_SCREENSHOT,);
        });
      });

      test(`${user.username} can click profile Popover and view correct details`, async ({ loginPage }, testInfo) => {
        testInfo.annotations.push({
          type: 'flaky',
          description: 'Tests failing intermittently',
          });
        
        await test.step('Login with valid credentials', async () => {
            await loginPage.login(process.env.TRIPINAS_USERNAME!, process.env.TRIPINAS_PASSWORD!);
          });

          await test.step('Verify user details on Dashboard', async () => {
            await loginPage.verifyLoginSuccess(user);
          });

          await test.step('Verify profile popover', async () => {
            await loginPage.verifyProfilePopover(user);
          });

          await test.step('Attach screenshot of profile popover', async () => {
            await attachScreenshot(loginPage.page, testInfo, LOGIN_SUCCESS_SCREENSHOT);
          });
      });

      test(`${user.username} can logout and return to login page`, async ({ loginPage }, testInfo) => {
        testInfo.annotations.push({
          type: 'flaky',
          description: 'Tests failing intermittently',
          });

        await test.step('Login with valid credentials', async () => {
          await loginPage.login(process.env.TRIPINAS_USERNAME!, process.env.TRIPINAS_PASSWORD!);
        });

        await test.step('Verify dashboard after login', async () => {
          await loginPage.verifyLoginSuccess(user);
        });

        await test.step('Attach screenshot of successful login', async () => {
          await attachScreenshot(
            loginPage.page,
            testInfo,
            LOGIN_SUCCESS_SCREENSHOT,
          );
        });

        await test.step('Logout and verify login page', async () => {
          await loginPage.logout(); // includes assertion for "Sign in to Tripinas"
        });

        await test.step('Attach screenshot after logout', async () => {
          await attachScreenshot(
            loginPage.page,
            testInfo,
            LOGOUT_SUCCESS_SCREENSHOT,
          );
        });
      });

      test(` ${user.username} should login using email`, async ({ loginPage }, testInfo) => {
        await test.step('Login using email', async () => {
          await loginPage.login(user.email, user.password);
        });

        await test.step('Verify user details', async () => {
          await loginPage.verifyLoginSuccess(user);
        });

        await test.step('Attach screenshot of successful login', async () => {
          await attachScreenshot(
            loginPage.page,
            testInfo,
            LOGIN_SUCCESS_SCREENSHOT,
          );
        });
      });

    });
  });

  // ---------------- Negative Tests ----------------
 test.describe('Login - Negative Tests', { tag: [ '@Regression', "@Sprint-1", "@Negative"] }, () => {
  users.forEach((user) => {
    test.beforeEach(async ({ loginPage }) => {
      await loginPage.navigateTo();
      });

      test(`${user.username} unable to login due to wrong password`, async ({ loginPage }, testInfo) => {

        await test.step('Navigate to login page', async () => {
          await loginPage.navigateTo();
        });

        await test.step('Attempt login with wrong password', async () => {
          await loginPage.loginWithWrongPassword(user.email, 'reg');
        });

        await test.step('Re-enter password on factor-one page', async () => {
          await loginPage.passwordInput.fill('reg');
          await loginPage.continueButton.click();
        });

        await test.step('Verify password error message', async () => {
          await loginPage.verifyPasswordError(
            'Password is incorrect. Try again, or use another method.'
          );
        });

        await test.step('Attach screenshot of failed login', async () => {
          await attachScreenshot(
            loginPage.page,
            testInfo,
            LOGIN_FAILURE_SCREENSHOT, 
          );
        });
      });

      test(`Unable to login due to empty field`, async ({ loginPage }, testInfo) => {

        await test.step('Navigate to login page', async () => {
          await loginPage.navigateTo();
        });

        await test.step('Click the login button with empty fields', async () => {
            const validationMsg = await loginPage.verifyEmptyIdentifierValidation();
            expect(validationMsg).not.toBe('');
        });

        await test.step('Attach screenshot of validation message', async () => {
          await attachScreenshot(
            loginPage.page,
            testInfo,
            EMPTY_FIELD_VALIDATION_SCREENSHOT,
          );
        });

      });
    });
  });

  

    // ---------------- Security Tests ----------------

    // spotted a security gap HERE (input not sanitized, no error message)
    // to raise this Sir Reg
test.describe('Login - Security Tests', { tag: [ '@Security', "@Sprint-1"] }, () => {
  users.forEach((user) => {
    test.beforeEach(async ({ loginPage }) => {
      await loginPage.navigateTo();
      });

      test('Security test: Should not allow XSS attack in login form', async ({ loginPage }, testInfo) => {
        testInfo.annotations.push({
          type: 'security',
          description: 'Testing for XSS vulnerability in login form (input not sanitized, no error message)',
          });
        
        const payload = "<script>alert('XSS')</script>";

        await test.step('Navigate to login page', async () => {
          await loginPage.navigateTo();
        });

        await test.step('Enter XSS payload in identifier field', async () => {
          // ❌ If script executes, the dialog will appear
          loginPage.page.on('dialog', () => {
            throw new Error('XSS executed! App is vulnerable 🚨');
          });
          await loginPage.InputIdentifier(payload);
          await loginPage.ClickLoginButton();
        });

        await test.step('Verify user is not logged in', async () => {
          await expect(loginPage.welcomeHeading).not.toBeVisible();
        });

        await test.step('Verify payload remains in input field', async () => {
          const inputValue = await loginPage.identifierInput.inputValue();
          expect(inputValue).toBe(payload);
        });

        await test.step('Attach screenshot of login attempt', async () => {
          await attachScreenshot(loginPage.page, testInfo, XSS_LOGIN_ATTEMPT_SCREENSHOT,);
        });
      });

  });
});