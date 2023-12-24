export enum ApiErrorMessageEnum {
  INTERNAL_SERVER_ERROR = 'Сталася невідома помилка!',

  BAD_REQUEST = 'Помилка запиту!',

  UNKNOWN_ERROR = 'Сталася невідома помилка!',

  AUTH_INCORRECT_CREDENTIALS = 'Неправильно введено пошту або пароль!',
  AUTH_UNAUTHORIZED = 'Користувач неавторизований!',
  AUTH_UNKNOWN_ERROR = 'Невідома помилка авторизації!',

  USER_ALREADY_EXISTS = 'Користувач вже зареєстрований!',
  USER_NOT_FOUND = 'Користувача не знайдено!',
  USERS_NOT_FOUND = 'Користувачів не знайдено!',

  TEST_TEMPLATE_ALREADY_EXISTS = 'Шаблон тесту вже інсує!',
  TEST_TEMPLATE_NOT_FOUND = 'Шаблон тесту не знайдено!',
  TEST_TEMPLATES_NOT_FOUND = 'Шаблони тестів не знайдено!',

  TEST_ALREADY_EXISTS = 'Тест вже існує!',
  TEST_NOT_FOUND = 'Тест не знайдено!',
  TESTS_NOT_FOUND = 'Тести не знайдено!',
}
