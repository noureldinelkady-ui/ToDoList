/* ============================================
   MEMBER 2 - Authentication JavaScript
   File: js/auth.js
   Pages: login.html, register.html
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ---- Password Visibility Toggle ----
  document.querySelectorAll('.password-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var input = this.parentElement.querySelector('.form-input');
      if (input) {
        if (input.type === 'password') {
          input.type = 'text';
          this.textContent = '🙈';
        } else {
          input.type = 'password';
          this.textContent = '👁';
        }
      }
    });
  });

  // ---- Password Strength Meter (Register page) ----
  var passwordInput = document.getElementById('reg-password');
  var strengthBars = document.querySelectorAll('.strength-bar');
  var strengthText = document.querySelector('.strength-text');

  if (passwordInput && strengthBars.length > 0) {
    passwordInput.addEventListener('input', function () {
      var val = this.value;
      var score = 0;

      if (val.length >= 6) score++;
      if (val.length >= 10) score++;
      if (/[A-Z]/.test(val)) score++;
      if (/[0-9]/.test(val)) score++;
      if (/[^A-Za-z0-9]/.test(val)) score++;

      // Reset all bars
      strengthBars.forEach(function (bar) {
        bar.className = 'strength-bar';
      });

      var level = '';
      var text = '';

      if (val.length === 0) {
        text = '';
      } else if (score <= 1) {
        level = 'weak';
        text = 'Weak — add numbers and uppercase letters';
      } else if (score <= 3) {
        level = 'medium';
        text = 'Medium — add special characters';
      } else {
        level = 'strong';
        text = 'Strong password!';
      }

      var activeBars = score <= 1 ? 1 : score <= 3 ? 2 : score <= 4 ? 3 : 4;
      for (var i = 0; i < activeBars && i < strengthBars.length; i++) {
        strengthBars[i].classList.add('active', level);
      }

      if (strengthText) {
        strengthText.textContent = text;
        strengthText.style.color = level === 'weak' ? '#f43f5e' : level === 'medium' ? '#fbbf24' : '#34d399';
      }
    });
  }

  // ---- Confirm Password Match ----
  var confirmInput = document.getElementById('reg-confirm');
  if (confirmInput && passwordInput) {
    confirmInput.addEventListener('input', function () {
      if (this.value && this.value !== passwordInput.value) {
        this.style.borderColor = '#f43f5e';
      } else if (this.value) {
        this.style.borderColor = '#34d399';
      } else {
        this.style.borderColor = '';
      }
    });
  }

  // ---- Input Focus Animation ----
  document.querySelectorAll('.auth-form .form-input').forEach(function (input) {
    input.addEventListener('focus', function () {
      var icon = this.parentElement.querySelector('.input-icon');
      if (icon) icon.style.color = '#818cf8';
    });
    input.addEventListener('blur', function () {
      var icon = this.parentElement.querySelector('.input-icon');
      if (icon) icon.style.color = '';
    });
  });

  // ---- Show toast on form submit ----
  var loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      var email = document.getElementById('login-email');
      var pass = document.getElementById('login-password');
      if (!email.value || !pass.value) {
        e.preventDefault();
        showToast('Please fill in all fields', 'error');
      }
    });
  }

  var registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', function (e) {
      var pass = document.getElementById('reg-password');
      var confirm = document.getElementById('reg-confirm');
      var terms = document.getElementById('terms');

      if (pass && confirm && pass.value !== confirm.value) {
        e.preventDefault();
        showToast('Passwords do not match', 'error');
        return;
      }
      if (terms && !terms.checked) {
        e.preventDefault();
        showToast('Please accept the Terms of Service', 'error');
        return;
      }
    });
  }

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
