document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        document.getElementById('bootSequence').style.display = 'none';
        document.getElementById('mainContent').style.display = 'block';
    }, 3000);

    updateTime();
    setInterval(updateTime, 1000);

    startTypingAnimation();
});

function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    document.getElementById('currentTime').textContent = timeString;
}

function startTypingAnimation() {
    const texts = [
        'READY',
        'MONITORING',
        'ACTIVE',
        'FETCHING',
        'TESTING',
        'VALIDATING'
    ];
    let currentIndex = 0;
    const typingElement = document.getElementById('typing');

    setInterval(function() {
        typingElement.textContent = texts[currentIndex];
        currentIndex = (currentIndex + 1) % texts.length;
    }, 2000);
}

function copyToClipboard(button) {
    const urlInput = button.previousElementSibling;
    const url = urlInput.value;

    navigator.clipboard.writeText(url).then(function() {
        const originalHTML = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i><span>COPIED!</span>';
        button.style.background = 'linear-gradient(135deg, #00d9ff 0%, #00ff88 100%)';
        
        showToast();

        setTimeout(function() {
            button.innerHTML = originalHTML;
            button.style.background = 'linear-gradient(135deg, var(--primary-green) 0%, var(--text-secondary) 100%)';
        }, 2000);
    }).catch(function(err) {
        console.error('Failed to copy:', err);
        button.innerHTML = '<i class="fas fa-times"></i><span>FAILED</span>';
        button.style.background = 'linear-gradient(135deg, #ff0055 0%, #ff5588 100%)';
        
        setTimeout(function() {
            button.innerHTML = '<i class="fas fa-copy"></i><span>COPY</span>';
            button.style.background = 'linear-gradient(135deg, var(--primary-green) 0%, var(--text-secondary) 100%)';
        }, 2000);
    });
}

function showToast() {
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    
    setTimeout(function() {
        toast.classList.remove('show');
    }, 3000);
}

document.querySelectorAll('.url-input').forEach(function(input) {
    input.addEventListener('click', function() {
        this.select();
    });
});

document.querySelectorAll('.stat-box').forEach(function(box) {
    box.addEventListener('mouseenter', function() {
        this.style.borderColor = 'var(--accent-blue)';
    });
    
    box.addEventListener('mouseleave', function() {
        this.style.borderColor = 'var(--border-color)';
    });
});

const observer = new IntersectionObserver(function(entries) {
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

console.log('%c╔═══════════════════════════════════════════════════════════════════╗', 'color: #00ff41; font-family: monospace;');
console.log('%c║                                                                   ║', 'color: #00ff41; font-family: monospace;');
console.log('%c║           MULTI PROXY CONFIG FETCHER - TERMINAL ACCESS           ║', 'color: #00ff41; font-family: monospace; font-weight: bold;');
console.log('%c║                                                                   ║', 'color: #00ff41; font-family: monospace;');
console.log('%c║  [✓] System initialized                                          ║', 'color: #00ff41; font-family: monospace;');
console.log('%c║  [✓] Protocol handlers loaded                                    ║', 'color: #00ff41; font-family: monospace;');
console.log('%c║  [✓] Real-time monitoring active                                 ║', 'color: #00ff41; font-family: monospace;');
console.log('%c║                                                                   ║', 'color: #00ff41; font-family: monospace;');
console.log('%c║  Designed by: Anonymous                                          ║', 'color: #00d9ff; font-family: monospace; font-weight: bold;');
console.log('%c║  Repository: github.com/4n0nymou3/multi-proxy-config-fetcher     ║', 'color: #bd00ff; font-family: monospace;');
console.log('%c║                                                                   ║', 'color: #00ff41; font-family: monospace;');
console.log('%c╚═══════════════════════════════════════════════════════════════════╝', 'color: #00ff41; font-family: monospace;');