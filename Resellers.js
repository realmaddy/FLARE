// ===== GLOBAL PAGE SCRIPT =====
document.addEventListener("DOMContentLoaded", () => {
  const themeSwitch = document.querySelector(".switch input");

  // ===== DARK MODE TOGGLE =====
  const savedTheme = localStorage.getItem("theme") || "light";
  const isDark = savedTheme === "dark";
  document.body.classList.toggle("dark-mode", isDark);
  if (themeSwitch) themeSwitch.checked = isDark;

  if (themeSwitch) {
    themeSwitch.addEventListener("change", () => {
      const dark = themeSwitch.checked;
      document.body.classList.toggle("dark-mode", dark);
      localStorage.setItem("theme", dark ? "dark" : "light");
    });
  }

  // ===== ACTIVE MENU ITEM =====
  const menuLinks = document.querySelectorAll(".menu a");
  if (menuLinks.length) {
    const currentPage = window.location.pathname.split("/").pop();

    menuLinks.forEach(link => {
      // تفعيل الرابط الحالي تلقائيًا
      if (link.getAttribute("href") === currentPage) {
        link.classList.add("active");
      }

      // تفعيل يدوي عند الضغط
      link.addEventListener("click", () => {
        menuLinks.forEach(l => l.classList.remove("active"));
        link.classList.add("active");
      });
    });
  }

  // ===== SEARCH FILTER =====
  const searchBar = document.getElementById("search-bar");
  if (searchBar) {
    searchBar.addEventListener("input", e => {
      const term = e.target.value.toLowerCase();
      document.querySelectorAll("table tbody tr").forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(term) ? "" : "none";
      });
    });
  }

  // ===== ROW HIGHLIGHT ON CLICK =====
  const rows = document.querySelectorAll("table tbody tr");
  if (rows.length) {
    rows.forEach(row => {
      row.addEventListener("click", () => {
        rows.forEach(r => r.classList.remove("selected"));
        row.classList.add("selected");
      });
    });
  }
});
