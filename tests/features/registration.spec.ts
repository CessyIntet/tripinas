import { test } from '../../shared/base';
import customers from "../../test-data/customers.json";
import { attachScreenshot } from '../../shared/helpers.ts';

const REGISTER_SUCCESS_SCREENSHOT = 'register-success-screenshot.png';

test.describe("Registration Test Suites",{ tag: ["@Data-Driven", "@Regression", "@Sprint-1", "@High-Priority"] },() => {
    
    test.beforeEach(async ({ registrationPage }) => {
        await registrationPage.navigateTo();
    });

    test("Should Register multiple customers and Assert Welcome username", {tag: "@Happy-Path"}, async ({ registrationPage }, testInfo) => {
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
              await attachScreenshot(
                registrationPage.page,testInfo,REGISTER_SUCCESS_SCREENSHOT,);
              });
          
          // Log out and go back to the registration page
          await test.step('Click log out', async () => {
            await registrationPage.logout();
          });
        
      
      } 
    } 
    ); 
});
  
