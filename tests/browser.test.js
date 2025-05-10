const { Builder, By, until } = require('selenium-webdriver');
require('chromedriver');

const fileUnderTest = 'file://' + __dirname.replace(/ /g, '%20') + '/../dist/index.html';
const defaultTimeout = 10000;
let driver;
jest.setTimeout(1000 * 60 * 5); // 5 minuter

// Det här körs innan vi kör testerna för att säkerställa att Chrome är igång
beforeAll(async () => {
    console.log(fileUnderTest);
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get(fileUnderTest);
});

// Allra sist avslutar vi Chrome igen
afterAll(async () => {
    await driver.quit();
}, defaultTimeout);

test('The stack should be empty in the beginning', async () => {
    let stack = await driver.findElement(By.id('top_of_stack')).getText();
    expect(stack).toEqual("n/a");
});

describe('Clicking "Pusha till stacken"', () => {
    it('should open a prompt box', async () => {
        let push = await driver.findElement(By.id('push'));
        await push.click();
        let alert = await driver.switchTo().alert();
        await alert.sendKeys("Bananer");
        await alert.accept();
    });
});


// EGET TEST: Testa att pop tar bort värdet från stacken
test('Att klicka på pop uppdaterar top_of_stack till n/a', async () => {
    // Tryck på "push"-knappen och skicka in ett värde
    const push = await driver.findElement(By.id('push'));
    await push.click();
    const alert = await driver.switchTo().alert();
    await alert.sendKeys("Testvärde");
    await alert.accept();

    // Tryck på "pop"-knappen
    const pop = await driver.findElement(By.id('pop'));
    await pop.click();

    // Kolla att stacken är tom igen (top_of_stack visar "n/a")
    const top = await driver.findElement(By.id('top_of_stack')).getText();
    expect(top).toEqual("n/a");
});


test('Pusha och sen poppa ska visa n/a', async () => {
    let push = await driver.findElement(By.id('push'));
    await push.click();

    let alert = await driver.switchTo().alert();
    await alert.sendKeys("testdata");
    await alert.accept();

    let pop = await driver.findElement(By.id('pop'));
    await pop.click();
    let confirm = await driver.switchTo().alert();
    await confirm.accept();

    let display = await driver.findElement(By.id('top_of_stack')).getText();
    expect(display).toEqual("n/a"); // Om pop inte uppdaterar display blir detta FAIL
});
