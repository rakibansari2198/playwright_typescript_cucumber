# Playwright TypeScript Cucumber BDD Framework

Enterprise-grade test automation framework built with **Playwright, TypeScript, and Cucumber BDD**.

## Tech Stack

- Playwright
- TypeScript
- Cucumber BDD
- Page Object Model (POM)
- ExcelJS / XLSX
- MySQL / PostgreSQL
- Winston Logging
- Cucumber HTML Reporting

## Key Features

- UI automation with Playwright
- BDD with Cucumber
- Page Object Model
- Excel-driven test data
- Database validation
- QA / UAT environment support
- Headless & headed execution
- Parallel execution
- Cross-browser testing
- HTML test reports
- CI/CD ready

## Setup

```bash
npm install
npx playwright install
```

## Test Execution

```bash
# All tests - Headless
npm run test:Headless

# Headed execution
npm run test:headed

# Smoke tests
npm run smoke

# Regression tests
npm run regression

# QA
npm run test:qa

# UAT
npm run test:uat

# Cross-browser
npm run cross-browser

# Generate report
npm run report
```

## Supported Browsers

- Chromium
- Firefox
- WebKit

## Framework Structure

```text
features → Step Definitions → Page Objects → Application
                         ↓
                  Utilities / DB / Test Data
                         ↓
                       Reports
```

## CI/CD

The framework can be integrated with **Jenkins, Docker, and Docker Compose** for automated test execution in CI/CD pipelines.

