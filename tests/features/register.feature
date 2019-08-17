# language: ru


Функция: Регистрация пользователя
  @register
  Сценарий: Успешная регистрация
    Допустим я нахожусь на странице Регистрация
    Если я ввожу "howard" в поле "username"
    И я ввожу "123" в поле "password"
    И я ввожу "howard" в поле "displayName"
    И я загружаю картинку "user.png" в "avatar"
    То нажимаю на кнопку "Register"
    И я вижу текст "Registered successfully"