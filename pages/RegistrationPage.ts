import { Page, expect } from '@playwright/test';

export class RegistrationPage {

  // Locators
public readonly signInUrl = 'http://localhost:5173/sign-in';
  public readonly signUpLink;
  public readonly firstNameField;
  public readonly lastNameField;
  public readonly usernameField;
  public readonly emailField;
  public readonly passwordField;
  public readonly continueButton;

  public readonly headingDashboard;
  public readonly userFullname;
  public readonly userUsername;
  public readonly userEmail;
  public readonly welcomeHeading;
  public readonly adminHeading;
  public readonly dashboardLink;
  public readonly userMenuButton;
  public readonly signOutButton;

  constructor(public readonly page: Page) {

    // form elements
    this.signUpLink = page.getByRole('link', { name: 'Sign up' });
    this.firstNameField = page.locator('input[id="firstName-field"]');
    this.lastNameField = page.locator('input[id="lastName-field"]');
    this.usernameField = page.locator('input[id="username-field"]');
    this.emailField = page.locator('input[id="emailAddress-field"]');
    this.passwordField = page.locator('input[id="password-field"]');
    this.continueButton = page.getByRole('button', { name: 'Continue' });

    // dashboard elements
    this.headingDashboard = page.getByRole('heading', { name: 'Dashboard Home' });
    this.userFullname = page.getByTestId('user-fullname');
    this.userUsername = page.getByTestId('user-username');
    this.userEmail = page.getByTestId('user-email');
    this.welcomeHeading = page.getByRole('heading', { name: 'Welcome to your admin' });
    this.adminHeading = page.getByRole('heading', { name: 'Admin', exact: true });
    this.dashboardLink = page.getByRole('link', { name: 'Dashboard' });
    this.userMenuButton = page.getByRole('button', { name: 'Open user button' });
    this.signOutButton = page.getByRole('menuitem', { name: 'Sign out' });
  }

  async navigateTo() {
    await this.page.goto(this.signInUrl); await this.signUpLink.click();
  }

  async fillForm(customer: any) {
    await this.firstNameField.fill(customer.firstName);
    await this.lastNameField.fill(customer.lastName);
    await this.usernameField.fill(customer.username);
    await this.emailField.fill(customer.email);
    await this.passwordField.fill(customer.password);
  }

  async submit() {
    await this.continueButton.click();
  }

  async assertDashboard(userFullname: string) {
    await expect(this.welcomeHeading).toBeVisible();

  }

  async logout() {
    await this.userMenuButton.click();
    await this.signOutButton.click();
  }
}
