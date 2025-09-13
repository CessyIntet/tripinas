//Tripinas Test Suite Activity

import { test, expect } from '../../shared/base';
import { attachScreenshot } from '../../shared/helpers.ts';
import users from '../../test-data/users.json';

// Screenshot file names
const LOGIN_SUCCESS_SCREENSHOT = 'login-success-screenshot.png';
const LOGIN_FAILURE_SCREENSHOT = 'login-failure-screenshot.png';
const EMPTY_FIELD_VALIDATION_SCREENSHOT = 'empty-field-validation-screenshot.png';
const XSS_LOGIN_ATTEMPT_SCREENSHOT = 'xss-login-attempt.png';


  // ---------------- Positive Tests ----------------
 test.describe('Login & Profile - Positive Tests', { tag: [ '@Regression-Testing', '@Smoke-Testing', "@Happy-Path"] }, () => {
  users.forEach((user) => {
    test.beforeEach(async ({ loginPage }) => {
      await loginPage.navigateTo();
      });

      
    
      test.only(`should login as ${user.username} and verify profile - POM`, async ({ loginPage, page }, testInfo) => {
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
            await expect(page.getByRole('heading', { name: 'Welcome to your admin dashboard!' })).toContainText('Welcome to your admin dashboard!');
          });
     
          await test.step('Verify fullname', async () => {
            await expect(page.getByTestId('user-fullname')).toContainText(process.env.TRIPINAS_FULLNAME!);
          });
     
          await test.step('Verify username', async () => {
            await expect(page.getByTestId('user-username')).toContainText(process.env.TRIPINAS_USERNAME!);
          });
     
          await test.step('Verify email', async () => {
            await expect(page.getByTestId('user-email')).toContainText(process.env.TRIPINAS_EMAIL!);
          });
          await test.step('Attach screenshot of successful login', async () => {
            await attachScreenshot(page,testInfo,LOGIN_SUCCESS_SCREENSHOT,);
          });
        });


      test(` ${user.username} should login using email`, async ({ loginPage, page }, testInfo) => {
        await test.step('Login using email', async () => {
          await loginPage.login(process.env.TRIPINAS_USERNAME!, process.env.TRIPINAS_PASSWORD!);
        });

         await test.step('Verify visibility of welcome heading', async () => {
            await expect(page.getByRole('heading', { name: 'Welcome to your admin dashboard!' })).toHaveText('Welcome to your admin dashboard!');
          });
     
          await test.step('Verify fullname', async () => {
            await expect(page.getByTestId('user-fullname')).toContainText(process.env.TRIPINAS_FULLNAME!);
          });
     
          await test.step('Verify username', async () => {
            await expect(page.getByTestId('user-username')).toContainText(process.env.TRIPINAS_USERNAME!);
          });
     
          await test.step('Verify email', async () => {
            await expect(page.getByTestId('user-email')).toContainText(process.env.TRIPINAS_EMAIL!);
          });


          await test.step('Attach screenshot of successful login', async () => {
            await attachScreenshot(loginPage.page,testInfo,LOGIN_SUCCESS_SCREENSHOT,);
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

      test(`${user.username} unable to login due to wrong password`, async ({ loginPage, page }, testInfo) => {

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
      

          await expect(page.locator('[id="error-password"]')).toBeVisible()
        });

        await test.step('Attach screenshot of failed login', async () => {
          await attachScreenshot(loginPage.page,testInfo,LOGIN_FAILURE_SCREENSHOT, 
          );
        });
      });

      test(`Unable to login due to empty field`, async ({ loginPage }, testInfo) => {

        await test.step('Navigate to login page', async () => {
          await loginPage.navigateTo();
        });

        await test.step('Click the login button with empty fields', async () => {
          await loginPage.ClickLoginButton();
        });

        await test.step('Check for error message', async () => {
            const validationMsg = await loginPage.identifierInput.evaluate(
                (el: HTMLInputElement) => el.validationMessage
            );
            expect(validationMsg).toBe('Please fill out this field.');
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

        await test.step('Verify user is not logged in by checking if Welcome heading is not showing', async () => {
          
          // Assert that the welcome heading is not visible, confirming no user session is active
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

