# Testing Guide

This project uses [Vitest](https://vitest.dev/) for unit and integration testing, and [Playwright](https://playwright.dev/) for end-to-end testing.

## Running Tests

### Run All Tests

To run all tests across all packages:

```bash
pnpm test
```

### Run Tests for Specific Packages

```bash
# Logger package
pnpm --filter @superdupersoftware/logger test

# Mail service
pnpm --filter @superdupersoftware/mail test

# Messages package
pnpm --filter @superdupersoftware/messages test

# API package
pnpm --filter @superdupersoftware/api test
```

### Run E2E Tests

First, ensure you have Playwright browsers installed:

```bash
cd apps/e2e
pnpm exec playwright install
```

Then run the e2e tests:

```bash
# Run e2e tests (will start the web app automatically)
pnpm --filter e2e test

# Run e2e tests with UI mode
pnpm --filter e2e test:ui

# Run e2e tests in debug mode
pnpm --filter e2e test:debug
```

## Test Structure

### Unit Tests

Unit tests are colocated with the source code in each package:

- `packages/logger/src/index.test.ts` - Logger functionality tests
- `packages/mail/src/mailService.test.ts` - Mail service tests
- `packages/messages/src/index.test.ts` - Message queue tests
- `packages/api/src/features/auth/signUp/signUp.schema.test.ts` - Schema validation tests

### Integration Tests (API)

The API package includes infrastructure for integration testing with testcontainers:

- `packages/api/src/__tests__/db-setup.ts` - Database setup utilities using testcontainers
- `packages/api/src/__tests__/auth.test.skip.ts` - Integration tests for auth endpoints (currently skipped, requires Docker)

To run integration tests with a real database:

1. Ensure Docker is running
2. Rename `auth.test.skip.ts` to `auth.test.ts`
3. Run `pnpm --filter @superdupersoftware/api test`

### E2E Tests

End-to-end tests are located in the `apps/e2e` directory:

- `apps/e2e/tests/sign-up.spec.ts` - Sign-up flow tests

## Writing New Tests

### Adding Unit Tests

Create a test file next to your source file with the `.test.ts` or `.test.tsx` extension:

```typescript
// src/myFeature.test.ts
import { describe, it, expect } from 'vitest';
import { myFunction } from './myFeature';

describe('myFunction', () => {
  it('should work correctly', () => {
    expect(myFunction()).toBe(expected);
  });
});
```

### Adding E2E Tests

Create a new test file in `apps/e2e/tests/` with the `.spec.ts` extension:

```typescript
// apps/e2e/tests/my-feature.spec.ts
import { test, expect } from '@playwright/test';

test('my feature works', async ({ page }) => {
  await page.goto('/my-feature');
  await expect(page.locator('h1')).toContainText('Expected Text');
});
```

## Test Configuration

### Vitest Configuration

Each package has its own `vitest.config.ts` file. The base configuration includes:

```typescript
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
  },
});
```

### Playwright Configuration

Playwright configuration is in `apps/e2e/playwright.config.ts`. Key features:

- Automatically starts the web server before running tests
- Runs on Chromium by default
- Captures traces on first retry for debugging

## Environment Setup

Tests require environment variables. Copy `.env.example` to `.env` in the root directory:

```bash
cp .env.example .env
```

The `.env` file is used by tests to access required configuration like database URLs and API keys.

## CI/CD

The test task is integrated into Turborepo's pipeline. To run tests in CI:

```bash
pnpm turbo run test
```

This will run tests for all packages that have a `test` script defined.
