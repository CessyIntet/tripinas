//Tripinas UI Registration Test Suite

import { log } from 'console';
import { test, expect } from '../../shared/base.ts';
import { attachScreenshot } from '../../shared/helpers.ts';
import users from '../../test-data/customers.json';

// Screenshot file names
const LOGIN_FORM_SCREENSHOT = 'login-form-screenshot.png';
const LOGIN_FAILURE_SCREENSHOT = 'login-form-failure-screenshot.png';

test.describe("LoginPage UI Test Suites",{ tag: ["@Regression", "@Sprint-1", "@High-Priority"] },() => {

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.navigateTo();
    });

    // ---------------- Positive Test ----------------

     test('Verify that UI displays login form',{tag: "@Happy-Path"}, async ({ page, loginPage }, testInfo) => {
        
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
            await attachScreenshot(page, testInfo, LOGIN_FORM_SCREENSHOT);
        });
    });
         
    // // ---------------- Negative Tests ----------------
    // test('Verify that user is unable to register with invalid data',{tag: "@Negative"}, async ({ page }, testInfo) => {
    //     // Select the 2nd customer (with invalid password)
    // const customer = users[1];

    //     await test.step('Input first name', async () => {
    //         await page.locator('[id="firstName-field"]').fill(customer.firstName);
    //     });

    //     await test.step('Input last name', async () => {
    //         await page.locator('[id="lastName-field"]').fill(customer.lastName);
    //     });

    //     await test.step('Input username', async () => {
    //         await page.locator('[id="username-field"]').fill(customer.username);
    //     });

    //     await test.step('Input email address', async () => {
    //         await page.locator('[id="emailAddress-field"]').fill(customer.email);
    //     });

    //     await test.step('Input invalid password', async () => {
    //         await page.locator('[id="password-field"]').fill(customer.password); // Invalid password
    //     });

    //     await test.step('Click continue button', async () => {
    //         await page.getByRole('button', { name: 'Continue' }).click();
    //     });

    //     // Get validation message
    //     await test.step('Check for error message', async () => {
    //         await expect(page.locator('#error-password')).toBeVisible();
    //     });

    //     await test.step('Attach screenshot of failed registration', async () => {
    //         await attachScreenshot(page, testInfo, REGISTRATION_FAILURE_SCREENSHOT);
    //     });
    // });



    // //Negative testing (empty field)
    // test('Verify that user is unable to register with empty fields',{tag: "@Negative"}, async ({ page }, testInfo) => {
        
        
    //     await test.step('Click continue button with the fields empty', async () => {
    //         await page.getByRole('button', { name: 'Continue' }).click();
    //     });

    //     // Get validation message
    //     await test.step('Check for error message', async () => {
    //         const validationMsg = await page.locator('[id="username-field"]').evaluate(
    //             (el: HTMLInputElement) => el.validationMessage
    //         );
    //         expect(validationMsg).toBe('Please fill out this field.');
    //     });

    //     await test.step('Attach screenshot of failed registration', async () => {
    //         await attachScreenshot(page, testInfo, REGISTRATION_FAILURE_SCREENSHOT);
    //     });

    // });


    // // ---------------- Boundary Test ----------------
    // test('Boundary test: Min Password Length',{tag: "@Boundary"}, async ({ page }, testInfo) => {

    // // Select the 3rd customer (with 3-character password)
    // const customer = users[2];

    //     await test.step('Input first name', async () => {
    //         await page.locator('[id="firstName-field"]').fill(customer.firstName);
    //     });

    //     await test.step('Input last name', async () => {
    //         await page.locator('[id="lastName-field"]').fill(customer.lastName);
    //     });

    //     await test.step('Input username', async () => {
    //         await page.locator('[id="username-field"]').fill(customer.username);
    //     });

    //     await test.step('Input email address', async () => {
    //         await page.locator('[id="emailAddress-field"]').fill(customer.email);
    //     });

    //     await test.step('Input 3-character password', async () => {
    //         await page.locator('[id="password-field"]').fill(customer.password); // Invalid due to 3 characters only
    //     });

    //     await test.step('Click continue button', async () => {
    //         await page.getByRole('button', { name: 'Continue' }).click();
    //     });

    //     // Get validation message
    //     await test.step('Check for error message', async () => {
    //         await expect(page.locator('#error-password')).toBeVisible();
    //     });

    //     await test.step('Attach screenshot of failed registration', async () => {
    //         await attachScreenshot(page, testInfo, REGISTRATION_FAILURE_SCREENSHOT);
    //     });

    //     });


    // // ---------------- Security Test ----------------      
    // // spotted a security gap HERE

    // test.only('Security test: Should not allow XSS attack in registration form',{tag: "@Security"}, async ({ page }, testInfo) => {
    //     testInfo.annotations.push({
    //       type: 'Security gap',
    //       description: 'input not sanitized, no error message',
    //       });

    //     const payload = "<script>alert('XSS')</script>";
    //     const xssemail = "xsstest@example.com";

    //     // ❌ If XSS executes, this event will trigger
    //     page.on('dialog', () => {throw new Error('XSS executed! App is vulnerable 🚨');
    //     });

    //         await test.step('Input XSS script on username field', async () => {
    //             await page.locator('[id="username-field"]').fill(payload);
    //         });

    //             await test.step('Input email address', async () => {
    //                 await page.locator('[id="emailAddress-field"]').fill(xssemail);
    //             });

                
    //             await test.step('Input password', async () => {
    //                 await page.locator('#password-field').fill('StrongPass!414');
    //             });

    //             await test.step('Click continue button', async () => {
    //                 await page.getByRole('button', { name: 'Continue' }).click();
    //             });


    //             // ✅ Assert: user should not be logged in / redirected
    //             await test.step('User should still be on registration page', async () => {
    //                 await expect(page.locator('[id="firstName-field"]')).toBeVisible();
    //             });

    //             // ✅ Assert: input still contains the payload (echoed raw, which is bad but not executed)
    //             await test.step('Input still contains the script (echoed raw, which is bad but not executed)', async () => {
    //                 const usernameValue = await page.locator('#username-field').inputValue();
    //                 expect(usernameValue).toBe(payload);
    //             });

    //             await test.step('Attach screenshot of the registration page with the XSS script', async () => {
    //                 await attachScreenshot(page, testInfo, REGISTRATION_FAILURE_SCREENSHOT);
    //             }); 

    // });


});
