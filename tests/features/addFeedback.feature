# language: ru


Функция: Создание отзыва

  @addFeedback
  Сценарий: Успешный отзыв
    Допустим я нахожусь на странице Вход
    Если я ввожу "admin" в поле "username"
    И я ввожу "123" в поле "password"
    И нажимаю на кнопку "Login"
    И я вижу текст "Logged in successfully"
    И я нахожусь на странице Главная
    И я нажимаю на ссылку "Bublick"
    И я ввожу "Super" в поле "comment"
    И я нажимаю на "star-ratings"
    То нажимаю на кнопку "Publish"
    И я вижу текст "Success! Thank you for your feedback"
    И я вижу цифру "2.5"

