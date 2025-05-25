document.addEventListener("DOMContentLoaded", () => {
  // sidebar
  const menuToggle = document.getElementById("menu-toggle");
  const sidebar = document.getElementById("sidebar");
  const sidebarOverlay = document.getElementById("sidebar-overlay");
  const closeSidebar = document.getElementById("close-sidebar");

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active");
      sidebar.classList.toggle("active");
      sidebarOverlay.classList.toggle("active");
    });
  }
  if (closeSidebar) {
    closeSidebar.addEventListener("click", () => {
      menuToggle.classList.remove("active");
      sidebar.classList.remove("active");
      sidebarOverlay.classList.remove("active");
    });
  }

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener("click", () => {
      menuToggle.classList.remove("active");
      sidebar.classList.remove("active");
      sidebarOverlay.classList.remove("active");
    });
  }
});

const toggleCollapse = (contentSelector, buttonSelector) => {
  const content = document.querySelector(contentSelector);
  const toggleButton = document.querySelector(buttonSelector);
  const icon = toggleButton.querySelector("img");

  if (!content || !toggleButton || !icon) {
    console.error("Content, button, or icon not found");
    return;
  }

  // Toggle content visibility with Tailwind classes
  if (content.classList.contains("h-[2.5rem]")) {
    content.classList.remove("h-[2.5rem]");
    content.classList.add("h-full");
    toggleButton.querySelector("span").textContent = "Свернуть";
    icon.src = "../public/icons/up.svg";
  } else {
    content.classList.add("h-[2.5rem]");
    content.classList.remove("h-full");
    toggleButton.querySelector("span").textContent = "Развернуть";
    icon.src = "../public/icons/down.svg";
  }
};
