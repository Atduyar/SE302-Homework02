# SE302 Homework 02 - Sweet Shop Testing

This project contains automated tests for the Sweet Shop website using Playwright with TypeScript.

## Website Under Test

https://sweetshop.netlify.app/

## Project Structure

```
se302-ass2/
├── pages/              # Page Object Models
│   ├── base.page.ts    # Base page class
│   ├── login.page.ts   # Login page POM
│   ├── home.page.ts    # Home page POM
│   ├── sweets.page.ts  # Sweets catalog page POM
│   └── basket.page.ts  # Shopping basket page POM
├── tests/
│   └── sweet-shop.spec.ts  # Playwright test suite
├── test-cases.md       # Manual test cases documentation
├── playwright.config.ts # Playwright configuration
├── package.json        # Project dependencies
└── README.md           # This file
```

## Prerequisites

- Node.js (v14 or higher)
- npm

## Installation

1. Install dependencies:
```bash
npm install
```

2. Install Playwright browsers (Chrome and Firefox):
```bash
npx playwright install chromium firefox
```

## Running Tests

Run all tests on all configured browsers (Chrome and Firefox):
```bash
npx playwright test
```

Run tests in headed mode (show browser window):
```bash
npx playwright test --headed
```

Run tests in debug mode:
```bash
npx playwright test --debug
```

Run tests on a specific browser:
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
```

## Viewing Test Results

After running tests, view the HTML report:
```bash
npx playwright show-report
```

## Test Coverage

The test suite includes all 10 automated test cases:

- **TC01**: Verify User Login (Positive test with form interaction)
- **TC02**: Verify Adding Product to Basket (Button interaction)
- **TC03**: Verify Navigation to Sweets Page (URL assertion)
- **TC04**: Verify Login Fails with Invalid Email Format (Negative test)
- **TC05**: Verify Login Fails with Incorrect Password (Negative test)
- **TC06**: Verify Login Fails with Empty Credentials (Negative test)
- **TC07**: Verify Cart Price Calculation (Boundary test with locator assertion)
- **TC08**: Verify Product Cards Display Images (Usability test - detects broken image "whan.jpg")
- **TC09**: Verify Login Page Validation Messages (Usability test)
- **TC10**: Verify Password Field is Obscured (Security test)

## Test Results

All tests passing on both Chromium and Firefox:
- Chromium: 10/10 passed ✅
- Firefox: 10/10 passed ✅
- Total: 20/20 passed ✅

## Test Types Implemented

- Positive Test Cases
- Negative Test Cases
- Boundary Test Cases
- Form Interaction
- Button/Navigation Interaction
- URL Assertions
- Locator Assertions

## Page Object Model Pattern

The project uses the Page Object Model (POM) pattern to maintain test structure:

- Each page has a corresponding class in the `pages/` directory
- Page classes encapsulate locators and common actions
- Tests use these page objects instead of direct element selectors
- Improves test maintainability and reusability
