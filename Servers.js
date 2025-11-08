document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('theme-toggle');
  const body = document.body;

  // ===== DARK MODE SYSTEM =====
  const savedTheme = localStorage.getItem('theme') || 'light';
  const isDark = savedTheme === 'dark';

  // تطبيق الثيم المحفوظ
  body.classList.toggle('dark-mode', isDark);
  if (toggle) toggle.checked = isDark;

  // عند التبديل
  if (toggle) {
    toggle.addEventListener('change', () => {
      const dark = toggle.checked;
      body.classList.toggle('dark-mode', dark);
      localStorage.setItem('theme', dark ? 'dark' : 'light');
      updateChartTheme(dark);
    });
  }

  // ===== SERVER STATS CHART =====
  let serverChart;
  const chartContainer = document.querySelector("#server-chart");
  if (chartContainer) {
    const chartOptions = getChartOptions(isDark);
    serverChart = new ApexCharts(chartContainer, chartOptions);
    serverChart.render();
  }

  // تحديث المخطط حسب الثيم
  function updateChartTheme(dark) {
    if (!chartContainer) return;
    const newOptions = getChartOptions(dark);
    serverChart.updateOptions(newOptions);
  }

  // إعدادات المخطط
  function getChartOptions(dark) {
    return {
      chart: {
        type: 'area',
        height: 260,
        toolbar: { show: false },
        background: 'transparent'
      },
      series: [
        { name: "CPU", data: [40, 60, 55, 70, 50, 65, 75] },
        { name: "RAM", data: [30, 50, 45, 60, 55, 70, 65] },
        { name: "Disk", data: [20, 40, 35, 50, 45, 60, 55] }
      ],
      xaxis: {
        categories: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
        labels: { style: { colors: dark ? '#bbb' : '#555' } }
      },
      stroke: { curve: 'smooth', width: 2 },
      colors: ['#ff5252', '#2196f3', '#00e676'],
      grid: { borderColor: dark ? '#333' : '#ddd' },
      tooltip: { theme: dark ? 'dark' : 'light' },
      legend: { labels: { colors: dark ? '#ccc' : '#555' } }
    };
  }

  // ===== BUTTON FEEDBACK =====
  document.querySelectorAll('.control-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.add('active');
      setTimeout(() => btn.classList.remove('active'), 300);
    });
  });
});
