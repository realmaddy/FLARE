document.addEventListener("DOMContentLoaded", () => {
  // ===== DARK MODE SYSTEM =====
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;

  const savedTheme = localStorage.getItem("theme") || "light";
  const isDark = savedTheme === "dark";

  body.classList.toggle("dark-mode", isDark);
  if (themeToggle) themeToggle.checked = isDark;

  if (themeToggle) {
    themeToggle.addEventListener("change", () => {
      const dark = themeToggle.checked;
      body.classList.toggle("dark-mode", dark);
      localStorage.setItem("theme", dark ? "dark" : "light");
    });
  }

  // ====== HELPER FUNCTION ======
  const safeBind = (id, callback) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("click", callback);
  };

  // ====== DATA MANAGEMENT ======
  safeBind("import-btn", () => showMessage("📥 Data Import initiated successfully!"));
  safeBind("export-btn", () => showMessage("📤 Data Export completed successfully!"));
  safeBind("view-logs-btn", () => showMessage("🧾 Viewing System Logs..."));

  // ====== MAINTENANCE TOOLS ======
  safeBind("optimize-db-btn", () => showMessage("🧠 Database Optimization in progress..."));
  safeBind("clear-cache-btn", () => showMessage("🧹 Cache cleared successfully!"));

  // ====== SECURITY TOOLS ======
  safeBind("scan-vulnerabilities-btn", () => showMessage("🔍 Scanning for vulnerabilities..."));
  safeBind("manage-ip-btn", () => showMessage("🌐 IP Whitelist / Blacklist management opened."));

  // ====== MESSAGE POPUP ======
  function showMessage(message) {
    const alertBox = document.createElement("div");
    alertBox.textContent = message;
    alertBox.style.position = "fixed";
    alertBox.style.bottom = "20px";
    alertBox.style.right = "20px";
    alertBox.style.background = "rgba(255, 107, 107, 0.9)";
    alertBox.style.color = "#fff";
    alertBox.style.padding = "10px 14px";
    alertBox.style.borderRadius = "8px";
    alertBox.style.fontSize = "0.9em";
    alertBox.style.boxShadow = "0 4px 8px rgba(0,0,0,0.3)";
    alertBox.style.zIndex = "999";
    alertBox.style.opacity = "1";
    alertBox.style.transition = "opacity 0.6s ease";

    document.body.appendChild(alertBox);
    setTimeout(() => (alertBox.style.opacity = "0"), 1600);
    setTimeout(() => alertBox.remove(), 2200);
  }
});
