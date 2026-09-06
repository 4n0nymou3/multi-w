document.addEventListener('DOMContentLoaded', function() {
    var Utils = ProxyFetcher.Utils;
    var UI = ProxyFetcher.UI;

    UI.initInputSelection();
    UI.initFilter();
    UI.initLocationPicker();

    document.querySelectorAll('.ep-copy').forEach(function(button) {
        button.addEventListener('click', function() {
            var btn = this;
            var url = btn.getAttribute('data-url');

            if (!url) return;

            Utils.copyToClipboard(url, function(success) {
                if (success) {
                    UI.flashCopied(btn);
                    UI.toast('URL copied to clipboard');
                } else {
                    UI.toast('Failed to copy URL');
                }
            });
        });
    });
});