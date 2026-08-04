var ProxyFetcher = ProxyFetcher || {};

ProxyFetcher.UI = (function() {
    var Config = ProxyFetcher.Config;
    var toastHideTimer = null;
    var toastResetTimer = null;

    function toast(msg) {
        var el = document.getElementById('toast');
        if (!el) return;
        clearTimeout(toastHideTimer);
        clearTimeout(toastResetTimer);
        el.classList.remove('show');
        el.classList.remove('is-visible');
        void el.offsetWidth;
        el.textContent = msg;
        el.classList.add('is-visible');
        requestAnimationFrame(function() {
            requestAnimationFrame(function() {
                el.classList.add('show');
            });
        });
        toastHideTimer = setTimeout(function() {
            el.classList.remove('show');
            toastResetTimer = setTimeout(function() {
                el.classList.remove('is-visible');
            }, 400);
        }, Config.toastDuration);
    }

    function flashCopied(btn) {
        if (!btn) return;
        if (btn.dataset.flashing === '1') return;
        var original = btn.innerHTML;
        btn.dataset.flashing = '1';
        btn.innerHTML = '<svg class="chk-ico" viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8.5l3 3 7-7"/></svg>';
        btn.classList.add('copied-pop', 'is-copied');
        setTimeout(function() {
            btn.innerHTML = original;
            btn.classList.remove('copied-pop', 'is-copied');
            btn.dataset.flashing = '0';
        }, 1500);
    }

    function initInputSelection() {
        document.querySelectorAll('.url-input').forEach(function(input) {
            input.addEventListener('click', function() {
                this.select();
            });
        });
    }

    function initFilter() {
        var filterButtons = document.querySelectorAll('.filter-btn');
        var sections = document.querySelectorAll('.sec[data-category]');

        filterButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                filterButtons.forEach(function(btn) {
                    btn.classList.remove('active');
                });
                this.classList.add('active');

                var filter = this.getAttribute('data-filter');
                sections.forEach(function(section) {
                    if (filter === 'all' || section.getAttribute('data-category') === filter) {
                        section.style.display = '';
                    } else {
                        section.style.display = 'none';
                    }
                });
            });
        });
    }

    return {
        toast: toast,
        flashCopied: flashCopied,
        initInputSelection: initInputSelection,
        initFilter: initFilter
    };
})();