const { test, expect } = require("@playwright/test");

test("first title test", async ({ page }) => {
  //   const browserContext = browser.newContext();
  await page.goto("https://www.amazon.in");
  await page.waitForTimeout(5000);

  await page.locator("//span[text() = 'Account & Lists']").hover();
  //   await page
  //     .locator("(//a[@data-nav-role = 'signin']/span[text() = 'Sign in'])[1]")
  //     .click();
  //   await page.goBack();

  const inputSearchBox = "//input[@id='twotabsearchtextbox']";
  await page.locator(inputSearchBox).clear();
  await page.locator(inputSearchBox).fill("keyboard");
  await page.waitForTimeout(3000);

  //   const resultSuggestions = await page
  //     .locator("//div[@class='left-pane-results-container']//div[@aria-label]")
  //     .all();

  let resultSuggestions = await page
    .locator("//div[@class='left-pane-results-container']//div[@aria-label]")
    .all();

  await page.waitForLoadState("networkidle");
  for (let result of resultSuggestions) {
    let ariaLabel = await result.getAttribute("aria-label");

    if (ariaLabel === "keyboard mouse combo wireless") {
      console.log("found product in suggestions. clicking...");
      await result.click();
      break;
    }
  }

  const productToBuy =
    "//span[text() = 'Dell USB Wireless Keyboard and Mouse Set- KM3322W, Anti-Fade & Spill-Resistant Keys, up to 36 Month Battery Life, 3Y Advance Exchange Warranty, Black']";
  await page.locator(productToBuy).click();

  page.waitForTimeout(3000);
});
