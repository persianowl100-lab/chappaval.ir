/**
 * بارگذاری هدر، فوتر و سایر بخش‌های مشترک از فایل‌های جدا
 * برای GitHub Pages (سایت استاتیک)
 *
 * استفاده در هر صفحه:
 *   <div data-partial="partials/header.html"></div>
 *   ...
 *   <div data-partial="partials/footer.html"></div>
 *   <script src="assets/js/load-partials.js"></script>
 *   <script src="assets/js/main.js"></script>
 */
(function () {
  function resolvePath(rel) {
    // اگر صفحه در زیرپوشه باشد، مسیر را از ریشه سایت حساب می‌کنیم
    var base = document.querySelector('base');
    if (base && base.href) {
      return new URL(rel, base.href).pathname;
    }
    // پیش‌فرض: نسبت به مسیر فعلی
    try {
      return new URL(rel, window.location.href).href;
    } catch (e) {
      return rel;
    }
  }

  function loadOne(el) {
    var src = el.getAttribute('data-partial');
    if (!src) return Promise.resolve();
    return fetch(src, { cache: 'no-cache' })
      .then(function (res) {
        if (!res.ok) throw new Error('Partial not found: ' + src);
        return res.text();
      })
      .then(function (html) {
        el.outerHTML = html;
      })
      .catch(function (err) {
        console.error(err);
        el.innerHTML = '<!-- partial error: ' + src + ' -->';
      });
  }

  function initInteractions() {
    // بعد از تزریق هدر، اسکریپت اصلی تعاملات را دوباره صدا بزن
    if (typeof window.initSiteUI === 'function') {
      window.initSiteUI();
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    var nodes = Array.prototype.slice.call(document.querySelectorAll('[data-partial]'));
    Promise.all(nodes.map(loadOne)).then(initInteractions);
  });
})();
