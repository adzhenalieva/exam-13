const {I} = inject();
// Add in your custom step files

Given('я нахожусь на странице Вход', () => {
  I.amOnPage('login')
});

When('я ввожу {string} в поле {string}', (text, fieldName) => {
  I.fillField({xpath: `//input[@id='${fieldName}']`}, text)
});

When('нажимаю на кнопку {string}', (buttonName) => {
  I.click(`//button[.='${buttonName}']`)
});

Then('я вижу текст {string}', (text) => {
  I.waitForText(text);
});


