import { ValidationMsg } from "~constants/validation.constanse";

export const enTranslations = {
  translation: {
    // general
    test: "Test translation",
    email: "Email",
    password: "Password",
    signup: "Sign up",

    // login translations
    "loginForm.header": "Login",
    "loginForm.submit": "Log in",
    "loginForm.noAccount": "Sign up",
    "loginForm.forgotPassword": "Forgot password?",

    // validation
    [ValidationMsg.EMPTYFIELD]: "Field cannot be empty",
    [ValidationMsg.INVALIDEMAIL]: "Invalid email address",
  },
};
