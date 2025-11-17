document.addEventListener('DOMContentLoaded', function() {
    var Config = ProxyFetcher.Config;
    var Utils = ProxyFetcher.Utils;
    var UI = ProxyFetcher.UI;

    UI.showBootSequence(function() {
        UI.animateCounters();
    });

    UI.updateClock();
    setInterval(UI.updateClock, Config.clockUpdateInterval);

    UI.startTypingAnimation();
    UI.initIntersectionObserver();
    UI.initStatBoxHover();
    UI.initInputSelection();
    UI.printConsoleArt();

    function handleCopyButton(button) {
        var url = button.getAttribute('data-url');
        var originalHTML = button.innerHTML;
        
        button.disabled = true;
        
        Utils.copyToClipboard(url, function(success) {
            if (success) {
                button.innerHTML = '<i class="fas fa-check"></i><span>COPIED!</span>';
                button.style.background = 'linear-gradient(135deg, #00d9ff 0%, #00ff88 100%)';
                UI.showToast('URL copied to clipboard!', 'success');
            } else {
                button.innerHTML = '<i class="fas fa-times"></i><span>FAILED</span>';
                button.style.background = 'linear-gradient(135deg, #ff0055 0%, #ff5588 100%)';
                UI.showToast('Failed to copy URL', 'error');
            }
            
            setTimeout(function() {
                button.innerHTML = originalHTML;
                button.style.background = 'linear-gradient(135deg, var(--primary-green) 0%, var(--text-secondary) 100%)';
                button.disabled = false;
            }, 2000);
        });
    }

    document.querySelectorAll('.copy-btn').forEach(function(button) {
        button.addEventListener('click', function() {
            handleCopyButton(this);
        });
    });

    function filterEndpoints(category) {
        var endpoints = document.querySelectorAll('.endpoint-item');
        
        endpoints.forEach(function(endpoint) {
            if (category === 'all' || endpoint.getAttribute('data-category') === category) {
                endpoint.style.display = 'block';
                endpoint.style.animation = 'fadeInContent 0.4s ease-out';
            } else {
                endpoint.style.display = 'none';
            }
        });
    }

    document.querySelectorAll('.filter-btn').forEach(function(button) {
        button.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(function(btn) {
                btn.classList.remove('active');
            });
            
            this.classList.add('active');
            
            var filter = this.getAttribute('data-filter');
            filterEndpoints(filter);
        });
    });

    var resizeHandler = Utils.debounce(function() {
        console.log('Window resized');
    }, 250);

    window.addEventListener('resize', resizeHandler);
});