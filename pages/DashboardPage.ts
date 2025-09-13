import { expect, Locator, Page } from '@playwright/test';

/**
 * POM for Tripinas Dashboard Page.
 * Encapsulates selectors and actions for login-related tests.
 */
export class DashboardPage {


  private readonly profileButton: Locator;
  public readonly signOutMenuItem: Locator;
  public readonly manageAccountMenuItem: Locator;
  public readonly updateProfileButton: Locator;
  public readonly Savebutton: Locator;
  public readonly SecurityButton: Locator;
  public readonly Updateusername: Locator;




  constructor(public readonly page: Page) {

  this.profileButton = page.getByRole('button', { name: 'Open user button' });
  this.signOutMenuItem = page.getByRole('menuitem', { name: 'Sign out' });
  this.manageAccountMenuItem = page.getByRole('menuitem', { name: 'Manage account' });
  this.updateProfileButton = page.getByRole('button', { name: 'Update profile' });
  this.Savebutton = page.getByRole('button', { name: 'Save' });
  this.SecurityButton = page.getByRole('button', { name: 'Security' });
  this.Updateusername = page.getByRole('button', { name: 'Update username' });

  }


  async logintoDashboard(): Promise<void> {
    await this.page.goto('http://localhost:5173/dashboard');
    await this.page.waitForLoadState('networkidle');

  }
  async clickProfileButton() {
    await this.profileButton.click();
  }


  async logout() {
        await this.profileButton.click();
        await this.signOutMenuItem.click();
      
  }

  async clickManageAccount() {
    await this.manageAccountMenuItem.click();
  }

  async clickUpdateProfile() {
    await this.updateProfileButton.click(); 
  }

  async clickSaveButton() {
    await this.Savebutton.click();
  }

  async clickSecurityButton() {
    await this.SecurityButton.click();
  }

  async clickUpdateUsername() {
    await this.Updateusername.click();
  }

  async verifyDashboardDetails(fullName: string, username: string, email: string): Promise<void> {
    await expect(this.page.getByTestId('user-fullname')).toContainText(fullName);
    await expect(this.page.getByTestId('user-username')).toContainText(username);
    await expect(this.page.getByTestId('user-email')).toContainText(email);
  }

}





