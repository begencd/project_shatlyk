document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const sidebar = document.getElementById("sidebar");
  const sidebarOverlay = document.getElementById("sidebar-overlay");
  const closeSidebar = document.getElementById("close-sidebar");

  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    sidebar.classList.toggle("active");
    sidebarOverlay.classList.toggle("active");
  });

  closeSidebar.addEventListener("click", () => {
    menuToggle.classList.remove("active");
    sidebar.classList.remove("active");
    sidebarOverlay.classList.remove("active");
  });

  sidebarOverlay.addEventListener("click", () => {
    menuToggle.classList.remove("active");
    sidebar.classList.remove("active");
    sidebarOverlay.classList.remove("active");
  });
});
