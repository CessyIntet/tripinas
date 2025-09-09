//Tripinas UI Registration Test Suite

import { test} from '../../shared/base.ts';
import { attachScreenshot } from '../../shared/helpers.ts';


// Screenshot file names
const LOGIN_FORM_SCREENSHOT = 'login-form-screenshot.png';

test.describe("LoginPage UI Test Suites",{ tag: ["@Regression", "@Sprint-1", "@High-Priority"] },() => {

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.navigateTo();
    });

    // ---------------- Positive Test ----------------

     test('Verify that UI displays login form',{tag: "@Happy-Path"}, async ({ loginPage }, testInfo) => {
        
        await test.step('Heading "Sign in to Tripinas" should be visible', async () => {
            await loginPage.verifyHeadingIsVisible();
        });

        await test.step('Welcome message: "Welcome back! Please sign in to continue" should be visible', async () => {
            await loginPage.verifySubHeadingIsVisible();
        });

        await test.step('Email Address or Username field should be visible', async () => {
            await loginPage.verifyIdentifierFieldIsVisible();
        });


        await test.step('Password Field should be visible', async () => {
            await loginPage.verifyPasswordFieldIsVisible();
        });

        await test.step('Continue Button should be visible', async () => {
            await loginPage.verifyContinueButtonIsVisible();
        });

        await test.step('"Don’t have an account" text should be visible', async () => {
            await loginPage.verifyActionTextIsVisible();
        });

        await test.step('"Sign up" link should be visible', async () => {
            await loginPage.verifySignUpLinkIsVisible();
        });

        await test.step('Attach screenshot of successful login', async () => {
            await attachScreenshot(loginPage.page, testInfo, LOGIN_FORM_SCREENSHOT);
        });
    });


});
