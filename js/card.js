function handleCardClick(event, cardElement) {
  const isMobile = window.innerWidth < 1024;
  if (!isMobile) return;

  const overlay = cardElement.querySelector('[data-id="overlay"]');

  if (
    event.target.closest("button") ||
    overlay.getAttribute("data-active-card") === "true"
  ) {
    return;
  }

  document
    .querySelectorAll('[data-id="overlay"][data-active-card="true"]')
    .forEach((el) => {
      el.setAttribute("data-active-card", "false");
      el.style.opacity = "0";
      el.style.pointerEvents = "none";
    });

  overlay.setAttribute("data-active-card", "true");
  overlay.style.opacity = "1";
  overlay.style.pointerEvents = "auto";
}

function handleOverlayButtonClick(event, cardOverlayElementId) {
  //   event.stopPropagation();
  const isMobile = window.innerWidth < 1024;
  if (!isMobile) return;

  const overlay = document.querySelector(
    `[data-card-overlay-id="${cardOverlayElementId}"]`
  );
  overlay.setAttribute("data-active-card", "false");
  overlay.style.opacity = "0";
  overlay.style.pointerEvents = "none";
}
