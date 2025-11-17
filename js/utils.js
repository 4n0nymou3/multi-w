var ProxyFetcher = ProxyFetcher || {};

ProxyFetcher.Utils = (function() {
    function copyToClipboard(text, callback) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text)
                .then(function() {
                    if (callback) callback(true);
                })
                .catch(function(err) {
                    console.error('Failed to copy:', err);
                    if (callback) callback(false);
                });
        } else {
            fallbackCopy(text, callback);
        }
    }

    function fallbackCopy(text, callback) {
        var textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.select();
        
        try {
            document.execCommand('copy');
            if (callback) callback(true);
        } catch (err) {
            console.error('Failed to copy:', err);
            if (callback) callback(false);
        }
        
        document.body.removeChild(textArea);
    }

    function formatTime(date) {
        var hours = String(date.getHours()).padStart(2, '0');
        var minutes = String(date.getMinutes()).padStart(2, '0');
        var seconds = String(date.getSeconds()).padStart(2, '0');
        return hours + ':' + minutes + ':' + seconds;
    }

    function animateCounter(element, target, duration) {
        var start = 0;
        var range = target - start;
        var increment = range / (duration / 16);
        var current = start;

        var timer = setInterval(function() {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    }

    function debounce(func, wait) {
        var timeout;
        return function() {
            var context = this;
            var args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(function() {
                func.apply(context, args);
            }, wait);
        };
    }

    return {
        copyToClipboard: copyToClipboard,
        formatTime: formatTime,
        animateCounter: animateCounter,
        debounce: debounce
    };
})();