// === Theme Toggle ===
document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");
  const savedTheme = localStorage.getItem("theme") || "light";
  const isDark = savedTheme === "dark";

  // Apply saved theme immediately
  document.body.classList.toggle("dark-mode", isDark);
  if (themeToggle) themeToggle.checked = isDark;

  // Initialize charts & map after DOM load
  initCharts();
  initMap();

  // === Handle theme switch ===
  if (themeToggle) {
    themeToggle.addEventListener("change", () => {
      const darkEnabled = themeToggle.checked;
      document.body.classList.toggle("dark-mode", darkEnabled);
      localStorage.setItem("theme", darkEnabled ? "dark" : "light");

      // Update visuals
      updateMapTheme(darkEnabled);
      initCharts();
    });
  }
});

// === ApexCharts ===
function initCharts() {
  const isDark = document.body.classList.contains("dark-mode");

  // Remove old charts if any exist before re-render
  document.querySelectorAll(".apexcharts-canvas").forEach(el => el.remove());

  const revenueOptions = {
    series: [
      {
        name: "Revenue",
        data: [10, 30, 45, 60, 85, 100, 130, 150, 170, 190, 210, 250],
      },
    ],
    chart: {
      type: "bar",
      height: 220,
      toolbar: { show: false },
      background: "transparent",
    },
    colors: ["#ff6b6b"],
    theme: { mode: isDark ? "dark" : "light" },
    xaxis: {
      categories: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
      ],
      labels: { style: { colors: isDark ? "#ccc" : "#555" } },
    },
    yaxis: {
      labels: { style: { colors: isDark ? "#ccc" : "#555" } },
    },
    grid: {
      borderColor: isDark ? "#333" : "#e0e0e0",
    },
    tooltip: {
      theme: isDark ? "dark" : "light",
    },
  };

  const chartContainer = document.querySelector("#revenue-chart");
  if (chartContainer) {
    const chart = new ApexCharts(chartContainer, revenueOptions);
    chart.render();
  }
}

// === Leaflet Map ===
let map, tileLayer;

function initMap() {
  const mapContainer = document.getElementById("map");
  if (!mapContainer) return;

  const center = [33.589886, -7.603869]; // Casablanca

  // Remove previous map instance if exists
  if (map) {
    map.remove();
    map = null;
  }

  map = L.map("map", {
    center,
    zoom: 11,
    zoomControl: false,
    attributionControl: false,
  });

  const isDark = document.body.classList.contains("dark-mode");
  const tileURL = isDark
    ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
    : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

  tileLayer = L.tileLayer(tileURL, { maxZoom: 19 }).addTo(map);

  // Add marker
  L.marker(center)
    .addTo(map)
    .bindPopup("<b>Casablanca</b><br>Active server region")
    .openPopup();
}

// === Update map when theme changes ===
function updateMapTheme(isDark) {
  if (!map) return;

  map.removeLayer(tileLayer);

  const newURL = isDark
    ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
    : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

  tileLayer = L.tileLayer(newURL, { maxZoom: 19 }).addTo(map);
}
