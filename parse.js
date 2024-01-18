const puppeteer = require("puppeteer");

const randomTimeout = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const parseProductData = async () => {
  try {
    const urlTest =
      "https://www.x-kom.pl/p/1092860-myszka-bezprzewodowa-deltaco-gam-120-w-24g-bt.html";
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(urlTest);

    // Wait for the product specifications section to load
    await page.waitForSelector(".sc-1vidtud-0.gkkUgs", { visible: true });

    // Check for the reCAPTCHA checkbox
    const checkbox = await page.$(".g-recaptcha-response");

    // If the checkbox is present, click it
    if (checkbox) {
      const timeout = randomTimeout(2, 5);

      // Set the timeout
      setTimeout(async () => await checkbox.click(), timeout * 100);
    }

    // Continue parsing the product data
    const specificationsSection = await page.$(".sc-1vidtud-0.gkkUgs");
    const specificationRows = await specificationsSection.$$(
      ".sc-1s1zksu-0.hHQkLn"
    );

    const productData = {};
    for (const row of specificationRows) {
      const nameElement = await row.$(".sc-13p5mv-1");
      const valueElements = await row.$$(".sc-13p5mv-3");

      const name = await nameElement.evaluate((el) => el.textContent);
      const values = await Promise.all(
        valueElements.map((el) => el.evaluate((el) => el.textContent))
      );

      productData[name] = values;
    }

    await browser.close();
    return productData;
  } catch (error) {
    console.error("Error parsing product data:", error);
    throw error; // Re-throw to allow handling in the calling code
  }
};

// Example usage:
parseProductData("https://example.com/product-page")
  .then((data) => {
    console.log(data); // Output the parsed product data
  })
  .catch((error) => {
    console.error("Error:", error);
  });

module.exports = parseProductData;
