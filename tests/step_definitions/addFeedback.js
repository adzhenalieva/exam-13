const {I} = inject();
// Add in your custom step files

Given('я нахожусь на странице Главная', () => {
    I.amOnPage('')
});

When('я нажимаю на ссылку {string}', (text) => {
    I.click(`//a[contains(., '${text}')]`);
});

When('я нажимаю на {string}', (text) => {
    I.click({xpath:`//div[@class='${text}']`});
});

When('я ввожу {string} в поле {string}', (text, fieldName) => {
    I.fillField({xpath: `//input[@id='${fieldName}']`}, text)
});

Then('нажимаю на кнопку {string}', (buttonName) => {
    I.click(`//button[.='${buttonName}']`)
});

When('я вижу цифру {string}', (text) => {
    I.seeElement(`//span[contains(., '${text}')]`);
});



