var ProxyFetcher = ProxyFetcher || {};

ProxyFetcher.UI = (function() {
    var Config = ProxyFetcher.Config;
    var Utils = ProxyFetcher.Utils;

    function showBootSequence(callback) {
        setTimeout(function() {
            document.getElementById('bootSequence').style.display = 'none';
            document.getElementById('mainContent').style.display = 'block';
            if (callback) callback();
        }, Config.bootSequenceDuration);
    }

    function showToast(message, type) {
        var toast = document.getElementById('toast');
        var toastMessage = document.getElementById('toastMessage');
        var icon = toast.querySelector('i');
        
        toastMessage.textContent = message;
        
        icon.className = 'fas';
        toast.className = 'toast';
        
        if (type === 'success') {
            icon.className += ' fa-check-circle';
            toast.className += ' toast-success';
        } else if (type === 'error') {
            icon.className += ' fa-exclamation-circle';
            toast.className += ' toast-error';
        } else {
            icon.className += ' fa-info-circle';
            toast.className += ' toast-info';
        }
        
        toast.classList.add('show');
        
        setTimeout(function() {
            toast.classList.remove('show');
        }, Config.toastDuration);
    }

    function updateClock() {
        var timeElement = document.getElementById('currentTime');
        if (timeElement) {
            timeElement.textContent = Utils.formatTime(new Date());
        }
    }

    function startTypingAnimation() {
        var typingElement = document.getElementById('typing');
        if (!typingElement) return;
        
        var currentIndex = 0;
        
        setInterval(function() {
            typingElement.textContent = Config.typingTexts[currentIndex];
            currentIndex = (currentIndex + 1) % Config.typingTexts.length;
        }, Config.typingAnimationInterval);
    }

    function animateCounters() {
        var counters = document.querySelectorAll('.stat-number[data-count]');
        counters.forEach(function(counter) {
            var target = parseInt(counter.getAttribute('data-count'));
            Utils.animateCounter(counter, target, Config.counterAnimationDuration);
        });
    }

    function initIntersectionObserver() {
        if (!window.IntersectionObserver) return;
        
        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInContent 0.6s ease-out';
                }
            });
        }, {
            threshold: 0.1
        });

        document.querySelectorAll('.endpoint-item').forEach(function(item) {
            observer.observe(item);
        });
    }

    function initStatBoxHover() {
        document.querySelectorAll('.stat-box').forEach(function(box) {
            box.addEventListener('mouseenter', function() {
                this.style.borderColor = 'var(--accent-blue)';
            });
            
            box.addEventListener('mouseleave', function() {
                this.style.borderColor = 'var(--border-color)';
            });
        });
    }

    function initInputSelection() {
        document.querySelectorAll('.url-input').forEach(function(input) {
            input.addEventListener('click', function() {
                this.select();
            });
        });
    }

    function printConsoleArt() {
        var art = Config.consoleArt;
        console.log('%c' + art.top, 'color: #00ff41; font-family: monospace;');
        console.log('%c' + art.middle, 'color: #00ff41; font-family: monospace;');
        console.log('%c' + art.title, 'color: #00ff41; font-family: monospace; font-weight: bold;');
        console.log('%c' + art.middle, 'color: #00ff41; font-family: monospace;');
        console.log('%c║  [✓] System initialized                                          ║', 'color: #00ff41; font-family: monospace;');
        console.log('%c║  [✓] Protocol handlers loaded                                    ║', 'color: #00ff41; font-family: monospace;');
        console.log('%c║  [✓] Real-time monitoring active                                 ║', 'color: #00ff41; font-family: monospace;');
        console.log('%c' + art.middle, 'color: #00ff41; font-family: monospace;');
        console.log('%c║  Designed by: Anonymous                                          ║', 'color: #00d9ff; font-family: monospace; font-weight: bold;');
        console.log('%c║  Repository: github.com/4n0nymou3/multi-proxy-config-fetcher     ║', 'color: #bd00ff; font-family: monospace;');
        console.log('%c' + art.middle, 'color: #00ff41; font-family: monospace;');
        console.log('%c' + art.bottom, 'color: #00ff41; font-family: monospace;');
    }

    return {
        showBootSequence: showBootSequence,
        showToast: showToast,
        updateClock: updateClock,
        startTypingAnimation: startTypingAnimation,
        animateCounters: animateCounters,
        initIntersectionObserver: initIntersectionObserver,
        initStatBoxHover: initStatBoxHover,
        initInputSelection: initInputSelection,
        printConsoleArt: printConsoleArt
    };
})();