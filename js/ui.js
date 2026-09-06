var ProxyFetcher = ProxyFetcher || {};

ProxyFetcher.UI = (function() {
    var Config = ProxyFetcher.Config;
    var toastHideTimer = null;
    var toastResetTimer = null;
    var activeChip = null;

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

    function buildLocationUrl(code) {
        return Config.locationBaseUrl + code + '/proxy_configs.txt';
    }

    function selectCountry(country, chip) {
        var placeholder = document.getElementById('locPlaceholder');
        var result = document.getElementById('locResult');
        var flagEl = document.getElementById('locResultFlag');
        var nameEl = document.getElementById('locResultName');
        var codeEl = document.getElementById('locResultCode');
        var input = document.getElementById('locUrlInput');
        var copyBtn = document.getElementById('locCopyBtn');

        if (!result || !input) return;

        if (activeChip) {
            activeChip.classList.remove('active');
        }
        chip.classList.add('active');
        activeChip = chip;

        var url = buildLocationUrl(country.code);

        flagEl.textContent = country.flag;
        nameEl.textContent = country.name;
        codeEl.textContent = country.code;
        input.value = url;
        copyBtn.setAttribute('data-url', url);

        if (placeholder) placeholder.style.display = 'none';
        result.classList.add('is-visible');
    }

    function initLocationPicker() {
        var grid = document.getElementById('flagGrid');
        if (!grid || !Config.countries) return;

        Config.countries.forEach(function(country) {
            var chip = document.createElement('button');
            chip.type = 'button';
            chip.className = 'flag-chip';
            chip.setAttribute('data-code', country.code);
            chip.setAttribute('aria-label', country.name);
            chip.innerHTML =
                '<span class="fc-emoji">' + country.flag + '</span>' +
                '<span class="fc-code">' + country.code + '</span>';

            chip.addEventListener('click', function() {
                selectCountry(country, chip);
            });

            grid.appendChild(chip);
        });
    }

    return {
        toast: toast,
        flashCopied: flashCopied,
        initInputSelection: initInputSelection,
        initFilter: initFilter,
        initLocationPicker: initLocationPicker
    };
})();