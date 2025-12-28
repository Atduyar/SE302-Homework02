# SE302 Homework 02 - Sweet Shop Testing

This project contains automated tests for the Sweet Shop website using Playwright with TypeScript.

## Website Under Test

https://sweetshop.netlify.app/

## Test Coverage

The test suite includes all 10 automated test cases:

- **TC01**: Verify User Login (Positive test with form interaction)
- **TC02**: Verify Adding Product to Basket (Button interaction)
- **TC04**: Verify Login Fails with Invalid Email Format (Negative test)
- **TC07(FAIL)**: Verify Cart Price Calculation (Boundary test with locator assertion)
- **TC08(FAIL)**: Verify Product Cards Display Images (Usability test - detects broken image "whan.jpg")

## Test Results

- Chromium: 3/5 passed
- Firefox: 3/5 passed
