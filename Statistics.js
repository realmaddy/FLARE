document.addEventListener("DOMContentLoaded", () => {
  // ===== DARK MODE TOGGLE =====
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
      updateCharts(dark);
    });
  }

  // ===== CHART COLOR SCHEME =====
  function getChartColors(isDark) {
    return {
      text: isDark ? "#e0e0e0" : "#333",
      grid: isDark ? "#2a2d32" : "#e0e0e0",
      bg: isDark ? "#1e2126" : "#ffffff"
    };
  }

  // ===== INITIALIZE CHARTS =====
  let charts = [];

  function renderCharts(isDark) {
    const { text, grid, bg } = getChartColors(isDark);

    const configs = [
      {
        el: "#user-growth-chart",
        options: {
          chart: { type: "line", height: 300, toolbar: { show: false }, foreColor: text, background: bg },
          series: [{ name: "Users", data: [320, 410, 590, 720, 860, 940, 1120] }],
          xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
          colors: ["#ff6b6b"],
          stroke: { curve: "smooth", width: 3 },
          grid: { borderColor: grid }
        }
      },
      {
        el: "#traffic-chart",
        options: {
          chart: { type: "area", height: 300, toolbar: { show: false }, foreColor: text, background: bg },
          series: [{ name: "Streams", data: [120, 180, 240, 310, 280, 340, 400] }],
          colors: ["#ff8e53"],
          fill: { type: "gradient", gradient: { opacityFrom: 0.5, opacityTo: 0 } },
          stroke: { curve: "smooth", width: 3 },
          xaxis: { categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] },
          grid: { borderColor: grid }
        }
      },
      {
        el: "#revenue-chart",
        options: {
          chart: { type: "bar", height: 300, toolbar: { show: false }, foreColor: text, background: bg },
          series: [{ name: "Revenue", data: [5200, 6800, 7400, 8100, 9400, 10300, 11700] }],
          colors: ["#ff6b6b"],
          xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
          plotOptions: { bar: { borderRadius: 6, columnWidth: "45%" } },
          grid: { borderColor: grid }
        }
      },
      {
        el: "#performance-chart",
        options: {
          chart: { type: "radialBar", height: 300, foreColor: text, background: bg },
          series: [78],
          labels: ["Server Efficiency"],
          colors: ["#ff6b6b"],
          plotOptions: {
            radialBar: {
              hollow: { size: "60%" },
              dataLabels: {
                name: { fontSize: "14px" },
                value: { fontSize: "18px", show: true }
              }
            }
          }
        }
      }
    ];

    // حذف الرسومات القديمة قبل رسم الجديدة
    charts.forEach(c => c.destroy());
    charts = configs.map(cfg => {
      const chart = new ApexCharts(document.querySelector(cfg.el), cfg.options);
      chart.render();
      return chart;
    });
  }

  // رسم أولي
  renderCharts(isDark);

  // تحديث الألوان عند تبديل الثيم
  function updateCharts(isDark) {
    renderCharts(isDark);
  }
});
