# language: ru


Функция: Создание рецепта
  @addPlace
  Сценарий: Успешное создание места
    Допустим я нахожусь на странице Вход
    Если я ввожу "leo" в поле "username"
    И я ввожу "123" в поле "password"
    И нажимаю на кнопку "Login"
    И я вижу текст "Logged in successfully"
    И я нахожусь на странице Новое место
    И я ввожу "Cafe 505" в поле "title"
    И я ввожу "Sushi bar" в поле "description"
    И я загружаю картинку "cafe.jpeg" в "mainImage"
    И я нажимаю на чекбокс "agreement"
    То нажимаю на кнопку "Publish"
    И я вижу текст "Created successfully"
    И я нахожусь на странице Главная
    И я вижу "Cafe 505"