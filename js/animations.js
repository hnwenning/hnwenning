/**
 * Wenning Technology - Advanced Animations
 * Complex animation effects, parallax, scroll triggers
 */

// ========== DOM Ready ==========
document.addEventListener('DOMContentLoaded', function() {
    initializeAdvancedAnimations();
});

// ========== Main Animation Initialization ==========

/**
 * Initialize all advanced animation effects
 */
function initializeAdvancedAnimations() {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
        initializeParallaxEffect();
        initializeScrollAnimations();
        initializeHoverAnimations();
        initializeStaggeredAnimations();
    }
}

// ========== Parallax Effect ==========

/**
 * Initialize parallax scrolling effect
 */
function initializeParallaxEffect() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (parallaxElements.length === 0) return;
    
    window.addEventListener('scroll', throttle(() => {
        parallaxElements.forEach(element => {
            const scrollPosition = window.scrollY;
            const elementPosition = element.offsetTop;
            const elementHeight = element.offsetHeight;
            const windowHeight = window.innerHeight;
            
            // Only apply parallax if element is in viewport
            if (scrollPosition + windowHeight > elementPosition && scrollPosition < elementPosition + elementHeight) {
                const offset = (scrollPosition - elementPosition) * 0.5;
                element.style.transform = `translateY(${offset}px)`;
            }
        });
    }, 16)); // ~60fps
}

/**
 * Apply parallax effect to hero background
 */
function initializeHeroParallax() {
    const hero = document.querySelector('.hero');
    
    if (!hero) return;
    
    window.addEventListener('scroll', throttle(() => {
        const scrollPosition = window.scrollY;
        const parallaxStrength = 0.3;
        
        hero.style.backgroundPosition = `center ${scrollPosition * parallaxStrength}px`;
    }, 16));
}

// ========== Scroll-Triggered Animations ==========

/**
 * Initialize scroll-triggered animations using Intersection Observer
 */
function initializeScrollAnimations() {
    const animationTriggers = document.querySelectorAll(
        '.service-card, .faq-item, .service-detail-card, .stat-card, .info-card'
    );
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add stagger delay based on position
                const delay = index * 100;
                
                entry.target.style.animation = 'none';
                entry.target.offsetHeight; // Trigger reflow
                
                entry.target.style.animation = `fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms forwards`;
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    animationTriggers.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Animate service cards with stagger effect
 */
function animateServiceCardsOnLoad() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.animation = `slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards`;
        }, index * 100);
    });
}

// ========== Hover Animations ==========

/**
 * Initialize advanced hover animations
 */
function initializeHoverAnimations() {
    initializeServiceCardHovers();
    initializeButtonHovers();
    initializeNavLinkHovers();
}

/**
 * Add hover animations to service cards
 */
function initializeServiceCardHovers() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            this.style.transform = 'translateY(-15px) scale(1.02)';
            this.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 0 0 transparent';
        });
        
        // SVG icon animation on hover
        const svg = card.querySelector('svg');
        if (svg) {
            card.addEventListener('mouseenter', function() {
                svg.style.animation = 'pulse 2s ease-in-out infinite';
            });
            
            card.addEventListener('mouseleave', function() {
                svg.style.animation = 'none';
            });
        }
    });
}

/**
 * Add hover animations to buttons
 */
function initializeButtonHovers() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.letterSpacing = '1px';
            this.style.transform = 'scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.letterSpacing = '0.5px';
            this.style.transform = 'scale(1)';
        });
    });
}

/**
 * Add hover animations to navigation links
 */
function initializeNavLinkHovers() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.letterSpacing = '1px';
            this.style.transform = 'translateY(-2px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.letterSpacing = '0.5px';
            this.style.transform = 'translateY(0)';
        });
    });
}

// ========== Staggered Animations ==========

/**
 * Initialize staggered reveal animations
 */
function initializeStaggeredAnimations() {
    // Stagger FAQ items
    animateElementsWithStagger('.faq-item', 100);
    
    // Stagger info cards
    animateElementsWithStagger('.info-card', 80);
    
    // Stagger stat cards
    animateElementsWithStagger('.stat-card', 120);
}

/**
 * Animate elements with staggered timing
 * @param {string} selector - CSS selector for elements to animate
 * @param {number} staggerDelay - Delay between each element animation (ms)
 */
function animateElementsWithStagger(selector, staggerDelay = 100) {
    const elements = document.querySelectorAll(selector);
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const parent = entry.target.parentElement;
                const children = parent ? parent.querySelectorAll(selector) : [entry.target];
                
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.animation = `fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards`;
                    }, index * staggerDelay);
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// ========== Text Animations ==========

/**
 * Animate text characters with stagger effect
 * @param {HTMLElement} element - Element containing text to animate
 */
function animateTextCharacters(element) {
    if (!element) return;
    
    const text = element.textContent;
    element.textContent = '';
    
    text.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.display = 'inline-block';
        span.style.animation = `slideInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 50}ms forwards`;
        span.style.opacity = '0';
        element.appendChild(span);
    });
}

/**
 * Animate heading text on load
 */
function animateHeadingsOnLoad() {
    const headings = document.querySelectorAll('section h2');
    
    headings.forEach((heading, index) => {
        setTimeout(() => {
            heading.style.animation = `slideInDown 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards`;
        }, index * 200);
    });
}

// ========== Mouse Position Tracking ==========

/**
 * Initialize mouse position-based animations
 */
function initializeMouseTracking() {
    const trackedElements = document.querySelectorAll('[data-track-mouse]');
    
    if (trackedElements.length === 0) return;
    
    document.addEventListener('mousemove', throttle((event) => {
        const mouseX = event.clientX / window.innerWidth;
        const mouseY = event.clientY / window.innerHeight;
        
        trackedElements.forEach(element => {
            const moveX = (mouseX - 0.5) * 20;
            const moveY = (mouseY - 0.5) * 20;
            
            element.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    }, 30));
}

// ========== Scroll Progress Animation ==========

/**
 * Animate scroll progress bar
 */
function initializeScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(to right, #000, #333);
        z-index: 9999;
        transition: width 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', throttle(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = scrollPercent + '%';
    }, 30));
}

// ========== Floating Animation ==========

/**
 * Apply floating animation to elements
 * @param {HTMLElement} element - Element to animate
 * @param {number} duration - Animation duration in seconds
 */
function applyFloatingAnimation(element, duration = 3) {
    if (!element) return;
    
    element.style.animation = `float ${duration}s ease-in-out infinite`;
}

/**
 * Animate multiple floating elements
 */
function initializeFloatingElements() {
    const floatingElements = document.querySelectorAll('[data-float]');
    
    floatingElements.forEach((element, index) => {
        const duration = 3 + (index % 3) * 0.5;
        applyFloatingAnimation(element, duration);
    });
}

// ========== Counter Animation ==========

/**
 * Animate counter from 0 to target value
 * @param {HTMLElement} element - Element containing the counter
 * @param {number} targetValue - Target number value
 * @param {number} duration - Animation duration in milliseconds
 */
function animateCounter(element, targetValue, duration = 2000) {
    if (!element) return;
    
    const startValue = 0;
    const startTime = Date.now();
    
    const timer = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const currentValue = Math.floor(startValue + (targetValue - startValue) * easeOutQuad(progress));
        element.textContent = currentValue + '+';
        
        if (progress === 1) {
            clearInterval(timer);
            element.textContent = targetValue + '+';
        }
    }, 30);
}

/**
 * Easing function for animations
 * @param {number} t - Progress value (0-1)
 * @returns {number} - Eased value
 */
function easeOutQuad(t) {
    return t * (2 - t);
}

function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// ========== Scroll Reveal Animation ==========

/**
 * Reveal elements as they scroll into view
 */
function initializeScrollReveal() {
    const revealElements = document.querySelectorAll('[data-reveal]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = `slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards`;
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        observer.observe(element);
    });
}

// ========== Gradient Animation ==========

/**
 * Animate gradient background
 * @param {HTMLElement} element - Element with gradient background
 */
function animateGradient(element) {
    if (!element) return;
    
    const style = element.style;
    const gradients = [
        'linear-gradient(135deg, #000 0%, #1a1a1a 100%)',
        'linear-gradient(135deg, #1a1a1a 0%, #333 100%)',
        'linear-gradient(135deg, #000 0%, #333 100%)'
    ];
    
    let currentIndex = 0;
    
    setInterval(() => {
        currentIndex = (currentIndex + 1) % gradients.length;
        style.background = gradients[currentIndex];
        style.transition = 'background 3s ease-in-out';
    }, 3000);
}

// ========== Utility Functions ==========

/**
 * Throttle function for performance
 * @param {Function} func - Function to throttle
 * @param {number} limit - Minimum time between function calls (ms)
 * @returns {Function} - Throttled function
 */
function throttle(func, limit = 300) {
    let inThrottle;
    
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => {
                inThrottle = false;
            }, limit);
        }
    };
}

/**
 * Debounce function for performance
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay before execution (ms)
 * @returns {Function} - Debounced function
 */
function debounce(func, delay = 300) {
    let timeoutId;
    
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

// ========== Window Resize Handling ==========

/**
 * Handle window resize events
 */
window.addEventListener('resize', debounce(() => {
    // Re-initialize animations on resize
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
        // Could re-initialize animations here if needed
    }
}, 300));

// ========== Mobile Optimization ==========

/**
 * Detect if device is mobile
 * @returns {boolean} - True if mobile device
 */
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * Optimize animations for mobile
 */
function optimizeForMobile() {
    if (isMobileDevice()) {
        // Reduce animation complexity
        const elements = document.querySelectorAll('[style*="animation"]');
        elements.forEach(element => {
            const animation = element.style.animation;
            if (animation) {
                // Reduce duration on mobile
                element.style.animation = animation.replace(/\d+(\.\d+)?s/g, (match) => {
                    return (parseFloat(match) * 0.7) + 's';
                });
            }
        });
    }
}

// ========== Initialize on Load ==========

// Only run advanced animations if user prefers motion
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Optimize for mobile
    if (isMobileDevice()) {
        optimizeForMobile();
    }
    
    // Initialize scroll progress
    if (document.body.offsetHeight > window.innerHeight * 2) {
        initializeScrollProgress();
    }
    
    // Initialize hero parallax
    initializeHeroParallax();
    
    // Initialize mouse tracking
    initializeMouseTracking();
    
    // Animate headings
    setTimeout(animateHeadingsOnLoad, 100);
    
    // Service cards animation
    setTimeout(animateServiceCardsOnLoad, 200);
}

// ========== Export Functions ==========
window.animateCounter = animateCounter;
window.animateTextCharacters = animateTextCharacters;
window.applyFloatingAnimation = applyFloatingAnimation;
window.animateGradient = animateGradient;
