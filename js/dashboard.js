/* ============================================
   MEMBER 3 - Dashboard JavaScript
   File: js/dashboard.js
   Page: dashboard.html
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ---- Mobile Sidebar Toggle ----
  var menuBtn = document.getElementById('mobile-menu-btn');
  var sidebar = document.getElementById('sidebar');

  if (menuBtn && sidebar) {
    menuBtn.addEventListener('click', function () {
      sidebar.classList.toggle('open');
    });
    // Close sidebar when clicking outside
    document.addEventListener('click', function (e) {
      if (sidebar.classList.contains('open') && !sidebar.contains(e.target) && e.target !== menuBtn) {
        sidebar.classList.remove('open');
      }
    });
  }

  // ---- Task Checkbox Toggle ----
  document.querySelectorAll('.task-checkbox').forEach(function (checkbox) {
    checkbox.addEventListener('click', function (e) {
      e.stopPropagation();
      this.classList.toggle('checked');
      var card = this.closest('.task-card');
      if (card) {
        card.classList.toggle('completed');
      }
      updateStats();
      showToast(this.classList.contains('checked') ? 'Task completed! ✅' : 'Task reopened', 'success');
    });
  });

  // ---- Filter Chips ----
  var filterChips = document.querySelectorAll('.filter-chip');
  var taskCards = document.querySelectorAll('.task-card');

  filterChips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      // Remove active from all
      filterChips.forEach(function (c) { c.classList.remove('active'); });
      this.classList.add('active');

      var filter = this.textContent.trim().toLowerCase();

      taskCards.forEach(function (card) {
        var badges = card.querySelectorAll('.badge');
        var badgeTexts = [];
        badges.forEach(function (b) { badgeTexts.push(b.textContent.trim().toLowerCase()); });

        if (filter === 'all tasks') {
          card.style.display = 'flex';
        } else if (filter.includes('high')) {
          card.style.display = badgeTexts.includes('high') ? 'flex' : 'none';
        } else if (filter.includes('medium')) {
          card.style.display = (badgeTexts.includes('medium') || badgeTexts.includes('med')) ? 'flex' : 'none';
        } else if (filter.includes('low')) {
          card.style.display = badgeTexts.includes('low') ? 'flex' : 'none';
        } else if (filter.includes('work')) {
          card.style.display = badgeTexts.includes('work') ? 'flex' : 'none';
        } else if (filter.includes('personal')) {
          card.style.display = badgeTexts.includes('personal') ? 'flex' : 'none';
        } else if (filter.includes('school')) {
          card.style.display = badgeTexts.includes('school') ? 'flex' : 'none';
        } else {
          card.style.display = 'flex';
        }
      });

      // Update count
      var visible = document.querySelectorAll('.task-card[style*="flex"], .task-card:not([style])');
      var countEl = document.querySelector('.section-count');
      if (countEl) {
        var count = 0;
        taskCards.forEach(function (c) {
          if (c.style.display !== 'none') count++;
        });
        countEl.textContent = '(' + count + ' tasks)';
      }
    });
  });

  // ---- Search Tasks ----
  var searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      var query = this.value.toLowerCase();
      taskCards.forEach(function (card) {
        var title = card.querySelector('.task-title');
        var desc = card.querySelector('.task-description');
        var text = '';
        if (title) text += title.textContent.toLowerCase();
        if (desc) text += ' ' + desc.textContent.toLowerCase();

        card.style.display = text.includes(query) ? 'flex' : 'none';
      });
    });
  }

  // ---- Delete Task ----
  document.querySelectorAll('.task-action-btn.delete').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var card = this.closest('.task-card');
      if (card) {
        card.style.transform = 'translateX(100px)';
        card.style.opacity = '0';
        card.style.transition = 'all 0.3s ease-out';
        setTimeout(function () {
          card.remove();
          updateStats();
          showToast('Task deleted', 'error');
        }, 300);
      }
    });
  });

  // ---- Edit Task (navigate to add-task) ----
  document.querySelectorAll('.task-action-btn:not(.delete)').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      showToast('Redirecting to edit...', 'info');
      setTimeout(function () {
        window.location.href = 'add-task.html';
      }, 500);
    });
  });

  // ---- Notification Button ----
  var notifBtn = document.getElementById('notif-btn');
  if (notifBtn) {
    notifBtn.addEventListener('click', function () {
      var dot = this.querySelector('.notif-dot');
      if (dot) {
        dot.style.display = dot.style.display === 'none' ? 'block' : 'none';
      }
      showToast('🔔 You have 3 upcoming deadlines', 'info');
    });
  }

  // ---- Update Stats Dynamically ----
  function updateStats() {
    var allCards = document.querySelectorAll('.task-card');
    var completed = document.querySelectorAll('.task-card.completed');
    var total = allCards.length;
    var done = completed.length;
    var inProgress = total - done;

    var overdue = 0;
    allCards.forEach(function (card) {
      var deadline = card.querySelector('.task-deadline.overdue');
      if (deadline && !card.classList.contains('completed')) overdue++;
    });

    var statValues = document.querySelectorAll('.stat-value');
    if (statValues.length >= 4) {
      statValues[0].textContent = total;
      statValues[1].textContent = done;
      statValues[2].textContent = inProgress;
      statValues[3].textContent = overdue;
    }
  }

  // ---- Toast Helper ----
  function showToast(message, type) {
    var existing = document.querySelector('.toast');
    if (existing) existing.remove();

    var toast = document.createElement('div');
    toast.className = 'toast';
    var iconText = type === 'error' ? '🗑️' : type === 'success' ? '✅' : 'ℹ️';
    toast.innerHTML = '<span style="font-size:20px;">' + iconText + '</span><span style="font-size:0.875rem;font-weight:500;">' + message + '</span>';
    document.body.appendChild(toast);

    setTimeout(function () { toast.classList.add('show'); }, 50);
    setTimeout(function () {
      toast.classList.remove('show');
      setTimeout(function () { toast.remove(); }, 300);
    }, 3000);
  }

});
