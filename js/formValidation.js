class FormValidator {
  constructor(formId, validationRules) {
    this.form = document.getElementById(formId);
    this.validationRules = validationRules;
    this.originalLabels = new Map();

    if (!this.form) {
      console.error(`Form with ID ${formId} not found`);
      return;
    }
    this.initialize();
  }

  // Toggle password visibility
  static inputTypeToggle(inputId, icon) {
    const input = document.getElementById(inputId);
    console.log(input);

    if (!input) return;
    if (input.type === "password") {
      input.type = "text";
      icon.classList.add("text-primary");
      console.log(icon, "text-primary");
    } else {
      input.type = "password";
      icon.classList.remove("text-primary");
      console.log(icon, "text-primary remove");
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
    const icon = inputContainer.querySelector("i, img"); // Support both <i> and <img>

    if (!isValid && validationRule?.errorMessage) {
      inputContainer.classList.add("error-border");
      label.classList.add("error-label");
      divider?.classList.add("error-divider");
      input.classList.add("error-placeholder");
      icon?.classList.add("error-label");
      if (label) label.textContent = validationRule.errorMessage; // Set error message
    } else {
      inputContainer.classList.remove("error-border");
      label.classList.remove("error-label");
      divider?.classList.remove("error-divider");
      input.classList.remove("error-placeholder");
      icon?.classList.remove("error-label");
      if (label && originalLabelText) label.textContent = originalLabelText; // Restore original label
    }
  }

  // Validate a single field
  validateField(field) {
    const fieldName = field.name;
    const rule = this.validationRules[fieldName];
    if (!rule) return true; // Skip if no validation rule

    const isValid = rule.validate(field.value);
    const inputContainer = field.closest(".input-container");
    if (inputContainer) {
      const label = inputContainer.previousElementSibling;
      const originalLabelText =
        this.originalLabels.get(field.id) || label?.textContent || "";
      FormValidator.setErrorStyles(
        inputContainer,
        isValid,
        rule,
        originalLabelText
      );
    }
    return isValid;
  }

  // Initialize event listeners
  initialize() {
    // Store original label texts for all inputs
    this.form.querySelectorAll("input").forEach((input) => {
      const label = input.closest(".form-item")?.querySelector("label");
      if (label && input.id) {
        this.originalLabels.set(input.id, label.textContent);
      }
    });

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
