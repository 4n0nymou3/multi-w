var ProxyFetcher = ProxyFetcher || {};

ProxyFetcher.Config = (function() {
    return {
        toastDuration: 2800,
        locationBaseUrl: 'https://raw.githubusercontent.com/4n0nymou3/multi-proxy-config-fetcher/refs/heads/main/configs/location/',
        countries: [
            { code: 'AT', name: 'Austria', flag: '🇦🇹' },
            { code: 'AU', name: 'Australia', flag: '🇦🇺' },
            { code: 'BE', name: 'Belgium', flag: '🇧🇪' },
            { code: 'CA', name: 'Canada', flag: '🇨🇦' },
            { code: 'CH', name: 'Switzerland', flag: '🇨🇭' },
            { code: 'CZ', name: 'Czechia', flag: '🇨🇿' },
            { code: 'DE', name: 'Germany', flag: '🇩🇪' },
            { code: 'DK', name: 'Denmark', flag: '🇩🇰' },
            { code: 'ES', name: 'Spain', flag: '🇪🇸' },
            { code: 'FR', name: 'France', flag: '🇫🇷' },
            { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
            { code: 'ID', name: 'Indonesia', flag: '🇮🇩' },
            { code: 'IE', name: 'Ireland', flag: '🇮🇪' },
            { code: 'IN', name: 'India', flag: '🇮🇳' },
            { code: 'IT', name: 'Italy', flag: '🇮🇹' },
            { code: 'JP', name: 'Japan', flag: '🇯🇵' },
            { code: 'LT', name: 'Lithuania', flag: '🇱🇹' },
            { code: 'NL', name: 'Netherlands', flag: '🇳🇱' },
            { code: 'NO', name: 'Norway', flag: '🇳🇴' },
            { code: 'PL', name: 'Poland', flag: '🇵🇱' },
            { code: 'RO', name: 'Romania', flag: '🇷🇴' },
            { code: 'RS', name: 'Serbia', flag: '🇷🇸' },
            { code: 'SE', name: 'Sweden', flag: '🇸🇪' },
            { code: 'SG', name: 'Singapore', flag: '🇸🇬' },
            { code: 'US', name: 'United States', flag: '🇺🇸' }
        ]
    };
})();