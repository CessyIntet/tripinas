//Tripinas UI Registration Test Suite

import { test, expect } from '../../shared/base';
import { attachScreenshot } from '../../shared/helpers.ts';
import users from '../../test-data/customers.json';

// Screenshot file names
const REGISTRATION_FORM_SCREENSHOT = 'register-form-screenshot.png';
const REGISTRATION_FAILURE_SCREENSHOT = 'register-form-failure-screenshot.png';

test.describe("Registration UI Test Suites",{ tag: ["@Regression", "@Sprint-1", "@High-Priority"] },() => {
    
    test.beforeEach(async ({ registrationPage }) => {
        await registrationPage.navigateTo();
    });

    // ---------------- Positive Test ----------------

     test('Verify that UI displays registration form',{tag: "@Happy-Path"}, async ({ page }, testInfo) => {

        await test.step('First Name Field', async () => {
            await expect(page.locator('[id="firstName-field"]')).toBeVisible();
        });

        await test.step('Last Name Field', async () => {
            await expect(page.locator('[id="lastName-field"]')).toBeVisible();
        });

        await test.step('Username Field', async () => {
            await expect(page.locator('[id="username-field"]')).toBeVisible();
        });

        await test.step('Email Address Field', async () => {
            await expect(page.locator('[id="emailAddress-field"]')).toBeVisible();
        });

        await test.step('Password Field', async () => {
            await expect(page.locator('[id="password-field"]')).toBeVisible();
        });

        await test.step('Continue Button', async () => {
            await expect(page.getByRole('button', { name: 'Continue' })).toBeVisible();
        });

        await test.step('Attach screenshot of successful login', async () => {
            await attachScreenshot(page, testInfo, REGISTRATION_FORM_SCREENSHOT);
        });
    });
         
    


});
