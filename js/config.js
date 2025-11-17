var ProxyFetcher = ProxyFetcher || {};

ProxyFetcher.Config = (function() {
    return {
        bootSequenceDuration: 3000,
        toastDuration: 3000,
        typingAnimationInterval: 2000,
        clockUpdateInterval: 1000,
        counterAnimationDuration: 2000,
        
        typingTexts: [
            'READY',
            'MONITORING',
            'FETCHING',
            'VALIDATING',
            'GEO-TAGGING',
            'TESTING (PASS 1)',
            'CONVERTING',
            'TESTING (PASS 2)',
            'FILTERING SECURE'
        ],
        
        consoleArt: {
            top: '╔═══════════════════════════════════════════════════════════════════╗',
            middle: '║                                                                   ║',
            title: '║           MULTI PROXY CONFIG FETCHER - TERMINAL ACCESS           ║',
            bottom: '╚═══════════════════════════════════════════════════════════════════╝'
        }
    };
})();
