// Smooth scrolling for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Update active state
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        
        // Smooth scroll to section
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Update active nav link on scroll
const sections = document.querySelectorAll('.section, .hero');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNavOnScroll() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavOnScroll);

// Animated counter for stats
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Trigger counter animation when stats come into view
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = stat.getAttribute('data-target');
                if (target === '∞') {
                    stat.textContent = '∞';
                } else {
                    animateCounter(stat, parseInt(target));
                }
            });
        }
    });
}, observerOptions);

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        const scrolled = window.scrollY;
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Button interactions
const ctaButtons = document.querySelectorAll('.cta-button');
ctaButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Create ripple effect
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.animation = 'ripple 0.6s ease-out';
        
        button.style.position = 'relative';
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
        
        // Simulate action with alert
        setTimeout(() => {
            alert('Thank you for your interest in CONVERGENCE™. Your application for participation has been received and is being processed through our proprietary selection algorithm. We will reach out if you demonstrate sufficient alignment with our core values and engagement metrics.');
        }, 300);
    });
});

// Add ripple animation style
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        from {
            transform: scale(0);
            opacity: 1;
        }
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Glitch effect on hover for main title (subtle)
const glitchTitle = document.querySelector('.glitch');
if (glitchTitle) {
    glitchTitle.addEventListener('mouseenter', () => {
        glitchTitle.style.animation = 'glitch 0.3s ease';
    });
    
    glitchTitle.addEventListener('animationend', () => {
        glitchTitle.style.animation = '';
    });
}

// Add glitch animation
const glitchStyle = document.createElement('style');
glitchStyle.textContent = `
    @keyframes glitch {
        0% {
            transform: translate(0);
        }
        20% {
            transform: translate(-2px, 2px);
        }
        40% {
            transform: translate(-2px, -2px);
        }
        60% {
            transform: translate(2px, 2px);
        }
        80% {
            transform: translate(2px, -2px);
        }
        100% {
            transform: translate(0);
        }
    }
`;
document.head.appendChild(glitchStyle);

// Fade in elements on scroll
const fadeElements = document.querySelectorAll('.content-block, .framework-card, .ecosystem-item, .impact-card');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
            
            fadeObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

fadeElements.forEach(element => {
    fadeObserver.observe(element);
});

// Add staggered delay to grid items
document.querySelectorAll('.framework-grid .framework-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

document.querySelectorAll('.impact-grid .impact-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

// Easter egg: Konami code
let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    alert('🎮 ACHIEVEMENT UNLOCKED: You have discovered the hidden synergy multiplier! Your engagement metrics have been elevated to ULTRA-CONVERGENCE™ status. Welcome to the inner circle.');
    
    // Add rainbow effect to title
    const title = document.querySelector('.hero h1');
    if (title) {
        title.style.animation = 'rainbow 2s linear infinite';
    }
    
    const rainbowStyle = document.createElement('style');
    rainbowStyle.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(rainbowStyle);
}

// Random buzzword generator (click on logo multiple times)
let logoClickCount = 0;
const logo = document.querySelector('.logo');
const buzzwords = [
    'SYNERGIZING',
    'OPTIMIZING',
    'DISRUPTING',
    'REVOLUTIONIZING',
    'TRANSFORMING',
    'INNOVATING',
    'ACTUALIZING',
    'LEVERAGING',
    'SCALING',
    'AMPLIFYING'
];

if (logo) {
    logo.addEventListener('click', () => {
        logoClickCount++;
        if (logoClickCount >= 5) {
            const randomBuzzword = buzzwords[Math.floor(Math.random() * buzzwords.length)];
            logo.textContent = randomBuzzword + '™';
            
            setTimeout(() => {
                logo.textContent = 'CONVERGENCE™';
                logoClickCount = 0;
            }, 2000);
        }
    });
}

// Track "engagement metrics" (scroll depth)
let maxScrollDepth = 0;
window.addEventListener('scroll', () => {
    const scrollDepth = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
    if (scrollDepth > maxScrollDepth) {
        maxScrollDepth = scrollDepth;
    }
    
    // Log when user reaches bottom
    if (scrollDepth > 0.95 && !sessionStorage.getItem('fullEngagement')) {
        sessionStorage.setItem('fullEngagement', 'true');
        console.log('🎯 ENGAGEMENT METRIC ACHIEVED: Full scroll depth completed. Synergy level: MAXIMUM.');
    }
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    }
});

// Add hover sound effect simulation (visual feedback)
document.querySelectorAll('.framework-card, .content-block, .impact-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// Console message for curious developers
console.log('%c🚀 CONVERGENCE™ Framework Initialized', 'font-size: 20px; font-weight: bold; color: #00d4ff;');
console.log('%cYour engagement metrics are being tracked in real-time.', 'font-size: 12px; color: #888;');
console.log('%cSynergy Level: OPTIMAL', 'font-size: 12px; color: #00ff88;');
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #7c3aed;');
console.log('%cTip: Try the Konami code for a special surprise...', 'font-size: 10px; font-style: italic; color: #666;');

// Performance monitoring (fake, but looks impressive)
setTimeout(() => {
    console.log('%c⚡ Performance Metrics:', 'font-weight: bold; color: #00d4ff;');
    console.log(`  Engagement Score: ${(Math.random() * 10 + 90).toFixed(2)}%`);
    console.log(`  Synergy Index: ${(Math.random() * 2 + 8).toFixed(2)}/10`);
    console.log(`  Optimization Level: MAXIMUM`);
    console.log(`  Framework Efficiency: ${(Math.random() * 5 + 95).toFixed(2)}%`);
}, 3000);