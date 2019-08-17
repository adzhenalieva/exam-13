const {I} = inject();
// Add in your custom step files

Given('я нахожусь на странице Регистрация', () => {
  I.amOnPage('register')
});

When('я ввожу {string} в поле {string}', (text, fieldName) => {
  I.fillField({xpath: `//input[@id='${fieldName}']`}, text)
});

When('я загружаю картинку {string} в {string}', (image, id) => {
  I.attachFile({xpath: `//input[@id='${id}']`}, `dataimage/'${image}'`);
});

Then('нажимаю на кнопку {string}', (buttonName) => {
  I.click(`//button[.='${buttonName}']`)
});

When('я вижу текст {string}', (text) => {
  I.waitForText(text);
});


