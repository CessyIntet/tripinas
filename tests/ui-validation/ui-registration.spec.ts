//Tripinas UI Registration Test Suite

import { test } from '../../shared/base';
import { attachScreenshot } from '../../shared/helpers.ts';

// Screenshot file names
const REGISTRATION_FORM_SCREENSHOT = 'register-form-screenshot.png';

test.describe("Registration UI Test Suites",{ tag: ["@Regression", "@Sprint-1", "@High-Priority"] },() => {
    
    test.beforeEach(async ({ registrationPage }) => {
        await registrationPage.navigateTo();
    });

    // ---------------- Positive Test ----------------

     test('Verify that UI displays registration form',{tag: "@Happy-Path"}, async ({ registrationPage }, testInfo) => {

        await test.step('Verify that first name field is visible', async () => {
            await registrationPage.verifyFirstNameFieldIsVisible();
        });

        await test.step('Verify that last name field is visible', async () => {
            await registrationPage.verifyLastNameFieldIsVisible();
        });

        await test.step('Verify that username field is visible', async () => {
            await registrationPage.verifyUsernameFieldIsVisible();
        });

        await test.step('Verify that email address field is visible', async () => {
            await registrationPage.verifyEmailFieldIsVisible();
        });

        await test.step('Verify that password field is visible', async () => {
            await registrationPage.verifyPasswordFieldIsVisible();
        });

        await test.step('Verify that continue button is visible', async () => {
            await registrationPage.verifyContinueButtonIsVisible();
        });

        await test.step('Attach screenshot of successful login', async () => {
            await attachScreenshot(registrationPage.page, testInfo, REGISTRATION_FORM_SCREENSHOT);
        });
    });
         
    


});
