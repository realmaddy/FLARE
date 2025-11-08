document.addEventListener('DOMContentLoaded', () => {
  // ===== DARK MODE SYSTEM =====
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  // تحميل الثيم المخزّن
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    if (themeToggle) themeToggle.checked = true;
  }

  // عند التغيير
  if (themeToggle) {
    themeToggle.addEventListener('change', () => {
      if (themeToggle.checked) {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
      } else {
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
      }
    });
  }

  // ===== SEARCH FILTER =====
  const searchBar = document.getElementById('search-bar');
  const rows = document.querySelectorAll('#customer-table tbody tr');

  if (searchBar) {
    searchBar.addEventListener('input', () => {
      const query = searchBar.value.toLowerCase();
      rows.forEach(row => {
        const name = row.cells[0].innerText.toLowerCase();
        const email = row.cells[1].innerText.toLowerCase();
        row.style.display = name.includes(query) || email.includes(query) ? '' : 'none';
      });
    });
  }

  // ===== VIEW CUSTOMER DETAILS =====
  const viewButtons = document.querySelectorAll('.view-btn');
  const listSection = document.querySelector('.customer-list');
  const detailsSection = document.querySelector('.customer-details');

  if (viewButtons && listSection && detailsSection) {
    viewButtons.forEach(button => {
      button.addEventListener('click', () => {
        listSection.style.display = 'none';
        detailsSection.style.display = 'block';
      });
    });
  }

  // ===== FORM SUBMIT (EDIT) =====
  const editForm = document.getElementById('edit-form');
  if (editForm) {
    editForm.addEventListener('submit', event => {
      event.preventDefault();
      alert('✅ Customer details updated successfully!');
    });
  }

  // ===== SUBSCRIPTION MANAGEMENT =====
  const renewBtn = document.getElementById('renew-btn');
  const upgradeBtn = document.getElementById('upgrade-btn');
  const cancelBtn = document.getElementById('cancel-btn');

  if (renewBtn) {
    renewBtn.addEventListener('click', () => alert('🔁 Subscription Renewed!'));
  }
  if (upgradeBtn) {
    upgradeBtn.addEventListener('click', () => alert('⬆️ Subscription Upgraded!'));
  }
  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => alert('❌ Subscription Cancelled!'));
  }
});
