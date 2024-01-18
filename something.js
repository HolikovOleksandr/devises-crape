const puppeteer = require("puppeteer");

const randomTimeout = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const parseProductData = async (url) => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(url);

    // Wait for the Cloudflare challenge to appear
    await page.waitForSelector("#challenge-stage", { visible: true });

    // Focus the iframe to trigger Cloudflare's challenge
    const iframe = await page.$(
      "iframe[title*='Cloudflare security challenge']"
    );
    await iframe.focus();

    // Wait for the checkbox to be present
    await page.waitForSelector("#cf-chl-widget-f1ct1_response", {
      visible: true,
    });

    // Generate a random timeout for a more human-like interaction
    const timeout = randomTimeout(2, 5);

    // Click the checkbox
    await page.click("#cf-chl-widget-f1ct1_response", { timeout });

    // Continue parsing the product data (assuming Cloudflare challenge is passed)
    // ... (rest of your parsing logic)

    await browser.close();
    return parsedProductData; // Replace with your parsed data
  } catch (error) {
    console.error("Error parsing product data:", error);
    throw error; // Re-throw to allow handling in the calling code
  }
};

module.exports = parseProductData;
