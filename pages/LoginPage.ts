import { expect, Locator, Page } from '@playwright/test';

/**
 * POM for Tripinas Login Page.
 * Encapsulates selectors and actions for login-related tests.
 */
export class LoginPage {
    // Locators for login page elements
    public readonly identifierInput: Locator;    // Username/email input field
    public readonly passwordInput: Locator;      // Password input field
    public readonly continueButton: Locator;     // Continue/Login button
    public readonly signInHeading: Locator;      // "Sign in to Tripinas" heading
    public readonly welcomeHeading: Locator;     // "Welcome to your admin" heading (dashboard)
    public readonly errorPassword: Locator;      // Password error message element
    public readonly errorIdentifier: Locator;    // Identifier error message element
    public readonly userFullName: Locator;   // User full name element
    public readonly userUsername: Locator;   // User username element
    public readonly userEmail: Locator;      // User email element
    public readonly openUserButton: Locator;    // Profile popover button
    public readonly signOutMenuItem: Locator;
    public readonly signInSubHeading: Locator;
    public readonly actionText: Locator;
    public readonly signInStartActionLink: Locator;


    /**
     * Initializes all locators using the provided Playwright Page object.
     */
    constructor(public readonly page: Page) {

        // form elements
        this.identifierInput = page.locator('input[id="identifier-field"]');
        this.passwordInput = page.locator('input[id="password-field"]');

        // other elements
        this.continueButton = page.getByRole('button', { name: 'Continue' });
        this.signInHeading = page.getByRole('heading', { name: 'Sign in to Tripinas' });
        this.signInSubHeading = page.getByText('Welcome back! Please sign in to continue');
        this.welcomeHeading = page.getByRole('heading', { name: 'Welcome to your admin dashboard!' });
        this.actionText = page.getByText('Don’t have an account?');
        this.signInStartActionLink = page.getByRole('link', { name: 'Sign up' });
        this.errorPassword = page.locator('#error-password');
        this.errorIdentifier = page.locator('#error-identifier');
        this.userFullName = page.locator('[data-test="user-fullname"]');
        this.userUsername = page.locator('[data-test="user-username"]');
        this.userEmail = page.locator('[data-test="user-email"]');
        this.openUserButton = page.getByRole('button', { name: 'Open user button' });
        this.signOutMenuItem = page.getByRole('menuitem', { name: 'Sign out' });
    }

    //Method 1
    /**
     * Navigates to the login page
     */
    async navigateTo(): Promise<void> {
        await this.page.goto('http://localhost:5173/sign-in');
        await this.page.waitForLoadState('networkidle');
    }

    //Method 2
    /**
     * Performs login by filling identifier and password, clicking continue.
     * @param identifier - Email or username
     * @param password - User password
     */
    async login(identifier: string, password: string): Promise<void> {
        await this.identifierInput.fill(identifier);
        await this.passwordInput.fill(password);
        await this.continueButton.click();
    }


    /**
     * Verifies successful login by checking dashboard heading visibility.
     */
    async verifyLoginSuccess(user: { fullName: string; username: string; email: string }): Promise<void> {
        await this.page.addStyleTag({
            content: `
            *, *::before, *::after {
                transition: none !important;
                animation: none !important;
            }
        `
        });

        await expect(this.welcomeHeading).toBeVisible();
        await expect(this.welcomeHeading).toHaveText('Welcome to your admin dashboard!');
    }

     /**
     * Verifies that the login error message in password field is displayed and matches the expected text.
     * @param expectedErrorMessage - The expected error message text.
     */


    /* Modular Package Object Model */
    async InputIdentifier(identifier: string): Promise<void> {
        await this.identifierInput.fill(identifier);
    }
    async InputPassword(password: string): Promise<void> {
        await this.passwordInput.fill(password);
    }
    async ClickLoginButton(): Promise<void> {
        await this.continueButton.click();
    }

    async ClickProfilePopover() {
        await this.page.getByRole('button', { name: 'Open user button' }).click();
    }

    async logout() {
        await this.openUserButton.click();
        await this.signOutMenuItem.click();
    }

    async loginWithWrongPassword(identifier: string, wrongPassword: string): Promise<void> {
        await this.identifierInput.fill(identifier);
        await this.passwordInput.fill(wrongPassword);
        await this.continueButton.click();
    }



    

    async LoginValidUser(identifier: string, passwordInput: string): Promise<void> {
        await this.page.goto('http://localhost:5173/sign-in');
        await this.page.waitForLoadState('networkidle');
        await this.identifierInput.fill(identifier);
        await this.passwordInput.fill(passwordInput);
        await this.continueButton.click();
    }

}