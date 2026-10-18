/* ============================================
   MEMBER 1 - Landing Page JavaScript
   File: js/landing.js
   Page: index.html
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ---- Navbar scroll effect ----
  const nav = document.getElementById('main-nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        nav.style.background = 'rgba(15, 15, 26, 0.95)';
        nav.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
      } else {
        nav.style.background = 'rgba(15, 15, 26, 0.8)';
        nav.style.boxShadow = 'none';
      }
    });
  }

  // ---- Smooth scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---- Animate elements on scroll ----
  var animatedElements = document.querySelectorAll('.feature-card, .step-item, .cta-card');
  
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  animatedElements.forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
  });

  // ---- Mockup task hover interaction ----
  document.querySelectorAll('.mockup-task').forEach(function (task) {
    task.addEventListener('click', function () {
      var checkbox = this.querySelector('.mockup-checkbox');
      if (checkbox) {
        checkbox.classList.toggle('done');
        this.classList.toggle('completed');
      }
    });
  });

});
