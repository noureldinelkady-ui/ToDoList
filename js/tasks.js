/* ============================================
   MEMBER 4 - Task Management JavaScript
   File: js/tasks.js
   Pages: add-task.html, categories.html
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ---- Mobile Sidebar Toggle ----
  var menuBtn = document.getElementById('mobile-menu-btn');
  var sidebar = document.getElementById('sidebar');

  if (menuBtn && sidebar) {
    menuBtn.addEventListener('click', function () {
      sidebar.classList.toggle('open');
    });
    document.addEventListener('click', function (e) {
      if (sidebar.classList.contains('open') && !sidebar.contains(e.target) && e.target !== menuBtn) {
        sidebar.classList.remove('open');
      }
    });
  }

  // ---- Priority Selector ----
  var priorityOptions = document.querySelectorAll('.priority-option');
  priorityOptions.forEach(function (option) {
    option.addEventListener('click', function () {
      // Remove selected from all
      priorityOptions.forEach(function (opt) {
        opt.classList.remove('selected', 'high', 'medium', 'low');
      });
      // Add selected to clicked one
      var radio = this.querySelector('input[type="radio"]');
      if (radio) {
        radio.checked = true;
        this.classList.add('selected', radio.value);
      }
    });
  });

  // ---- Category Chip Selector ----
  var categoryChips = document.querySelectorAll('.category-chip');
  categoryChips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      categoryChips.forEach(function (c) { c.classList.remove('selected'); });
      this.classList.add('selected');
    });
  });

  // ---- Toggle Switch ----
  var toggleSwitches = document.querySelectorAll('.toggle-switch');
  toggleSwitches.forEach(function (toggle) {
    toggle.addEventListener('click', function () {
      this.classList.toggle('active');
    });
  });

  // ---- Add Task Form Submission ----
  var addTaskForm = document.getElementById('add-task-form');
  if (addTaskForm) {
    addTaskForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var title = document.getElementById('task-title');
      var deadline = document.getElementById('task-deadline');

      if (!title.value.trim()) {
        showToast('Please enter a task title', 'error');
        title.focus();
        return;
      }
      if (!deadline.value) {
        showToast('Please set a deadline', 'error');
        deadline.focus();
        return;
      }

      showToast('Task created successfully! 🎉', 'success');

      // Redirect after short delay
      setTimeout(function () {
        window.location.href = 'dashboard.html';
      }, 1500);
    });

    // ---- Clear Form Button ----
    addTaskForm.addEventListener('reset', function () {
      setTimeout(function () {
        priorityOptions.forEach(function (opt) {
          opt.classList.remove('selected', 'high', 'medium', 'low');
        });
        if (priorityOptions[0]) {
          priorityOptions[0].classList.add('selected', 'high');
        }
      }, 10);
      showToast('Form cleared', 'info');
    });
  }

  // ---- Set Default Date to Tomorrow ----
  var deadlineInput = document.getElementById('task-deadline');
  if (deadlineInput && !deadlineInput.value) {
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    deadlineInput.value = tomorrow.toISOString().split('T')[0];
  }

  // ============================================
  // CATEGORIES PAGE
  // ============================================

  // ---- Category Checkboxes ----
  document.querySelectorAll('.ct-checkbox').forEach(function (checkbox) {
    checkbox.addEventListener('click', function () {
      this.classList.toggle('checked');
      var item = this.closest('.category-task-item');
      if (item) {
        var title = item.querySelector('.ct-title');
        if (title) {
          if (this.classList.contains('checked')) {
            title.style.textDecoration = 'line-through';
            title.style.color = 'var(--text-muted)';
          } else {
            title.style.textDecoration = 'none';
            title.style.color = '';
          }
        }
      }
    });
  });

  // ---- Add Category Card Click ----
  var addCategoryCard = document.querySelector('.add-category-card');
  if (addCategoryCard) {
    addCategoryCard.addEventListener('click', function () {
      var name = prompt('Enter category name:');
      if (name && name.trim()) {
        showToast('Category "' + name.trim() + '" created! 📁', 'success');
      }
    });
  }

  // ---- Category Delete ----
  document.querySelectorAll('.cat-action-btn').forEach(function (btn) {
    if (btn.title === 'Delete') {
      btn.addEventListener('click', function () {
        var card = this.closest('.category-card');
        if (card) {
          card.style.transform = 'scale(0.9)';
          card.style.opacity = '0';
          card.style.transition = 'all 0.3s ease-out';
          setTimeout(function () {
            card.remove();
            showToast('Category deleted', 'error');
          }, 300);
        }
      });
    }
  });

  // ---- Toast Helper ----
  function showToast(message, type) {
    var existing = document.querySelector('.toast');
    if (existing) existing.remove();

    var toast = document.createElement('div');
    toast.className = 'toast';
    var iconText = type === 'error' ? '❌' : type === 'success' ? '✅' : 'ℹ️';
    toast.innerHTML = '<span style="font-size:20px;">' + iconText + '</span><span style="font-size:0.875rem;font-weight:500;">' + message + '</span>';
    document.body.appendChild(toast);

    setTimeout(function () { toast.classList.add('show'); }, 50);
    setTimeout(function () {
      toast.classList.remove('show');
      setTimeout(function () { toast.remove(); }, 300);
    }, 3000);
  }

});
