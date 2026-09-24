window.initSiteUI = function () {
  var hamburger = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobileMenu');
  var overlay = document.getElementById('overlay');

  function toggleMenu() {
    if (!hamburger || !mobileMenu) return;
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    if (overlay) overlay.classList.toggle('show');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  }

  if (hamburger && !hamburger.dataset.bound) {
    hamburger.dataset.bound = '1';
    hamburger.addEventListener('click', toggleMenu);
  }
  if (overlay && !overlay.dataset.bound) {
    overlay.dataset.bound = '1';
    overlay.addEventListener('click', toggleMenu);
  }

  document.querySelectorAll('.nav-item[data-dropdown]').forEach(function (item) {
    var btn = item.querySelector('button');
    if (!btn || btn.dataset.bound) return;
    btn.dataset.bound = '1';
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.nav-item.open').forEach(function (i) { i.classList.remove('open'); });
      if (!isOpen) item.classList.add('open');
    });
  });

  if (!document.body.dataset.dropdownClose) {
    document.body.dataset.dropdownClose = '1';
    document.addEventListener('click', function () {
      document.querySelectorAll('.nav-item.open').forEach(function (i) { i.classList.remove('open'); });
    });
  }

  document.querySelectorAll('.mobile-accordion .acc-btn').forEach(function (btn) {
    if (btn.dataset.bound) return;
    btn.dataset.bound = '1';
    btn.addEventListener('click', function () {
      var parent = btn.parentElement;
      var wasOpen = parent.classList.contains('open');
      document.querySelectorAll('.mobile-accordion.open').forEach(function (a) { a.classList.remove('open'); });
      if (!wasOpen) parent.classList.add('open');
    });
  });
};

document.addEventListener('DOMContentLoaded', function () {
  // اگر partialها همین‌جا اینلاین باشند
  if (document.getElementById('hamburger')) {
    window.initSiteUI();
  }
});
