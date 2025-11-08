document.addEventListener('DOMContentLoaded', () => {
  // ===== DARK MODE TOGGLE =====
  const themeSwitch = document.querySelector('.switch input');
  const savedTheme = localStorage.getItem('theme') || 'light';
  const isDark = savedTheme === 'dark';

  // تطبيق الثيم المخزن
  document.body.classList.toggle('dark-mode', isDark);
  if (themeSwitch) themeSwitch.checked = isDark;

  // تبديل الثيم وتخزينه
  if (themeSwitch) {
    themeSwitch.addEventListener('change', () => {
      const dark = themeSwitch.checked;
      document.body.classList.toggle('dark-mode', dark);
      localStorage.setItem('theme', dark ? 'dark' : 'light');
    });
  }

  // ===== ACTIVE MENU ITEM =====
  const menuLinks = document.querySelectorAll('.menu a');
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  // ===== SEARCH FILTER =====
  const searchBar = document.getElementById('search-bar');
  if (searchBar) {
    searchBar.addEventListener('keyup', e => {
      const searchTerm = e.target.value.toLowerCase();
      const rows = document.querySelectorAll('table tbody tr');

      rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
      });
    });
  }

  // ===== ROW CLICK HIGHLIGHT =====
  const tableRows = document.querySelectorAll('table tbody tr');
  if (tableRows.length) {
    tableRows.forEach(row => {
      row.addEventListener('click', () => {
        tableRows.forEach(r => r.classList.remove('selected'));
        row.classList.add('selected');
      });
    });
  }
});
