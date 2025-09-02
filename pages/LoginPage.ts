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

    /**
     * Initializes all locators using the provided Playwright Page object.
     */
    constructor(public readonly page: Page) {
        this.identifierInput = page.getByRole('textbox', { name: 'Email address or username' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.continueButton = page.getByRole('button', { name: 'Continue' });
        this.signInHeading = page.getByRole('heading', { name: 'Sign in to Tripinas' });
        this.welcomeHeading = page.getByRole('heading', { name: 'Welcome to your admin' });
        this.errorPassword = page.locator('#error-password');
        this.errorIdentifier = page.locator('#error-identifier');
    }

    //Method 1
    /**
     * Navigates to the login page and waits for network to be idle.
     */
    async navigateTo(): Promise<void> {
        await this.page.goto('http://localhost:5173/sign-in');
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Performs login by filling identifier and password, clicking continue.
     * @param identifier - Email or username
     * @param password - User password
     */
    async login(identifier: string, password: string): Promise<void> {
        await this.identifierInput.fill(identifier);
        await this.continueButton.click();
        await this.passwordInput.fill(password);
        await this.continueButton.click();
    }

    //Method 2

    /**
     * Verifies successful login by checking dashboard heading visibility.
     */
    async verifyLoginSuccess(): Promise<void> {
        await expect(this.welcomeHeading).toBeVisible();
    }
    
    //Method 3
    /**
     * Verifies password error message is visible and contains expected text.
     * @param expectedErrorMessage - Expected error message for password
     */
    async verifyLoginError(expectedErrorMessage: string): Promise<void> {
        await expect(this.errorPassword).toBeVisible();
        await expect(this.errorPassword).toContainText(expectedErrorMessage);
    }
     
    //Method 4
    /**
     * Verifies identifier error message is visible and contains expected text.
     * @param expectedErrorMessage - Expected error message for identifier
     */
    async verifyIdentifierError(expectedErrorMessage: string): Promise<void> {
        await expect(this.errorIdentifier).toBeVisible();
        await expect(this.errorIdentifier).toContainText(expectedErrorMessage);
    }
    
    //Method 5
    /**
     * Verifies the sign-in heading is visible.
     */
    async verifySignInHeading(): Promise<void> {
        await expect(this.signInHeading).toBeVisible();
    }

    // Modular methods for individual actions

    /**
     * Fills the identifier (email/username) input field.
     */
    async inputIdentifier(identifier: string): Promise<void> {
        await this.identifierInput.fill(identifier);
    }

    /**
     * Fills the password input field.
     */
    async inputPassword(password: string): Promise<void> {
        await this.passwordInput.fill(password);
    }

    /**
     * Clicks the continue/login button.
     */
    async clickContinue(): Promise<void> {
        await this.continueButton.click();
    }
}