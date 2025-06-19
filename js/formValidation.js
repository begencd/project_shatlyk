import formEndpoints from "./formEndpoints.js";

class FormValidator {
  constructor(formId, validationRules) {
    this.form = document.getElementById(formId);
    this.validationRules = validationRules;
    this.originalLabels = new Map();

    if (!this.form) {
      console.error(`Form with ID ${formId} not found`);
      return;
    }
    if (!this.validationRules) {
      console.error(`Validation rules for form ${formId} are undefined`);
      return;
    }
    this.initialize();
  }

  // Toggle password visibility
  static inputTypeToggle(inputId, icon) {
    const input = document.getElementById(inputId);
    if (!input) return;
    if (input.type === "password") {
      input.type = "text";
      icon.classList.add("text-primary");
    } else {
      input.type = "password";
      icon.classList.remove("text-primary");
    }
  }

  // Apply or remove error styles and update label text
  static setErrorStyles(
    inputContainer,
    isValid,
    validationRule,
    originalLabelText
  ) {
    const input = inputContainer.querySelector("input");
    const label = inputContainer.previousElementSibling;
    const divider = inputContainer.querySelector(".input-divider");
    const icon = inputContainer.querySelector("i, img");

    if (!isValid && validationRule?.errorMessage) {
      inputContainer.classList.add("error-border");
      label.classList.add("error-label");
      divider?.classList.add("error-divider");
      input.classList.add("error-placeholder");
      icon?.classList.add("error-label");
      if (label) label.textContent = validationRule.errorMessage;
    } else {
      inputContainer.classList.remove("error-border");
      label.classList.remove("error-label");
      divider?.classList.remove("error-divider");
      input.classList.remove("error-placeholder");
      icon?.classList.remove("error-label");
      if (label && originalLabelText) label.textContent = originalLabelText;
    }
  }

  // Validate a single field
  validateField(field) {
    const fieldName = field.name;
    const rules = this.validationRules[fieldName]?.rules || [];
    const formData = new FormData(this.form);
    let isValid = true;
    let firstErrorRule = null;

    for (const rule of rules) {
      const isRuleValid = rule.validate(field.value, formData);
      if (!isRuleValid) {
        isValid = false;
        firstErrorRule = rule;
        break;
      }
    }

    const inputContainer = field.closest(".input-container");
    if (inputContainer) {
      const label = inputContainer.previousElementSibling;
      const originalLabelText =
        this.originalLabels.get(field.id) || label?.textContent || "";
      FormValidator.setErrorStyles(
        inputContainer,
        isValid,
        firstErrorRule,
        originalLabelText
      );
    }
    return isValid;
  }

  // Handle server errors
  showServerErrors(errorData) {
    const error = JSON.parse(errorData);
    if (this.form.id === "loginForm") {
      const loginErrorDiv = this.form
        .closest(".bg-white")
        .querySelector(".login-error");
      if (loginErrorDiv) {
        loginErrorDiv.classList.remove("hidden");
      }
    }
    if (typeof error.message) {
      // if (typeof error === "string") {
      const serverMessage = this.form.querySelector(".server-message");
      if (serverMessage) {
        serverMessage.classList.remove("hidden");
        serverMessage.querySelector("span").textContent = error.message;
      }
    } else if (error.errors) {
      Object.keys(error.errors).forEach((fieldName) => {
        const input = this.form.querySelector(`[name="${fieldName}"]`);
        if (input) {
          const serverMessage = input
            .closest(".form-item")
            .querySelector(".server-message");
          if (serverMessage) {
            serverMessage.classList.remove("hidden");
            serverMessage.querySelector("span").textContent =
              error.errors[fieldName][0];
          }
        }
      });
    }
  }

  // Handle form submission with fetch
  async handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    let isFormValid = true;

    // Client-side validation
    this.form.querySelectorAll("input").forEach((input) => {
      if (this.validationRules[input.name] && !this.validateField(input)) {
        isFormValid = false;
      }
    });

    if (!isFormValid) {
      console.log(`Form ${this.form.id} validation failed`);
      return;
    }

    // Clear previous server errors
    this.form.querySelectorAll(".server-message").forEach((serverMessage) => {
      serverMessage.classList.add("hidden");
      serverMessage.querySelector("span").textContent = "";
    });

    // Clear login-error div for loginForm
    if (this.form.id === "loginForm") {
      const loginErrorDiv = this.form
        .closest(".bg-white")
        .querySelector(".login-error");
      if (loginErrorDiv) {
        loginErrorDiv.classList.add("hidden");
      }
    }

    // Prepare form data as plain object
    const formData = {};
    this.form.querySelectorAll("input").forEach((input) => {
      if (input.name) {
        formData[input.name] = input.value;
      }
    });

    // Get CSRF token from meta tag
    const csrfToken = document.querySelector(
      'meta[name="csrf-token"]'
    )?.content;
    if (!csrfToken) {
      console.error("CSRF token not found");
      this.showServerErrors("CSRF token eksik, lütfen sayfayı yenileyin.");
      return;
    }

    // Fetch submission
    const endpointConfig = formEndpoints[this.form.id];
    if (!endpointConfig) {
      console.error(`No endpoint configuration found for form ${this.form.id}`);
      return;
    }

    try {
      const response = await fetch(endpointConfig.endpoint, {
        method: endpointConfig.method,
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": csrfToken,
        },
      });

      // if (response.ok) {
      //   window.location.replace(endpointConfig.redirectPath);
      // }
      if (response.status === 200 || response.status === 201) {
        window.location.replace(endpointConfig.redirectPath);
      } else {
        const errorMessage = await response.text();
        this.showServerErrors(errorMessage);
        console.error(`Form ${this.form.id} submission failed`, errorMessage);
      }
    } catch (error) {
      console.error("Submission error:", error);
      this.showServerErrors("Серверная ошибка, пожалуйста, попробуйте снова.");
    }
  }

  // Initialize event listeners
  initialize() {
    // Store original label texts
    this.form.querySelectorAll("input").forEach((input) => {
      const label = input.closest(".form-item")?.querySelector("label");
      if (label && input.id) {
        this.originalLabels.set(input.id, label.textContent);
      }
    });

    // Handle input events
    this.form.querySelectorAll("input").forEach((input) => {
      if (this.validationRules[input.name]) {
        input.addEventListener("input", () => this.validateField(input));
        input.addEventListener("blur", () => this.validateField(input));
      }
    });

    // Handle form submission
    this.form.addEventListener("submit", (e) => this.handleSubmit(e));

    // Password visibility toggle
    this.form.querySelectorAll(".password-toggle").forEach((icon) => {
      icon.addEventListener("click", () => {
        const inputId = icon.getAttribute("data-input-id");
        FormValidator.inputTypeToggle(inputId, icon);
      });
    });
  }
}

export default FormValidator;
