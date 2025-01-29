// const { test, expect } = require("@playwright/test");

// test("Response failed in incorrect submission.", async ({ page }) => {
//     await page.goto("http://localhost:7800/");

//     await expect(page.locator("#assignment-title")).toHaveText("Hello");

//     await page.getByRole('textbox').fill("abcd");
//     await page.getByRole('button', { name: 'Submit Code' }).click();
//     await page.getByRole('button', { name: 'Close' }).click();
//     await expect(page.locator("li").filter({ hasText: 'Pending'})).toHaveCount(0, { timeout: 10000 });
//     await expect(page.locator("li").first()).toContainText("Failed");
// });

// test("Response correct in correct submission.", async ({ page }) => {
//     await page.goto("http://localhost:7800/");

//     await expect(page.locator("#assignment-title")).toHaveText("Hello");

//     await page.getByRole('textbox').fill("def hello(): \n   return 'Hello'");
//     await page.getByRole('button', { name: 'Submit Code' }).click();
//     await page.getByRole('button', { name: 'Close' }).click();
//     await expect(page.locator("li").filter({ hasText: 'Pending'})).toHaveCount(0, { timeout: 10000 });
//     await expect(page.locator("li").first()).toContainText("Correct");
// });

// test("Response correct in correct submission and be able to move to next assignment.", async ({ page }) => {
//     await page.goto("http://localhost:7800/");

//     await expect(page.locator("#assignment-title")).toHaveText("Hello");
//     await expect(page.getByRole('button', { name: 'Problem Hello world'})).toBeDisabled();

//     await page.getByRole('textbox').fill("def hello(): \n   return 'Hello'");
//     await page.getByRole('button', { name: 'Submit Code' }).click();
//     await page.getByRole('button', { name: 'Close' }).click();
//     await expect(page.locator("li").filter({ hasText: 'Pending'})).toHaveCount(0, { timeout: 10000 });
//     await expect(page.locator("li").first()).toContainText("Correct");

//     await page.getByRole('button', { name: 'Problem Hello world'}).click();
//     await expect(page.locator("#assignment-title")).toHaveText("Hello world");
// });


// test("Point changes when user finishes assignment.", async ({ page }) => {
//     await page.goto("http://localhost:7800/");

//     await expect(page.locator("#assignment-title")).toHaveText("Hello");
//     await expect(page.locator("#point")).toHaveText("Your Points: 0");


//     await page.getByRole('textbox').fill("def hello(): \n   return 'Hello'");
//     await page.getByRole('button', { name: 'Submit Code' }).click();
//     await page.getByRole('button', { name: 'Close' }).click();
//     await expect(page.locator("li").filter({ hasText: 'Pending'})).toHaveCount(0, { timeout: 10000 });
//     await expect(page.locator("li").first()).toContainText("Correct");

//     await expect(page.locator("#point")).toHaveText("Your Points: 100");
// });