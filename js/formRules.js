export const loginEmailValidationRules = {
  email: {
    rules: [
      {
        validate: (value) => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(value);
        },
        errorMessage: "Неверная почта.",
      },
      {
        validate: (value) => value.length <= 100,
        errorMessage: "Почта не может быть длиннее 100 символов.",
      },
    ],
  },
  password: {
    rules: [
      {
        validate: (value) => value.length >= 8,
        errorMessage: "Пароль должен быть не менее 8 символов.",
      },
      {
        validate: (value) => /[A-Z]/.test(value),
        errorMessage: "Пароль должен содержать хотя бы одну заглавную букву.",
      },
      {
        validate: (value) => /[0-9]/.test(value),
        errorMessage: "Пароль должен содержать хотя бы одну цифру.",
      },
    ],
  },
};

export const registerFormValidationRules = {
  email: {
    rules: [
      {
        validate: (value) => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(value);
        },
        errorMessage: "Неверная почта.",
      },
      {
        validate: (value) => value.length <= 100,
        errorMessage: "Почта не может быть длиннее 100 символов.",
      },
    ],
  },
  user: {
    rules: [
      {
        validate: (value) => value.length >= 4,
        errorMessage: "Имя пользователя должно быть не менее 4 символов.",
      },
      {
        validate: (value) => /^[a-zA-Z0-9_]+$/.test(value),
        errorMessage: "Имя пользователя содержит недопустимые символы.",
      },
    ],
  },
  password: {
    rules: [
      {
        validate: (value) => value.length >= 8,
        errorMessage: "Пароль должен быть не менее 8 символов.",
      },
      {
        validate: (value) => /[A-Z]/.test(value),
        errorMessage: "Пароль должен содержать хотя бы одну заглавную букву.",
      },
      {
        validate: (value) => /[0-9]/.test(value),
        errorMessage: "Пароль должен содержать хотя бы одну цифру.",
      },
    ],
  },
  confirmPassword: {
    rules: [
      {
        validate: (value, formData) => value === formData.get("password"),
        errorMessage: "Пароли не совпадают.",
      },
    ],
  },
};
export const recoveryPasswordFormValidationRules = {
  email: {
    rules: [
      {
        validate: (value) => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(value);
        },
        errorMessage: "Неверная почта.",
      },
      {
        validate: (value) => value.length <= 100,
        errorMessage: "Почта не может быть длиннее 100 символов.",
      },
    ],
  },
};

export const editUserFormValidationRules = {
  email: {
    validate: (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
    },
    errorMessage: "Неверная почта:",
  },
  user: {
    validate: (value) => {
      if (value.length < 4) return false;
      return true;
    },
    errorMessage: "Неверное имя пользователя:",
  },
};
