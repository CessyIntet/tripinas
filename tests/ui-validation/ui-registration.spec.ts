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
         

    test('Verify that user is unable to register with invalid data', async ({ page }, testInfo) => {
        // Select the 2nd customer (with invalid password)
    const customer = users[1];

        await test.step('Input first name', async () => {
            await page.locator('[id="firstName-field"]').fill(customer.firstName);
        });

        await test.step('Input last name', async () => {
            await page.locator('[id="lastName-field"]').fill(customer.lastName);
        });

        await test.step('Input username', async () => {
            await page.locator('[id="username-field"]').fill(customer.username);
        });

        await test.step('Input email address', async () => {
            await page.locator('[id="emailAddress-field"]').fill(customer.email);
        });

        await test.step('Input invalid password', async () => {
            await page.locator('[id="password-field"]').fill(customer.password); // Invalid password
        });

        await test.step('Click continue button', async () => {
            await page.getByRole('button', { name: 'Continue' }).click();
        });

        // Get validation message
        await test.step('Check for error message', async () => {
            await expect(page.locator('#error-password')).toBeVisible();
        });

        await test.step('Attach screenshot of failed registration', async () => {
            await attachScreenshot(page, testInfo, REGISTRATION_FAILURE_SCREENSHOT);
        });
    });



            //Negative testing (empty field)
    test.only('Verify that user is unable to register with empty fields', async ({ page }, testInfo) => {
        
        
        await test.step('Click continue button with the fields empty', async () => {
            await page.getByRole('button', { name: 'Continue' }).click();
        });

        // Get validation message
        await test.step('Check for error message', async () => {
            const validationMsg = await page.locator('[id="username-field"]').evaluate(
                (el: HTMLInputElement) => el.validationMessage
            );
            expect(validationMsg).toBe('Please fill out this field.');
        });

        await test.step('Attach screenshot of failed registration', async () => {
            await attachScreenshot(page, testInfo, REGISTRATION_FAILURE_SCREENSHOT);
        });

    });

    test('Boundary test: Min Password Length', async ({ page }, testInfo) => {
        
    // Select the 3rd customer (with 3-character password)
    const customer = users[2];

        await test.step('Input first name', async () => {
            await page.locator('[id="firstName-field"]').fill(customer.firstName);
        });

        await test.step('Input last name', async () => {
            await page.locator('[id="lastName-field"]').fill(customer.lastName);
        });

        await test.step('Input username', async () => {
            await page.locator('[id="username-field"]').fill(customer.username);
        });

        await test.step('Input email address', async () => {
            await page.locator('[id="emailAddress-field"]').fill(customer.email);
        });

        await test.step('Input 3-character password', async () => {
            await page.locator('[id="password-field"]').fill(customer.password); // Invalid due to 3 characters only
        });

        await test.step('Click continue button', async () => {
            await page.getByRole('button', { name: 'Continue' }).click();
        });

        // Get validation message
        await test.step('Check for error message', async () => {
            await expect(page.locator('#error-password')).toBeVisible();
        });

        await test.step('Attach screenshot of failed registration', async () => {
            await attachScreenshot(page, testInfo, REGISTRATION_FAILURE_SCREENSHOT);
        });

        });


    //         // spotted a security gap HERE (input not sanitized, no error message)
    //         // to raise this Sir Reg

    test.only('Security test: Should not allow XSS attack in registration form', async ({ page }, testInfo) => {
        testInfo.annotations.push({
          type: 'Security gap',
          description: 'input not sanitized, no error message',
          });

        const payload = "<script>alert('XSS')</script>";
        const xssemail = "xsstest@example.com";

        // ❌ If XSS executes, this event will trigger
        page.on('dialog', () => {throw new Error('XSS executed! App is vulnerable 🚨');
        });

            await test.step('Input XSS script on username field', async () => {
                await page.locator('[id="username-field"]').fill(payload);
            });

                await test.step('Input email address', async () => {
                    await page.locator('[id="emailAddress-field"]').fill(xssemail);
                });

                
                await test.step('Input password', async () => {
                    await page.locator('#password-field').fill('StrongPass!414');
                });

                await test.step('Click continue button', async () => {
                    await page.getByRole('button', { name: 'Continue' }).click();
                });


                // ✅ Assert: user should not be logged in / redirected
                await test.step('User should still be on registration page', async () => {
                    await expect(page.locator('[id="firstName-field"]')).toBeVisible();
                });

                // ✅ Assert: input still contains the payload (echoed raw, which is bad but not executed)
                await test.step('Input still contains the script (echoed raw, which is bad but not executed)', async () => {
                    const usernameValue = await page.locator('#username-field').inputValue();
                    expect(usernameValue).toBe(payload);
                });

                await test.step('Attach screenshot of failed registration', async () => {
                    await attachScreenshot(page, testInfo, REGISTRATION_FAILURE_SCREENSHOT);
                }); 

    });


});
