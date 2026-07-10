/*!
 * Site scripts for James Bruce's site.
 * Each feature checks whether its elements exist, so this one file can load on
 * every page and simply do nothing on pages that don't use a given feature.
 */
window.addEventListener('DOMContentLoaded', function () {

    /* --- Navbar: hide on scroll down, reveal on scroll up ----------------
       Based on Start Bootstrap "Clean Blog" (MIT License). */
    (function () {
        var mainNav = document.getElementById('mainNav');
        if (!mainNav) return;
        var headerHeight = mainNav.clientHeight;
        var scrollPos = 0;
        window.addEventListener('scroll', function () {
            var currentTop = document.body.getBoundingClientRect().top * -1;
            if (currentTop < scrollPos) {
                // Scrolling up
                if (currentTop > 0 && mainNav.classList.contains('is-fixed')) {
                    mainNav.classList.add('is-visible');
                } else {
                    mainNav.classList.remove('is-visible', 'is-fixed');
                }
            } else {
                // Scrolling down
                mainNav.classList.remove('is-visible');
                if (currentTop > headerHeight && !mainNav.classList.contains('is-fixed')) {
                    mainNav.classList.add('is-fixed');
                }
            }
            scrollPos = currentTop;
        });
    })();

    /* --- Résumé: One-page / Full history toggle + PDF swap --------------- */
    (function () {
        var content = document.getElementById('resumeContent');
        if (!content) return;
        var buttons = document.querySelectorAll('.resume-toggle-btn');
        var download = document.getElementById('resumeDownload');
        var downloadLabel = document.getElementById('resumeDownloadLabel');

        buttons.forEach(function (btn) {
            btn.addEventListener('click', function () {
                var view = btn.getAttribute('data-view');
                content.setAttribute('data-resume-view', view);
                buttons.forEach(function (b) {
                    var isActive = b === btn;
                    b.classList.toggle('active', isActive);
                    b.setAttribute('aria-pressed', isActive ? 'true' : 'false');
                });
                if (download) {
                    var full = view === 'full';
                    download.setAttribute('href', download.getAttribute(full ? 'data-full' : 'data-short'));
                    if (downloadLabel) downloadLabel.textContent = full ? 'Download full PDF' : 'Download PDF';
                }
            });
        });
    })();

    /* --- Contact: submit via Formspree without leaving the page ---------- */
    (function () {
        var form = document.getElementById('contactForm');
        if (!form) return;
        var success = document.getElementById('formSuccess');
        var error = document.getElementById('formError');
        var button = form.querySelector('button[type="submit"]');

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            // The form has `novalidate` so we can style errors ourselves,
            // but we still enforce the native required/email checks here.
            if (!form.reportValidity()) return;
            error.style.display = 'none';
            button.disabled = true;
            button.textContent = 'Sending…';

            fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            }).then(function (response) {
                if (response.ok) {
                    form.style.display = 'none';
                    success.style.display = 'block';
                } else {
                    button.disabled = false;
                    button.textContent = 'Send message';
                    error.style.display = 'block';
                }
            }).catch(function () {
                button.disabled = false;
                button.textContent = 'Send message';
                error.style.display = 'block';
            });
        });
    })();

});
