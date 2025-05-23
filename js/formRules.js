const loginEmailValidationRules = {
  email: {
    validate: (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
    },
    errorMessage: "Неверная почта:",
  },
};

const registerFormValidationRules = {
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

const recoveryPasswordFormValidationRules = {
  email: {
    validate: (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
    },
    errorMessage: "Неверная почта:",
  },
};

const editUserFormValidationRules = {
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
