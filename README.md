Start of Amazing Journey

# Tripinas

_A Shopee-like Rental Web Application_

Tripinas is a modern rental marketplace platform, inspired by Shopee, built with a modular frontend and backend architecture.

---

## 🚀 Quick Start Guide

### 1. **Fork and Clone the Repository**


# Fork the repo on GitHub, then clone your fork


### 2. **Initialize the Project (if starting fresh)**

If you are setting up locally for the first time, run:

```
npm init -y
npm init playwright@latest
```

> _If the project already contains `package.json` and Playwright config, you can skip these steps._

### 3. **Install Dependencies**

```
npm install
```

### 4. **Set Up Environment Variables**

#### **Frontend: Create `.env.local`**

Create a file at `frontend/.env.local` with the following content:

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_dml0YWwtZ29vc2UtMjguY2xlcmsuYWNjb3VudHMuZGV2JA

VITE_CLERK_SIGN_UP_URL=/sign-up
VITE_CLERK_SIGN_IN_URL=/sign-in

VITE_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/sign-up
VITE_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/sign-in

CLERK_SIGN_IN_URL=/sign-in
CLERK_SIGN_UP_URL=/sign-up 
CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=http://localhost:5173/sign-up
```

#### **Root: Create `.env` (for Playwright and backend tests)**

```env
TRIPINAS_USERNAME=your_username
TRIPINAS_PASSWORD=your_password
TRIPINAS_FULLNAME=Your Name
TRIPINAS_EMAIL=your@email.com
```

### 5. **Start the Application**

- **Frontend:**  
  ```sh
  npm run start:frontend
  ```

### 6. **Run Tests**

---

## 🧪 Testing

- Playwright is used for end-to-end and UI validation tests.
- Test files are located in `tests/features` and `tests/ui-validation`.
- Authenticated tests use storage state setup in `tests/features/auth.setup.ts`.

---

## 📁 Project Structure

```
tripinas/
├── backend/
├── frontend/
│   └── .env.local
├── pages/
├── tests/
│   ├── features/
│   └── ui-validation/
├── test-data/
├── shared/
├── playwright.config.ts
└── package.json
```

---

## 🧪 Test Overview & How to Run

### Test Structure

All Playwright test specs are in the `tests` directory, organized by feature and UI validation.

#### `tests/features/`
- **login.spec.ts**  
  _Covers:_  
  - Positive login scenarios (valid credentials, profile assertions)
  - Negative login scenarios (invalid credentials, empty fields, XSS attempts)  
  _How to run:_  
  ```
  npx playwright test tests/features/login.spec.ts
  or npm run login-test
  ```

- **registration.spec.ts**  
  _Covers:_  
  - Customer registration flows (data-driven, positive and negative cases)
  - Dashboard redirection and profile assertions after registration  
  _How to run:_  
  ```
  npx playwright test tests/features/registration.spec.ts
  or npm run registration-test
  ```

- **dashboard.spec.ts**  
  _Covers:_  
  - Dashboard page functionality (profile updating, menu items, widgets, security, etc.)
  - Positive and negative dashboard scenarios  
  _How to run:_  
  ```
  npx playwright test tests/features/dashboard.spec.ts
  or npm run dashboard-test
  ```

- **auth.setup.ts**  
  _Covers:_  
  - Authenticated session setup for reuse in other tests  
  - Not a standalone test, but used as a setup script  
  _How to run:_  
  - This is run automatically as part of your test suite if referenced in your config or other specs.

#### `tests/ui-validation/`

- **ui-login.spec.ts**  
  _Covers:_  
  - UI checks for the login page (field visibility, headings, links, visual regression)  
  _How to run:_  
  ```
  npx playwright test tests/ui-validation/ui-login.spec.ts
  or npm run ui-login-test
  ```

- **ui-registration.spec.ts**  
  _Covers:_  
  - UI checks for the registration page (field visibility, validation messages, visual regression)
  - Negative UI validation (empty fields, invalid data)  
  _How to run:_  
  ```
  npx playwright test tests/ui-validation/ui-registration.spec.ts
  or npm run ui-registration
  ```

- **ui-dashboard.spec.ts**  
  _Covers:_  
  - UI checks for the dashboard page (widgets, layout, navigation, visual regression)
  - Dashboard-specific UI validation  
  _How to run:_  
  ```
  npx playwright test tests/ui-validation/ui-dashboard.spec.ts
  or npm run ui-dashboard
  ```

---

### Test Results & Reports

- After running, Playwright outputs results in the terminal.
- For a detailed HTML report:
  ```sh
  npx playwright show-report
  ```

---

### Summary Table

| Spec File                                      | Description                                         | How to Run                                               |
|------------------------------------------------|-----------------------------------------------------|----------------------------------------------------------|
| `tests/features/login.spec.ts`                 | Login flows, positive/negative, profile checks      | `npx playwright test tests/features/login.spec.ts`        |
| `tests/features/registration.spec.ts`          | Registration flows, positive/negative               | `npx playwright test tests/features/registration.spec.ts` |
| `tests/features/dashboard.spec.ts`             | Dashboard functionality, profile edting, security   | `npx playwright test tests/features/dashboard.spec.ts`    |
| `tests/features/auth.setup.ts`                 | Auth session setup (not a standalone test)          | Used as setup                                            |
| `tests/ui-validation/ui-login.spec.ts`         | Login page UI and visual checks                     | `npx playwright test tests/ui-validation/ui-login.spec.ts`|
| `tests/ui-validation/ui-registration.spec.ts`  | Registration page UI, validation, visual checks     | `npx playwright test tests/ui-validation/ui-registration.spec.ts` |
| `tests/ui-validation/ui-dashboard.spec.ts`     | Dashboard page UI, widgets, visual checks           | `npx playwright test tests/ui-validation/ui-dashboard.spec.ts`    |

---

## 🤝 Contributing

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to your fork: `git push origin feature/your-feature`
5. Open a Pull Request.

---

## 🛠️ Troubleshooting

- If you encounter issues with environment variables, ensure your `.env` and `.env.local` files are correctly set up.
- For Playwright test failures, check selectors and update them as needed to match the current UI.

---