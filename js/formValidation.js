class FormValidator {
  constructor(formId, validationRules) {
    this.form = document.getElementById(formId);
    this.validationRules = validationRules;
    console.log(this.form, this.validationRules);

    if (!this.form) {
      console.error(`Form with ID ${formId} not found`);
      return;
    }
    this.initialize();
  }

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

  static setErrorStyles(inputContainer, isValid) {
    const input = inputContainer.querySelector("input");
    const label = inputContainer.previousElementSibling;
    const divider = inputContainer.querySelector(".input-divider");
    const icon = inputContainer.querySelector("i");

    if (!isValid) {
      inputContainer.classList.add("error-border");
      label.classList.add("error-label");
      divider?.classList.add("error-divider");
      input.classList.add("error-placeholder");
      icon.classList.add("error-label");
    } else {
      inputContainer.classList.remove("error-border");
      label.classList.remove("error-label");
      divider?.classList.remove("error-divider");
      input.classList.remove("error-placeholder");
      icon.classList.remove("error-label");
    }
  }

  validateField(field) {
    const fieldName = field.name;
    const rule = this.validationRules[fieldName];
    if (!rule) return true; // Skip if no validation rule

    const isValid = rule.validate(field.value);
    const inputContainer = field.closest(".input-container");
    if (inputContainer) {
      FormValidator.setErrorStyles(inputContainer, isValid);
    }
    return isValid;
  }

  // Initialize event listeners
  initialize() {
    // Handle onChange and onBlur
    this.form.querySelectorAll("input").forEach((input) => {
      if (this.validationRules[input.name]) {
        input.addEventListener("change", () => this.validateField(input));
        input.addEventListener("blur", () => this.validateField(input));
      }
    });

    // Handle form submission
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      let isFormValid = true;

      this.form.querySelectorAll("input").forEach((input) => {
        if (this.validationRules[input.name] && !this.validateField(input)) {
          isFormValid = false;
        }
      });

      if (isFormValid) {
        console.log(`Form ${this.form.id} is valid, ready to submit`);
        // Example: this.form.submit(); or handle via fetch/AJAX
      } else {
        console.log(`Form ${this.form.id} validation failed`);
      }
    });

    // Password visibility toggle
    this.form.querySelectorAll(".password-toggle").forEach((icon) => {
      icon.addEventListener("click", () => {
        const inputId = icon.getAttribute("data-input-id");
        FormValidator.inputTypeToggle(inputId, icon);
      });
    });
  }
}
