import { expect, test } from "@playwright/test";

test.describe("Sign In Flow", () => {
  test.beforeEach(async ({ page }) => {
    // Create a test user before each sign-in test
    const timestamp = Date.now();
    const testEmail = `signin-test-${timestamp}@example.com`;

    await page.goto("/sign-up");
    await page.fill('input[name="name"]', "Sign In Test User");
    await page.fill('input[name="email"]', testEmail);
    await page.fill('input[name="password"]', "password123");
    await page.click('button[type="submit"]');

    // Wait for dashboard and store email in context
    await page.waitForURL("/dashboard", { timeout: 10000 });
    await page
      .context()
      .addCookies([
        { name: "test-email", value: testEmail, url: "http://localhost:3000" },
      ]);

    // Sign out by clearing cookies or navigating away
    await page.context().clearCookies();
  });

  test("should allow a user to sign in successfully", async ({ page }) => {
    // Get the test email from cookies
    const cookies = await page.context().cookies();
    const testEmailCookie = cookies.find((c) => c.name === "test-email");
    const testEmail = testEmailCookie?.value || "signin-test@example.com";

    await page.goto("/sign-in");

    // Wait for the page to load
    await expect(page.locator("h1")).toContainText("Sign In");

    // Fill in the sign-in form
    await page.fill('input[name="email"]', testEmail);
    await page.fill('input[name="password"]', "password123");

    // Submit the form
    await page.click('button[type="submit"]');

    // Wait for redirect to dashboard
    await page.waitForURL("/dashboard", { timeout: 10000 });

    // Verify we're on the dashboard
    expect(page.url()).toContain("/dashboard");
  });

  test("should show error for invalid credentials", async ({ page }) => {
    await page.goto("/sign-in");

    await page.fill('input[name="email"]', "nonexistent@example.com");
    await page.fill('input[name="password"]', "wrongpassword");

    await page.click('button[type="submit"]');

    // Should show error message
    await expect(
      page.locator("text=/invalid.*credentials|incorrect/i"),
    ).toBeVisible({ timeout: 5000 });
  });

  test("should show validation error for invalid email format", async ({
    page,
  }) => {
    await page.goto("/sign-in");

    await page.fill('input[name="email"]', "invalid-email");
    await page.fill('input[name="password"]', "password123");

    await page.click('button[type="submit"]');

    // Should show validation error
    await expect(page.locator("text=/invalid.*email/i")).toBeVisible({
      timeout: 5000,
    });
  });
});
