import { test, expect } from '@playwright/test';

// test('Verify that user is able to register with valid data', async ({ page }) => {
//   await page.goto('http://localhost:5173/sign-in');
//   await page.getByRole('link', { name: 'Sign up' }).click();
//   await page.locator('[id="firstName-field"]').fill('newuser3')
//   await page.locator('[id="lastName-field"]').fill('user')
//   await page.locator('[id="username-field"]').fill('newuser31')
//   await page.locator('[id="emailAddress-field"]').fill('newuser3@example.com')
//   await page.locator('[id="password-field"]').fill('StrongPass!124')
//   await page.getByRole('button', { name: 'Continue' }).click();
    
//   // Assert on a dashboard element
//   await expect(page.getByRole('heading', { name: 'Welcome to your admin' })).toBeVisible();
// });


//Negative testing
test('Verify that user is unable to register with invalid data', async ({ page }) => {
  await page.goto('http://localhost:5173/sign-in');
  await page.getByRole('link', { name: 'Sign up' }).click();
  await page.locator('[id="username-field"]').fill('regie12')
  await page.locator('[id="emailAddress-field"]').fill('regie@') //invalid email
  await page.locator('[id="password-field"]').fill('StrongPass!124')
  await page.getByRole('button', { name: 'Continue' }).click();
    
   // Get validation message
  const validationMsg = await page.locator('[id="emailAddress-field"]').evaluate(
    (el: HTMLInputElement) => el.validationMessage
  );

  // Assert a validation message exists
  expect(validationMsg).not.toBe('');
});



//Negative testing (empty field)
test.only('Verify that user is unable to register with empty fields', async ({ page }) => {
  await page.goto('http://localhost:5173/sign-in');
  await page.getByRole('link', { name: 'Sign up' }).click();
  await page.getByRole('button', { name: 'Continue' }).click();
    
   // Get validation message
  const validationMsg = await page.locator('[id="emailAddress-field"]').evaluate(
    (el: HTMLInputElement) => el.validationMessage
  );

  // Assert a validation message exists
  expect(validationMsg).not.toBe('');
});

test('Boundary test: Min Password Length', async ({ page }) => {
  await page.goto('http://localhost:5173/sign-in');
  await page.getByRole('link', { name: 'Sign up' }).click();
  await page.locator('[id="firstName-field"]').fill('newuser4')
  await page.locator('[id="lastName-field"]').fill('user45')
  await page.locator('[id="username-field"]').fill('newuser41')
  await page.locator('[id="emailAddress-field"]').fill('newuser41@example.com')
  await page.locator('[id="password-field"]').fill('new')
  await page.getByRole('button', { name: 'Continue' }).click();

  await expect(page.locator('#error-password')).toBeVisible();

});


// spotted a security gap HERE (input not sanitized, no error message)
// to raise this Sir Reg
test('Security test: Should not allow XSS attack in registration form', async ({ page }) => {
  await page.goto('http://localhost:5173/sign-in');
  await page.getByRole('link', { name: 'Sign up' }).click();

  const payload = "<script>alert('XSS')</script>";

  // ❌ If XSS executes, this event will trigger
  page.on('dialog', () => {
    throw new Error('XSS executed! App is vulnerable 🚨');
  });

  await page.locator('#username-field').fill(payload);
  await page.locator('#emailAddress-field').fill('xss@test.com');
  await page.locator('#password-field').fill('StrongPass!123');
  await page.getByRole('button', { name: 'Continue' }).click();

  // ✅ Assert: user should not be logged in / redirected
  await expect(page.getByRole('heading', { name: 'Welcome to your admin' })).not.toBeVisible();

  // ✅ Assert: input still contains the payload (echoed raw, which is bad but not executed)
  const usernameValue = await page.locator('#username-field').inputValue();
  expect(usernameValue).toBe(payload);
});