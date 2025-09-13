//Tripinas UI Registration Test Suite

import { test, expect} from '../../shared/base.ts';
import { attachScreenshot } from '../../shared/helpers.ts';


// Screenshot file names
const LOGIN_FORM_SCREENSHOT = 'login-form-screenshot.png';

test.describe("LoginPage UI Test Suites",{ tag: ["@Regression", "@Sprint-1", "@High-Priority"] },() => {

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.navigateTo();
    });

    // ---------------- Positive Test ----------------

     test('Verify that UI displays login form',{tag: "@Happy-Path"}, async ({ loginPage }, testInfo) => {
        
        
        await test.step('Attach screenshot of successful login', async () => {
            await attachScreenshot(loginPage.page, testInfo, LOGIN_FORM_SCREENSHOT);
        });
    });


    test('Visual testing for login form',{tag: "@Happy-Path"}, async ({ loginPage, page }, testInfo) => {

        await test.step('Heading "Sign in to Tripinas" should be visible', async () => {
            await expect(page.getByRole('heading', { name: 'Sign in to Tripinas' })).toHaveText('Sign in to Tripinas');
        });
        
        await test.step('Verify if the Login Page uses the same UI', async () => {
            await expect(page).toHaveScreenshot('login.png', {
                maxDiffPixels: 100,
                threshold: 0.50,
                animations: 'disabled',

            });

            
        });
    });


    
    test('test aria snapshot for login page', async ({ page }) => {
        await expect(page.locator('#root')).toMatchAriaSnapshot(`
            - heading "Sign in to Tripinas" [level=1]
            - paragraph: Welcome back! Please sign in to continue
            - text: Email address or username
            - textbox "Email address or username"
            - text: Password
            - textbox "Password"
            - button "Show password":
            - img
            - button "Continue":
            - img
            `);
    });



});

