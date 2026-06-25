import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  //1. Launch URL
  await page.goto("https://katalon-demo-cura.herokuapp.com/");

  //2. Click on 'Make Appointment'
  await page.getByRole("link", { name: "Make Appointment" }).click();
  await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
  await expect(page.locator("#login")).toContainText(
    "Please login to make appointment.",
  );

  //3. Login
  await page.getByLabel("Username").click();
  await page.getByLabel("Username").press("CapsLock");
  await page.getByLabel("Username").fill("John ");
  await page.getByLabel("Username").press("CapsLock");
  await page.getByLabel("Username").fill("John Doe");
  await page.getByLabel("Password").fill("ThisIsNotAPassword");
  await page.getByRole("button", { name: "Login" }).click();

  //4. Assertion
  await expect(page.locator('h2')).toContainText('Make Appointment');

  //5. Logout
  await page.locator('#menu-toggle').click();
  await page.getByRole('link', { name: 'Logout' }).click();

  await page.close();
  
});
