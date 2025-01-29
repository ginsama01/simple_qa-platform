const { test, expect } = require("@playwright/test");

test("Response success when create question", async ({ page }) => {
    await page.goto("http://localhost:7800");

    await page.locator("a").filter({ hasText: "View Course" }).first().click();

    await page.getByRole('textbox').fill("How are you today");
    await page.getByRole('button', { name: 'Add question' }).click();
    await expect(page.locator("h2")).toHaveText("Create question successfully!");
    await page.getByRole('button', { name: 'Close' }).click();
    await expect(page.locator("li").first()).toContainText("How are you today");
});

test("Response failed when create two questions in one minute", async ({ page }) => {
    await page.goto("http://localhost:7800");

    await page.locator("a").filter({ hasText: "View Course" }).first().click();

    await page.getByRole('textbox').fill("How are you today");
    await page.getByRole('button', { name: 'Add question' }).click();
    await expect(page.locator("h2")).toHaveText("Create question successfully!");
    await page.getByRole('button', { name: 'Close' }).click();

    await page.getByRole('textbox').fill("What's your name");
    await page.getByRole('button', { name: 'Add question' }).click();
    await expect(page.locator("h2")).toHaveText("Please wait a while before posting new question!");
});

test("Response failed when upvote two questions in one course", async ({ page }) => {
    await page.goto("http://localhost:7800");

    await page.locator("a").filter({ hasText: "View Course" }).first().click();

    await page.getByRole('button', { name: '▲' }).nth(1).click();
    await expect(page.locator("h2")).toHaveText("Upvote successfully");
    await page.getByRole('button', { name: 'Close' }).click();

    await page.getByRole('button', { name: '▲' }).nth(2).click();
    await expect(page.locator("h2")).toHaveText("You only can upvote only one question in this course");
});

test("Create three answers using llm-api when creating question", async ({ page }) => {
    await page.goto("http://localhost:7800");

    await page.locator("a").filter({ hasText: "View Course" }).first().click();

    await page.getByRole('textbox').fill("How old are you");
    await page.getByRole('button', { name: 'Add question' }).click();
    await expect(page.locator("h2")).toHaveText("Create question successfully!");
    await page.getByRole('button', { name: 'Close' }).click();

    await expect(page.locator("li").first()).toContainText("How old are you");

    await page.locator("li").first().click();
    await expect(page.locator("p").nth(1)).toContainText("Question:");
    await expect(page.locator("li")).toHaveCount(3, { timeout: 10000 });
});

test("Response failed when create question and answer in one minute", async ({ page }) => {
    await page.goto("http://localhost:7800");

    await page.locator("a").filter({ hasText: "View Course" }).first().click();

    await page.getByRole('textbox').fill("How old are you");
    await page.getByRole('button', { name: 'Add question' }).click();
    await expect(page.locator("h2")).toHaveText("Create question successfully!");
    await page.getByRole('button', { name: 'Close' }).click();

    await expect(page.locator("li").first()).toContainText("How old are you");

    await page.locator("li").first().click();
    await expect(page.locator("p").nth(1)).toContainText("Question:");
    
    await page.getByRole('textbox').fill("I am 21 years old");
    await page.getByRole('button', { name: 'Add answer' }).click();
    await expect(page.locator("h2")).toHaveText("Please wait a while before posting new answer!");
});

test("Response failed when upvote two answers in one question", async ({ page }) => {
    await page.goto("http://localhost:7800");

    await page.locator("a").filter({ hasText: "View Course" }).first().click();

    await page.locator("li").first().click();

    await page.getByRole('button', { name: '▲' }).nth(1).click();
    await expect(page.locator("h2")).toHaveText("Upvote successfully");
    await page.getByRole('button', { name: 'Close' }).click();

    await page.getByRole('button', { name: '▲' }).nth(2).click();
    await expect(page.locator("h2")).toHaveText("You only can upvote only one answer in this question");
});