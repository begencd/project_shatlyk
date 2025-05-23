const MODAL_TRANSITION_DURATION = 300;

const openModal = (modalId) => {
  const modalOverlay = document.getElementById("modalOverlay");
  const modalElement = document.getElementById(modalId);

  if (modalOverlay && modalElement) {
    modalOverlay.classList.remove("hidden");
    modalElement.classList.remove("hidden");

    requestAnimationFrame(() => {
      modalOverlay.classList.remove("opacity-0");

      modalElement.classList.remove("opacity-0");
      modalElement.classList.remove("scale-95");
      modalElement.classList.remove("-translate-y-5");
    });
  }
};

const closeModal = (modalId) => {
  const modalOverlay = document.getElementById("modalOverlay");
  const modalElement = document.getElementById(modalId);

  if (modalOverlay && modalElement) {
    modalOverlay.classList.add("opacity-0");

    modalElement.classList.add("opacity-0");
    modalElement.classList.add("scale-95");
    modalElement.classList.add("-translate-y-5");
    setTimeout(() => {
      modalOverlay.classList.add("hidden");
      modalElement.classList.add("hidden");
    }, MODAL_TRANSITION_DURATION);
  }
};

document.addEventListener("keydown", function (event) {
  const reusableModal = document.getElementById("reusableModal");
  if (
    event.key === "Escape" &&
    reusableModal &&
    !reusableModal.classList.contains("hidden")
  ) {
    closeModal("reusableModal");
  }
});
