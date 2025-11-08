document.addEventListener('DOMContentLoaded', () => {
  // ===== DARK MODE SYSTEM =====
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  const savedTheme = localStorage.getItem('theme') || 'light';
  const isDark = savedTheme === 'dark';
  body.classList.toggle('dark-mode', isDark);
  if (themeToggle) themeToggle.checked = isDark;

  if (themeToggle) {
    themeToggle.addEventListener('change', () => {
      const dark = themeToggle.checked;
      body.classList.toggle('dark-mode', dark);
      localStorage.setItem('theme', dark ? 'dark' : 'light');
    });
  }

  // ===== GENERAL SETTINGS FORM =====
  const generalForm = document.getElementById('general-settings-form');
  if (generalForm) {
    generalForm.addEventListener('submit', e => {
      e.preventDefault();
      alert('✅ General settings updated successfully!');
    });
  }

  // ===== NOTIFICATION SETTINGS FORM =====
  const notificationForm = document.getElementById('notification-settings-form');
  if (notificationForm) {
    notificationForm.addEventListener('submit', e => {
      e.preventDefault();
      alert('🔔 Notification settings saved!');
    });
  }

  // ===== PAYMENT SETTINGS FORM =====
  const paymentForm = document.getElementById('payment-settings-form');
  if (paymentForm) {
    paymentForm.addEventListener('submit', e => {
      e.preventDefault();
      alert('💳 Payment settings updated!');
    });
  }
});
