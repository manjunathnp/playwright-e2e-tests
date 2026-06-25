import { test, expect } from "@playwright/test";

test.describe("Login Functionality Validations", () => {
  test.beforeEach("launch page", async ({ page }) => {
    //1. Launch URL & Assert Title, Header
    await page.goto("https://katalon-demo-cura.herokuapp.com/");
    await expect(page).toHaveTitle("CURA Healthcare Service");
    await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");
  });
  test("should login successfully", async ({ page }) => {
    //1. Click on 'Make Appointment'
    await page.getByRole("link", { name: "Make Appointment" }).click();
    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
    await expect(page.locator("#login")).toContainText(
      "Please login to make appointment.",
    );

    //2. Login
    await page.getByLabel("Username").fill("John Doe");
    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();

    //3. Assertion
    await expect(page.locator("h2")).toContainText("Make Appointment");

    //4. Logout
    await page.locator("#menu-toggle").click();
    await page.getByRole("link", { name: "Logout" }).click();

    await page.close();
  });

  test("should prevent login with incorrect credentials", async ({ page }) => {
    //1. Click on 'Make Appointment'
    await page.getByRole("link", { name: "Make Appointment" }).click();
    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
    await expect(page.locator("#login")).toContainText(
      "Please login to make appointment.",
    );

    //2. Login
    await page.getByLabel("Username").fill("John smith");
    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();

    //3. Assertion

    await expect(page.locator("#login")).toContainText(
      "Login failed! Please ensure the username and password are valid.",
    );
  });

  test.afterEach("clean-up", async ({ page }) => {
    await page.close();
  });
});
