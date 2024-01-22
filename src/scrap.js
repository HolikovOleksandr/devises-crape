const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

async function scrap(link) {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto(link).then(() => page.waitForTimeout(5000));

  // Збільште час очікування до 60 секунд
  const checkboxSelector = 'div#challenge-form input[type="checkbox"]';

  // Очікуємо на появу чекбокса за допомогою waitForFunction
  await page.waitForFunction(
    (selector) => document.querySelector(selector),
    { timeout: 60000 },
    checkboxSelector
  );

  // Клікаємо на чекбокс
  await page.evaluate((selector) => {
    document.querySelector(selector).click();
  }, checkboxSelector);

  await page.screenshot({ path: "testresult.png", fullPage: true });

  await browser.close();
  console.log(`All done, check the screenshot. ✨`);
}

module.exports = scrap;
