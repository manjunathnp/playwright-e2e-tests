import { test, expect } from "@playwright/test";

test.describe("Appointment Booking Validations", () => {
  test.beforeEach("launch page", async ({ page }) => {
    //1. Launch URL & Assert Title, Header
    await page.goto("https://katalon-demo-cura.herokuapp.com/");
    await expect(page).toHaveTitle("CURA Healthcare Service");
    await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");
  });

  test("should book appointment successfully", async ({ page }) => {
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

    //4. Book Appointment & Assert
    await page.getByRole("textbox", { name: "Visit Date (Required)" }).click();
    await page.getByRole("cell", { name: "27" }).click();
    await page.getByRole("textbox", { name: "Comment" }).fill("test");
    await page.getByRole("button", { name: "Book Appointment" }).click();
    await expect(
      page.getByRole("heading", { name: "Appointment Confirmation" }),
    ).toBeVisible();
    await expect(page.locator("#summary")).toContainText(
      "Please be informed that your appointment has been booked as following:",
    );
    await page.getByRole("link", { name: "Go to Homepage" }).click();
    await expect(page.locator("h1")).toContainText("CURA Healthcare Service");
  });

  test.afterEach("clear-up", async ({ page }) => {
    await page.close();
  });
});
