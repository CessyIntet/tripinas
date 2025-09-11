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

      
    
      test.only(`should login as ${user.username} and verify profile - POM`, async ({ loginPage, page }, testInfo) => {
        testInfo.annotations.push({
          type: 'flaky',
          description: 'Tests failing intermittently',
          });

          await test.step('Login with valid credentials', async () => {
            await loginPage.login(process.env.TRIPINAS_USERNAME!, process.env.TRIPINAS_PASSWORD!);
          });
          await test.step('Validate heading', async () => {

        

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

      // move to dashboard.spec.ts later

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


    });
  });