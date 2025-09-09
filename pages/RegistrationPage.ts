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
  public readonly errorPassword;

  constructor(public readonly page: Page) {

    // form elements
    this.signUpLink = page.getByRole('link', { name: 'Sign up' });
    this.firstNameField = page.locator('input[id="firstName-field"]');
    this.lastNameField = page.locator('input[id="lastName-field"]');
    this.usernameField = page.locator('input[id="username-field"]');
    this.emailField = page.locator('input[id="emailAddress-field"]');
    this.passwordField = page.locator('input[id="password-field"]');
    this.continueButton = page.getByRole('button', { name: 'Continue' });

    // other elements
    this.headingDashboard = page.getByRole('heading', { name: 'Dashboard Home' });
    this.userFullname = page.locator('input[id="user-fullname"]');
    this.userUsername = page.locator('input[id="user-username"]');
    this.userEmail = page.locator('input[id="user-email"]');
    this.errorPassword = page.locator('text=Your password must contain 8 or more characters.');
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

  async logout(): Promise<void> {
    await this.userMenuButton.click();
    await this.signOutButton.click();
  }

  async inputfirstname(firstname: string): Promise<void> {
    await this.firstNameField.fill(firstname);
  }

  async inputlastname(lastname: string): Promise<void> {
    await this.lastNameField.fill(lastname);
  }

  async inputusername(username: string): Promise<void> {
    await this.usernameField.fill(username);
  }
  
  async inputemail(email: string): Promise<void> {
    await this.emailField.fill(email);    

  } 
  async inputpassword(password: string): Promise<void> {
    await this.passwordField.fill(password);    
  } 
  async verifyContinueButtonIsVisible(): Promise<void> {
    await expect(this.continueButton).toBeVisible();
  }

  async checkerrormessage(): Promise<void> {
    await expect(this.errorPassword).toBeVisible();
  }

}
