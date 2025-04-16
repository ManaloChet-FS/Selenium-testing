require('chromedriver');
const { Builder, By, until } = require('selenium-webdriver')

describe("Tests", () => {
  let driver;

  beforeAll(async() => {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.manage().window().maximize();
  });

  afterAll(async () => {
    await driver.quit();
  });

  const setDelay = async () => {
    await driver.sleep(1000);
  }

  it("Get to home page", async () => {
    await driver.get("http://127.0.0.1:3000/");
    const title = await driver.getTitle()
    expect(title).toEqual("Home");
    await setDelay();
  }, 10000)

  it("Get to contact page", async () => {
    await driver.get(driver.getCurrentUrl());
    let contactLink = await driver.findElement(By.id("contactLink"));
    await contactLink.click();
    await driver.wait(until.titleContains("Contact Us"), 4000);
    const title = await driver.getTitle()
    expect(title).toEqual("Contact Us");
    await setDelay();
  })

  it("Sign up for more info via email", async () => {
    await driver.get(driver.getCurrentUrl());

    const formInput = await driver.findElement(By.id("formInput"));
    await formInput.sendKeys('test@gmail.com');
    await setDelay();

    const formSubmit = await driver.findElement(By.id("formSubmit"));
    await formSubmit.click();
    await setDelay();

    const formMessage = await driver.findElement(By.id("formMessage"));
    const text = await formMessage.getText();
    expect(text).toEqual("More info coming to test@gmail.com");
  })
})