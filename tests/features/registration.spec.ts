import { test, expect } from '../../shared/base';
import customers from "../../test-data/customers.json";
import { attachScreenshot } from '../../shared/helpers.ts';
import users from '../../test-data/customers.json';
// import fakeUsers from '../../shared/apiUtils.ts';

const REGISTER_SUCCESS_SCREENSHOT = 'register-success-screenshot.png';
const REGISTRATION_FAILURE_SCREENSHOT = 'register-form-failure-screenshot.png';

test.describe("Registration Test Suites",{ tag: ["@Data-Driven", "@Regression", "@Sprint-1", "@High-Priority"] },() => {
    
    test.beforeEach(async ({ registrationPage }) => {
        await registrationPage.navigateTo();
    });

    test(`Should register customer and Assert Welcome message`, {tag: "@Happy-Path"}, async ({ registrationPage }, testInfo) => {
      for (const customer of customers) {
        
          // Fill out the registration form
          await test.step(`Register and verify customer: ${customer.username}`, async () => {
            await registrationPage.fillForm(customer);
          });

          // Submit the form
          await test.step('Submit form', async () => {
            await registrationPage.submit();
          });

          // Verify the user data on the dashboard
          await test.step('Verify user data on the dashboard', async () => {
            await registrationPage.assertDashboard(`${customer.firstName} ${customer.lastName}`);
          });

          await test.step('Attach screenshot of successful login', async () => {
              await attachScreenshot(registrationPage.page,testInfo,REGISTER_SUCCESS_SCREENSHOT);
          });

          // Log out and go back to the registration page
          await test.step('Click log out', async () => {
            await registrationPage.logout();
          });
        
      
      }}); 

    // ---------------- Negative Tests ----------------
    test('Verify that user is unable to register with invalid data',{tag: "@Negative"}, async ({ registrationPage }, testInfo) => {
        // Select the 2nd customer (with invalid password)
      const customer = users[1];

        await test.step('Input first name', async () => {
            await registrationPage.inputfirstname(customer.firstName);
        });

        await test.step('Input last name', async () => {
            await registrationPage.inputlastname(customer.lastName);
        });

        await test.step('Input username', async () => {
            await registrationPage.inputusername(customer.username);
        });

        await test.step('Input email address', async () => {
            await registrationPage.inputemail(customer.email);
        });

        await test.step('Input invalid password', async () => {
            await registrationPage.inputpassword(customer.password); // Invalid password
        });

        await test.step('Click continue button', async () => {
            await registrationPage.verifyContinueButtonIsVisible();
        });

        // Get validation message
        await test.step('Check for error message', async () => {
            await registrationPage.checkerrormessage();
        });

        await test.step('Attach screenshot of failed registration', async () => {
            await attachScreenshot(registrationPage.page, testInfo, REGISTRATION_FAILURE_SCREENSHOT);
        });
    });



    //Negative testing (empty field)
    test('Verify that user is unable to register with empty fields',{tag: "@Negative"}, async ({ registrationPage }, testInfo) => {
        
        
        await test.step('Click continue button with the fields empty', async () => {
            await registrationPage.continueButton.click();
        });

        // Get validation message
        await test.step('Check for error message', async () => {
            const validationMsg = await registrationPage.usernameField.evaluate(
                (el: HTMLInputElement) => el.validationMessage
            );
            expect(validationMsg).toBe('Please fill out this field.');
        });

        await test.step('Attach screenshot of failed registration', async () => {
            await attachScreenshot(registrationPage.page, testInfo, REGISTRATION_FAILURE_SCREENSHOT);
        });

    });


    // ---------------- Boundary Test ----------------
    test('Boundary test: Min Password Length',{tag: "@Boundary"}, async ({ registrationPage }, testInfo) => {

    // Select the 3rd customer (with 3-character password)
    const customer = users[2];

        await test.step('Input first name', async () => {
            await registrationPage.inputfirstname(customer.firstName);
        });

        await test.step('Input last name', async () => {
            await registrationPage.inputlastname(customer.lastName);
        });

        await test.step('Input username', async () => {
            await registrationPage.inputusername(customer.username);
        });

        await test.step('Input email address', async () => {
            await registrationPage.inputemail(customer.email);
        });

        await test.step('Input 3-character password', async () => {
            await registrationPage.inputpassword(customer.password); // Invalid due to 3 characters only
        });

        await test.step('Click continue button', async () => {
            await registrationPage.continueButton.click();
        });

        // Get validation message
        await test.step('Check for error message', async () => {
            await registrationPage.checkerrormessage();
        });

        await test.step('Attach screenshot of failed registration', async () => {
            await attachScreenshot(registrationPage.page, testInfo, REGISTRATION_FAILURE_SCREENSHOT);
        });

        });


    // ---------------- Security Test ----------------      
    // spotted a security gap HERE

    test('Security test: Should not allow XSS attack in registration form',{tag: "@Security"}, async ({ registrationPage }, testInfo) => {
        testInfo.annotations.push({
          type: 'Security gap',
          description: 'input not sanitized, no error message',
          });

        const payload = "<script>alert('XSS')</script>";
        const xssemail = "xsstest@example.com";

            await test.step('Input XSS script on username field', async () => {
                await registrationPage.inputusername(payload);
            });

                await test.step('Input email address', async () => {
                    await registrationPage.inputemail(xssemail);
                });

                
                await test.step('Input password', async () => {
                    await registrationPage.inputpassword('StrongPass!414');
                });

                await test.step('Click continue button', async () => {
                    await registrationPage.continueButton.click();
                });

                //  Assert: user should not be logged in / redirected
                await test.step('User should still be on registration page', async () => {
                    await registrationPage.verifyFirstNameFieldIsVisible();
                });

                //  Assert: input still contains the payload (echoed raw, which is bad but not executed)
                await test.step('Input still contains the script (echoed raw, which is bad but not executed)', async () => {
                    const usernameValue = await registrationPage.usernameField.inputValue();
                    expect(usernameValue).toBe(payload);
                });

                await test.step('Attach screenshot of the registration page with the XSS script', async () => {
                    await attachScreenshot(registrationPage.page, testInfo, REGISTRATION_FAILURE_SCREENSHOT);
                }); 

    });
});