//Tripinas UI Registration Test Suite

import { test, expect } from '../../shared/base';
import { attachScreenshot } from '../../shared/helpers.ts';

// Screenshot file names
const REGISTRATION_FORM_SCREENSHOT = 'register-form-screenshot.png';

test.describe("Registration UI Test Suites",{ tag: ["@Regression", "@Sprint-1", "@High-Priority"] },() => {
    
    test.beforeEach(async ({ registrationPage }) => {
        await registrationPage.navigateTo();
    });

    // ---------------- Positive Test ----------------

     test('Verify that UI displays registration form',{tag: "@Happy-Path"}, async ({ registrationPage,page }, testInfo) => {

        await page.goto('http://localhost:5173/sign-in');
        await page.getByRole('link', { name: 'Sign up' }).click();


        await test.step('Create your account" heading should be visible', async () => {
            await expect(page.getByRole('heading', { name: 'Create your account' })).toBeVisible();
        });


        await test.step('Create your account" heading should be visible', async () => {
            await expect(page.getByText('Welcome! Please fill in the details to get started.')).toBeVisible();
        });

        await test.step('First Name field should be visible', async () => {

            await expect(page.getByText('First name')).toBeVisible();
            await expect(page.getByRole('textbox', { name: 'First name' })).toBeVisible();

        });
        await test.step('Last Name field should be visible', async () => {
            await expect(page.getByText('Last name')).toBeVisible();
            await expect(page.getByRole('textbox', { name: 'Last name' })).toBeVisible();
        });
        await test.step('Username field should be visible', async () => {
            await expect(page.getByText('Username')).toBeVisible();
            await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible();
        });
        await test.step('Email Address field should be visible', async () => {
            await expect(page.getByText('Email address')).toBeVisible();
            await expect(page.getByRole('textbox', { name: 'Email address' })).toBeVisible();
        });
        await test.step('Password field should be visible', async () => {
            await expect(page.getByText('Password')).toBeVisible();
            await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
        });
        await test.step('Continue button should be visible', async () => {
            await expect(page.getByRole('button', { name: 'Continue' })).toBeVisible();
        });
        await test.step('Already have an account? text should be visible', async () => {
            await expect(page.getByText('Already have an account?')).toBeVisible();
        });
        await test.step('Sign in link should be visible', async () => {
            await expect(page.getByRole('link', { name: 'Sign in' })).toBeVisible();
        });

        await test.step('Attach screenshot of successful login', async () => {
            await attachScreenshot(page, testInfo, REGISTRATION_FORM_SCREENSHOT);
        });
    });
    
    test('Visual testing for registration form',{tag: "@Happy-Path"}, async ({ page }, testInfo) => {
        
        // For checking first if the page is loaded
        await test.step('Check if the registration page has been loaded', async () => {
            await expect(page).toHaveURL('http://localhost:5173/sign-up');
        });

            await test.step('Verify that first name field is visible', async () => {
                await expect(page.getByText('First name')).toBeVisible();
            });
            
            await test.step('Verify Login Page UI matches baseline screenshot', async () => {
                await expect(page).toHaveScreenshot('registrationpage.png', {
                    maxDiffPixels: 100,
                    threshold: 0.50,
                    animations: 'disabled',
    
                });
    
                
            });
        });
        
    test('test area snapshot for registration page', async ({ page }) => {
        // For checking first if the page is loaded
        await test.step('Check if the registration page has been loaded', async () => {
            await expect(page).toHaveURL('http://localhost:5173/sign-up');
        });

        await test.step('Check area snapshot', async () => {
            await expect(page.locator('#root')).toMatchAriaSnapshot(`
                - heading "Create your account" [level=1]
                - paragraph: Welcome! Please fill in the details to get started.
                - text: First name Optional
                - textbox "First name"
                - text: Last name Optional
                - textbox "Last name"
                - text: Username
                - textbox "Username"
                - text: Email address
                - textbox "Email address"
                - text: Password
                - textbox "Password"
                - button "Show password":
                - img
                - button "Continue":
                - img
                `);

            });
        }); 


});
