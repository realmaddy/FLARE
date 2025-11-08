document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  // ======= LOAD SAVED THEME =======
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    if (themeToggle) themeToggle.checked = true;
  } else {
    body.classList.remove('dark-mode');
  }

  // ======= SWITCH THEME & SAVE =======
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

  // ======= TOGGLE "ADD NEW CHANNEL" FORM =======
  const addBtn = document.querySelector('.add-channel-btn');
  const form = document.querySelector('.new-channel-form');

  if (addBtn && form) {
    // إظهار/إخفاء النموذج
    addBtn.addEventListener('click', () => {
      form.style.display = form.style.display === 'none' || !form.style.display ? 'flex' : 'none';
    });

    // معالجة الإرسال
    form.addEventListener('submit', e => {
      e.preventDefault();

      const name = document.getElementById('channel-name').value.trim();
      const category = document.getElementById('channel-category').value.trim();
      const viewers = document.getElementById('channel-viewers').value.trim();
      const quality = document.getElementById('channel-quality').value.trim();

      if (name && category && viewers && quality) {
        const grid = document.querySelector('.channels-grid');
        const card = document.createElement('div');
        card.className = 'channel-card';

        card.innerHTML = `
          <div class="channel-header">
            <h3>${name}</h3>
            <span class="channel-status status-active">Active</span>
          </div>
          <p>Category: ${category}</p>
          <p>Viewers: ${viewers}</p>
          <p>Quality: ${quality}</p>
          <div class="channel-actions">
            <button class="action-btn edit-btn">Edit</button>
            <button class="action-btn delete-btn">Delete</button>
          </div>
        `;

        // إدراج البطاقة قبل الزر
        grid.insertBefore(card, document.querySelector('.add-new-channel'));
        form.reset();
        form.style.display = 'none';
      }
    });
  }
});
