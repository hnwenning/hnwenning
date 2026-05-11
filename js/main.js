/**
 * Wenning Technology - Main JavaScript
 * Core interactivity, form handling, navigation
 */

// ========== DOM Ready ==========
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeContactForm();
    initializeNewsletterForm();
    initializeScrollEffects();
});

// ========== Navigation Functions ==========

/**
 * Initialize navigation bar functionality
 */
function initializeNavigation() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Hamburger menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Close menu on nav link click
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu) {
                navMenu.classList.remove('active');
            }
        });
    });
    
    // Update navigation on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Set active nav link based on current page
    updateActiveNavLink();
}

/**
 * Update active navigation link
 */
function updateActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ========== Form Validation ==========

/**
 * Email validation using RFC regex
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if valid email
 */
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate required fields
 * @param {Object} data - Form data object
 * @returns {Object} - Validation result {valid: boolean, errors: array}
 */
function validateFormData(data) {
    const errors = [];
    
    if (!data.name || data.name.trim() === '') {
        errors.push('Full Name is required');
    }
    
    if (!data.email || data.email.trim() === '') {
        errors.push('Email is required');
    } else if (!validateEmail(data.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!data.message || data.message.trim() === '') {
        errors.push('Message is required');
    }
    
    if (data.phone && data.phone.trim() !== '') {
        // Basic phone validation - at least 10 digits
        const phoneRegex = /^\d{10,}$/;
        if (!phoneRegex.test(data.phone.replace(/\D/g, ''))) {
            errors.push('Please enter a valid phone number');
        }
    }
    
    return {
        valid: errors.length === 0,
        errors: errors
    };
}

// ========== Contact Form Handler ==========

/**
 * Handle contact form submission
 * @param {Event} event - Form submission event
 */
function handleContactSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        company: document.getElementById('company').value,
        phone: document.getElementById('phone').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
        privacy: document.getElementById('privacy').checked
    };
    
    // Validate form data
    const validation = validateFormData(formData);
    
    if (!validation.valid) {
        showFormError(form, validation.errors);
        return;
    }
    
    if (!formData.privacy) {
        showFormError(form, ['You must accept the Privacy Policy and Terms of Service']);
        return;
    }
    
    // Simulate form submission
    console.log('Contact Form Submitted:', formData);
    
    // Show success message
    showFormSuccess(form, 'Thank you! Your message has been sent successfully. We will contact you soon.');
    
    // Reset form
    setTimeout(() => {
        form.reset();
    }, 1000);
}

/**
 * Initialize contact form event listeners
 */
function initializeContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
        
        // Add real-time validation
        const emailInput = document.getElementById('email');
        if (emailInput) {
            emailInput.addEventListener('blur', function() {
                if (this.value && !validateEmail(this.value)) {
                    this.style.borderColor = '#ff4444';
                    this.style.boxShadow = '0 0 0 3px rgba(255, 68, 68, 0.1)';
                } else {
                    this.style.borderColor = '';
                    this.style.boxShadow = '';
                }
            });
        }
    }
}

// ========== Newsletter Form Handler ==========

/**
 * Handle newsletter subscription
 * @param {Event} event - Form submission event
 */
function handleNewsletterSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const email = form.querySelector('input[type="email"]').value;
    
    if (!validateEmail(email)) {
        showFormError(form, ['Please enter a valid email address']);
        return;
    }
    
    // Simulate subscription
    console.log('Newsletter Subscription:', email);
    
    // Show success message
    showFormSuccess(form, 'Thank you for subscribing! Check your email for confirmation.');
    
    // Reset form
    setTimeout(() => {
        form.reset();
    }, 1000);
}

/**
 * Initialize newsletter form
 */
function initializeNewsletterForm() {
    // Find all newsletter forms (might be multiple on page)
    const newsletterForms = document.querySelectorAll('form[onsubmit*="handleNewsletterSubmit"]');
    
    newsletterForms.forEach(form => {
        form.addEventListener('submit', handleNewsletterSubmit);
    });
}

// ========== Form Feedback Functions ==========

/**
 * Show form error messages
 * @param {HTMLElement} form - Form element
 * @param {Array} errors - Array of error messages
 */
function showFormError(form, errors) {
    // Remove existing error message
    const existingError = form.querySelector('.form-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Create error message element
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error';
    errorDiv.style.cssText = `
        background: #ffe0e0;
        border: 1px solid #ff8888;
        border-radius: 4px;
        padding: 15px;
        margin-bottom: 20px;
        color: #cc0000;
        font-size: 0.9rem;
    `;
    
    errorDiv.innerHTML = '<strong>Please fix the following errors:</strong><ul style="margin: 10px 0 0 20px; padding: 0;">' +
        errors.map(error => `<li>${error}</li>`).join('') +
        '</ul>';
    
    // Insert at the beginning of the form
    form.insertBefore(errorDiv, form.firstChild);
    
    // Scroll to error
    errorDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Remove after 5 seconds
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.remove();
        }
    }, 5000);
}

/**
 * Show form success message
 * @param {HTMLElement} form - Form element
 * @param {string} message - Success message
 */
function showFormSuccess(form, message) {
    // Remove existing messages
    const existing = form.querySelector('.form-success, .form-error');
    if (existing) {
        existing.remove();
    }
    
    // Create success message element
    const successDiv = document.createElement('div');
    successDiv.className = 'form-success';
    successDiv.style.cssText = `
        background: #e0ffe0;
        border: 1px solid #88ff88;
        border-radius: 4px;
        padding: 15px;
        margin-bottom: 20px;
        color: #008800;
        font-size: 0.95rem;
    `;
    
    successDiv.innerHTML = `<strong>✓</strong> ${message}`;
    
    // Insert at the beginning of the form
    form.insertBefore(successDiv, form.firstChild);
    
    // Remove after 5 seconds
    setTimeout(() => {
        if (successDiv.parentNode) {
            successDiv.remove();
        }
    }, 5000);
}

// ========== Scroll Effects ==========

/**
 * Initialize scroll-based effects
 */
function initializeScrollEffects() {
    // Animate stat numbers on scroll
    animateStatCardsOnScroll();
    
    // Add fade-in animation to elements as they come into view
    observeElements();
}

/**
 * Animate stat cards when they come into view
 */
function animateStatCardsOnScroll() {
    const statCards = document.querySelectorAll('.stat-card');
    
    if (!statCards.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statCard = entry.target;
                const numberElement = statCard.querySelector('.stat-number');
                
                if (numberElement && !numberElement.classList.contains('animated')) {
                    numberElement.classList.add('animated');
                    animateNumber(numberElement);
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '0px'
    });
    
    statCards.forEach(card => observer.observe(card));
}

/**
 * Animate number counting from 0 to target
 * @param {HTMLElement} element - Element containing the number
 */
function animateNumber(element) {
    const targetText = element.textContent;
    const targetNumber = parseInt(targetText.replace(/\D/g, ''));
    
    if (isNaN(targetNumber)) return;
    
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;
    let currentStep = 0;
    
    const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        const currentNumber = Math.floor(targetNumber * progress);
        
        element.textContent = currentNumber + '+';
        
        if (currentStep >= steps) {
            element.textContent = targetText;
            clearInterval(interval);
        }
    }, stepDuration);
}

/**
 * Observe elements for intersection and apply animations
 */
function observeElements() {
    const animatedElements = document.querySelectorAll(
        '.service-card, .faq-item, .info-card, .service-detail-card'
    );
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// ========== Utility Functions ==========

/**
 * Smooth scroll to element
 * @param {string} elementId - ID of element to scroll to
 */
function smoothScroll(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

/**
 * Get URL parameters
 * @param {string} param - Parameter name
 * @returns {string|null} - Parameter value or null
 */
function getUrlParameter(param) {
    const params = new URLSearchParams(window.location.search);
    return params.get(param);
}

/**
 * Add event listener with error handling
 * @param {HTMLElement} element - Target element
 * @param {string} event - Event type
 * @param {Function} handler - Event handler
 */
function safeAddEventListener(element, event, handler) {
    if (element) {
        element.addEventListener(event, function(e) {
            try {
                handler(e);
            } catch (error) {
                console.error('Event handler error:', error);
            }
        });
    }
}

/**
 * Debounce function for performance optimization
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
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

/**
 * Throttle function for performance optimization
 * @param {Function} func - Function to throttle
 * @param {number} limit - Limit in milliseconds
 * @returns {Function} - Throttled function
 */
function throttle(func, limit = 300) {
    let lastRun = 0;
    return function(...args) {
        const now = Date.now();
        if (now - lastRun >= limit) {
            func.apply(this, args);
            lastRun = now;
        }
    };
}

// ========== Performance Monitoring ==========

/**
 * Log performance metrics
 */
window.addEventListener('load', function() {
    if (window.performance && window.performance.timing) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page Load Time: ' + pageLoadTime + 'ms');
    }
});

// ========== Error Handling ==========

/**
 * Global error handler
 */
window.addEventListener('error', function(event) {
    console.error('Global error:', event.error);
    // Log error to analytics or error tracking service
});

/**
 * Unhandled promise rejection handler
 */
window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled promise rejection:', event.reason);
    // Log error to analytics or error tracking service
});

// ========== Accessibility ==========

/**
 * Handle keyboard shortcuts
 */
document.addEventListener('keydown', function(e) {
    // Alt + C to focus on contact form
    if (e.altKey && e.key === 'c') {
        const contactForm = document.querySelector('.contact-form input[name="name"]');
        if (contactForm) {
            contactForm.focus();
        }
    }
    
    // Esc to close mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu) {
            navMenu.classList.remove('active');
        }
    }
});

// ========== Export Functions ==========
// Make functions available globally for inline event handlers
window.handleContactSubmit = handleContactSubmit;
window.handleNewsletterSubmit = handleNewsletterSubmit;
window.smoothScroll = smoothScroll;
window.validateEmail = validateEmail;
