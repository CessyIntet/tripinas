import { expect, Locator, Page } from '@playwright/test';

/**
 * POM for Tripinas Dashboard Page.
 * Encapsulates selectors and actions for dashboard-related tests.
 */
export class DashboardPage {
    // Locators for dashboard page elements
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
        this.userFullName = page.locator('input[id="user-fullname"]');
        this.userUsername = page.locator('input[id="user-username"]');
        this.userEmail = page.locator('input[id="user-email"]');
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
        await expect(this.userFullName).toBeVisible();
        await expect(this.userFullName).toContainText(user.fullName);
        await expect(this.userUsername).toBeVisible();
        await expect(this.userUsername).toContainText(user.username);
        await expect(this.userEmail).toBeVisible();
        await expect(this.userEmail).toContainText(user.email);
    }

     /**
     * Verifies that the login error message in password field is displayed and matches the expected text.
     * @param expectedErrorMessage - The expected error message text.
     */

    async verifyLoginError(expectedErrorMessage: string): Promise<void> {
        await expect(this.errorPassword).toBeVisible();
        await expect(this.errorPassword).toHaveText(expectedErrorMessage);
    }

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

    async verifyProfilePopover(user: { fullName: string; username: string }) {
    await this.page.getByRole('button', { name: 'Open user button' }).click();
    await expect(this.page.getByLabel('User button popover')).toContainText(user.fullName);
    await expect(this.page.getByLabel('User button popover')).toContainText(user.username);
    }

    async logout() {
    await this.openUserButton.click();
    await this.signOutMenuItem.click();
    await this.page.waitForURL('http://localhost:5173/sign-in');
    await expect(this.signInHeading).toBeVisible();
    }

    async loginWithWrongPassword(identifier: string, wrongPassword: string): Promise<void> {
    await this.identifierInput.fill(identifier);
    await this.passwordInput.fill(wrongPassword);
    await this.continueButton.click();
    }

    async verifyPasswordError(expectedMessage: string): Promise<void> {
    await expect(this.errorPassword).toBeVisible();
    await expect(this.errorPassword).toContainText(expectedMessage);
    }

    async verifyEmptyIdentifierValidation(): Promise<string> {
    await this.continueButton.click();
    // returns the browser's built-in validation message
    return await this.identifierInput.evaluate((el: HTMLInputElement) => el.validationMessage);
    }

    async verifyHeadingIsVisible(): Promise<void> {
        await expect(this.signInHeading).toBeVisible();
    }

    async verifySubHeadingIsVisible(): Promise<void> {
        await expect(this.signInSubHeading).toBeVisible();
    }

    async verifyIdentifierFieldIsVisible(): Promise<void> {
        await expect(this.identifierInput).toBeVisible();
    }

    async verifyPasswordFieldIsVisible(): Promise<void> {
        await expect(this.passwordInput).toBeVisible();
    }

    async verifyContinueButtonIsVisible(): Promise<void> {
        await expect(this.continueButton).toBeVisible();
    }

    async verifyActionTextIsVisible(): Promise<void> {
        await expect(this.actionText).toBeVisible();
    }
    async verifySignUpLinkIsVisible(): Promise<void> {
        await expect(this.signInStartActionLink).toBeVisible();
        await expect(this.signInStartActionLink).toHaveAttribute('href', 'http://localhost:5173/sign-up');
    }

}