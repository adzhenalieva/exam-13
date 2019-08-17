const {I} = inject();
// Add in your custom step files

Given('я нахожусь на странице Новое место', () => {
    I.amOnPage('place/new')
});

When('я ввожу {string} в поле {string}', (text, fieldName) => {
    I.fillField({xpath: `//input[@id='${fieldName}']`}, text)
});

When('я загружаю картинку {string} в {string}', (image, id) => {
    I.attachFile({xpath: `//input[@id='${id}']`}, `dataimage/'${image}'`);
});

When('нажимаю на кнопку {string}', (buttonName) => {
    I.click(`//button[.='${buttonName}']`)
});

When('нажимаю на чекбокс {string}', (id) => {
    I.click({xpath: `//input[@id='${id}']`})
});

When('я вижу текст {string}', (text) => {
    I.waitForText(text);
});

Then('я нахожусь на странице Главная', () => {
    I.amOnPage('')
});

When('я вижу {string}', (text) => {
    I.seeElement(`//a[contains(., '${text}')]`);
});


