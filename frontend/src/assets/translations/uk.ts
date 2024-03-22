import { ValidationMsg } from "~constants/validation.constanse";

export const ukTranslations = {
  translation: {
    // general
    test: "Тест переклад",
    email: "Електронна пошта",
    password: "Пароль",
    signup: "Зареєструватися",

    // login translations
    "loginForm.header": "Логін",
    "loginForm.submit": "Увійти",
    "loginForm.noAccount": "Створити новий профіль",
    "loginForm.forgotPassword": "Забули пароль?",

    // validation
    [ValidationMsg.EMPTYFIELD]: "Поле не може бути порожнім",
    [ValidationMsg.INVALIDEMAIL]: "Формат пошти невірний",
  },
};
