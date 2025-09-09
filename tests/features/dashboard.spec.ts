
import { test, expect } from '../../shared/base';
import { attachScreenshot } from '../../shared/helpers.ts';
import customers from "../../test-data/customers.json";
import users from '../../test-data/users.json';


const LOGIN_SUCCESS_SCREENSHOT = 'login-success-screenshot.png';
const LOGOUT_SUCCESS_SCREENSHOT = 'logout-success-screenshot.png';
const LOGIN_FAILURE_SCREENSHOT = 'login-failure-screenshot.png';
const EMPTY_FIELD_VALIDATION_SCREENSHOT = 'empty-field-validation-screenshot.png';
const XSS_LOGIN_ATTEMPT_SCREENSHOT = 'xss-login-attempt.png';
const customer = customers[1];


  // ---------------- Positive Tests ---------------- UI
 test.describe('Login & Profile - Positive Tests', { tag: [ '@Regression-Testing', '@Smoke-Testing', "@Happy-Path"] }, () => {
  users.forEach((user) => {
    test.beforeEach(async ({ loginPage }) => {
      await loginPage.navigateTo();
      await loginPage.login(customer.email, customer.password);
      });



      test(`should login as ${user.username} and verify profile - POM`, async ({ loginPage, dashboardPage }, testInfo) => {
        testInfo.annotations.push({
          type: 'flaky',
          description: 'Tests failing intermittently',
          });

        await test.step('Login with valid credentials', async () => {
          await loginPage.login(user.email, user.password);
        });
      });
    });
});