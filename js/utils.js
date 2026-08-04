var ProxyFetcher = ProxyFetcher || {};

ProxyFetcher.Utils = (function() {
    function copyToClipboard(text, callback) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text)
                .then(function() {
                    if (callback) callback(true);
                })
                .catch(function() {
                    fallbackCopy(text, callback);
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
            if (callback) callback(false);
        }

        document.body.removeChild(textArea);
    }

    return {
        copyToClipboard: copyToClipboard
    };
})();