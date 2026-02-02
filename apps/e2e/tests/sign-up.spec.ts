import { expect, test } from "@playwright/test";

test.describe("Sign Up Flow", () => {
  test("should allow a user to sign up successfully", async ({ page }) => {
    // Navigate to sign-up page
    await page.goto("/sign-up");

    // Wait for the page to load
    await expect(page.locator("h1")).toContainText("Sign Up");

    // Fill in the sign-up form
    const timestamp = Date.now();
    const testEmail = `test-${timestamp}@example.com`;

    await page.fill('input[name="name"]', "Test User");
    await page.fill('input[name="email"]', testEmail);
    await page.fill('input[name="password"]', "password123");

    // Submit the form
    await page.click('button[type="submit"]');

    // Wait for redirect to dashboard
    await page.waitForURL("/dashboard", { timeout: 10000 });

    // Verify we're on the dashboard
    expect(page.url()).toContain("/dashboard");
  });

  test("should show validation error for invalid email", async ({ page }) => {
    await page.goto("/sign-up");

    await page.fill('input[name="name"]', "Test User");
    await page.fill('input[name="email"]', "invalid-email");
    await page.fill('input[name="password"]', "password123");

    await page.click('button[type="submit"]');

    // Should show validation error
    await expect(page.locator("text=/invalid.*email/i")).toBeVisible({
      timeout: 5000,
    });
  });

  test("should show validation error for short password", async ({ page }) => {
    await page.goto("/sign-up");

    await page.fill('input[name="name"]', "Test User");
    await page.fill('input[name="email"]', "test@example.com");
    await page.fill('input[name="password"]', "short");

    await page.click('button[type="submit"]');

    // Should show validation error for password
    await expect(page.locator("text=/password.*8/i")).toBeVisible({
      timeout: 5000,
    });
  });

  test("should show error for duplicate email", async ({ page }) => {
    const timestamp = Date.now();
    const testEmail = `duplicate-${timestamp}@example.com`;

    // First sign-up
    await page.goto("/sign-up");
    await page.fill('input[name="name"]', "First User");
    await page.fill('input[name="email"]', testEmail);
    await page.fill('input[name="password"]', "password123");
    await page.click('button[type="submit"]');

    // Wait for successful signup
    await page.waitForURL("/dashboard", { timeout: 10000 });

    // Sign out by navigating to sign-up again
    await page.goto("/sign-up");

    // Try to sign up with the same email
    await page.fill('input[name="name"]', "Second User");
    await page.fill('input[name="email"]', testEmail);
    await page.fill('input[name="password"]', "password123");
    await page.click('button[type="submit"]');

    // Should show error message
    await expect(
      page.locator("text=/already.*exists|email.*taken/i"),
    ).toBeVisible({ timeout: 5000 });
  });
});
