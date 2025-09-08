//Tripinas UI Registration Test Suite

import { test, expect } from '../../shared/base';
import { attachScreenshot } from '../../shared/helpers.ts';
import users from '../../test-data/customers.json';

// Screenshot file names
const REGISTRATION_FORM_SCREENSHOT = 'register-form-screenshot.png';
const REGISTRATION_FAILURE_SCREENSHOT = 'register-form-failure-screenshot.png';

test.describe("Registration Test Suites",{ tag: ["@Regression", "@Sprint-1", "@High-Priority"] },() => {
    
    test.beforeEach(async ({ registrationPage }) => {
        await registrationPage.navigateTo();
    });

    // ---------------- Positive Tests ----------------

     test('Verify that UI displays registration form', async ({ page }, testInfo) => {

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
         

    test.only('Verify that user is unable to register with invalid data', async ({ page }, testInfo) => {
        // Select the first customer
    const customer = users[1];

        await page.locator('[id="firstName-field"]').fill(customer.firstName);
        await page.locator('[id="lastName-field"]').fill(customer.lastName);
        await page.locator('[id="username-field"]').fill(customer.username);
        await page.locator('[id="emailAddress-field"]').fill(customer.email);
        await page.locator('[id="password-field"]').fill(customer.password); // Invalid password
        await page.getByRole('button', { name: 'Continue' }).click();

        // Get validation message
        await expect(page.locator('#error-password')).toBeVisible();

        await test.step('Attach screenshot of failed registration', async () => {
            await attachScreenshot(page, testInfo, REGISTRATION_FAILURE_SCREENSHOT);
        });
    });



    //         //Negative testing (empty field)
    //         test.only('Verify that user is unable to register with empty fields', async ({ page }) => {
    //         await page.goto('http://localhost:5173/sign-in');
    //         await page.getByRole('link', { name: 'Sign up' }).click();
    //         await page.getByRole('button', { name: 'Continue' }).click();
                
    //         // Get validation message
    //         const validationMsg = await page.locator('[id="emailAddress-field"]').evaluate(
    //             (el: HTMLInputElement) => el.validationMessage
    //         );

    //         // Assert a validation message exists
    //         expect(validationMsg).not.toBe('');
    //         });

    //         test('Boundary test: Min Password Length', async ({ page }) => {
    //         await page.goto('http://localhost:5173/sign-in');
    //         await page.getByRole('link', { name: 'Sign up' }).click();
    //         await page.locator('[id="firstName-field"]').fill('newuser4')
    //         await page.locator('[id="lastName-field"]').fill('user45')
    //         await page.locator('[id="username-field"]').fill('newuser41')
    //         await page.locator('[id="emailAddress-field"]').fill('newuser41@example.com')
    //         await page.locator('[id="password-field"]').fill('new')
    //         await page.getByRole('button', { name: 'Continue' }).click();

    //         await expect(page.locator('#error-password')).toBeVisible();

    //         });


    //         // spotted a security gap HERE (input not sanitized, no error message)
    //         // to raise this Sir Reg
    //         test('Security test: Should not allow XSS attack in registration form', async ({ page }) => {
    //         await page.goto('http://localhost:5173/sign-in');
    //         await page.getByRole('link', { name: 'Sign up' }).click();

    //         const payload = "<script>alert('XSS')</script>";

    //         // ❌ If XSS executes, this event will trigger
    //         page.on('dialog', () => {
    //             throw new Error('XSS executed! App is vulnerable 🚨');
    //         });

    //         await page.locator('#username-field').fill(payload);
    //         await page.locator('#emailAddress-field').fill('xss@test.com');
    //         await page.locator('#password-field').fill('StrongPass!123');
    //         await page.getByRole('button', { name: 'Continue' }).click();

    //         // ✅ Assert: user should not be logged in / redirected
    //         await expect(page.getByRole('heading', { name: 'Welcome to your admin' })).not.toBeVisible();

    //         // ✅ Assert: input still contains the payload (echoed raw, which is bad but not executed)
    //         const usernameValue = await page.locator('#username-field').inputValue();
    //         expect(usernameValue).toBe(payload);
    //         });

});


