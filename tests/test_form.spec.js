const { test, expect } = require("@playwright/test");
const path = require("path");

const FILE_URL = "file://" + path.resolve(__dirname, "../index.html");

// Тест 1: заголовок страницы корректный
test("страница имеет правильный заголовок", async ({ page }) => {
  await page.goto(FILE_URL);
  const title = await page.title();
  expect(title).toBe("Форма обратной связи");
});

// Тест 2: все поля формы отображаются на странице
test("форма содержит все обязательные поля", async ({ page }) => {
  await page.goto(FILE_URL);

  const nameField = page.locator("#name");
  const emailField = page.locator("#email");
  const messageField = page.locator("#message");
  const submitBtn = page.locator("#submit-btn");

  await expect(nameField).toBeVisible();
  await expect(emailField).toBeVisible();
  await expect(messageField).toBeVisible();
  await expect(submitBtn).toBeVisible();
});

// Тест 3: кнопка отправки имеет правильный текст
test('кнопка отправки имеет текст "Отправить"', async ({ page }) => {
  await page.goto(FILE_URL);

  const submitBtn = page.locator("#submit-btn");
  const btnText = await submitBtn.innerText();

  expect(btnText).toBe("Отправить");
});

// Тест 4: после заполнения и отправки формы появляется сообщение об успехе
test("после отправки формы отображается сообщение об успехе", async ({
  page,
}) => {
  await page.goto(FILE_URL);
  await page.fill("#name", "Иван Иванов");
  await page.fill("#email", "ivan@example.com");
  await page.fill("#message", "Тестовое сообщение");

  await page.click("#submit-btn");

  const successMsg = page.locator("#success-msg");
  await expect(successMsg).toBeVisible();
});
