/**
 * Portfolio Website - Enhanced JavaScript
 * Main script file with navigation, animations, and form handling
 */

// ================================
// UTILITY FUNCTIONS
// ================================

const debounce = (func, wait = 10) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

const throttle = (func, limit = 100) => {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

// ================================
// DOM ELEMENTS
// ================================

const nav = document.querySelector('.site-nav');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const yearElement = document.getElementById('year');

// ================================
// NAVIGATION
// ================================

// Mobile menu toggle
if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('open');
        
        // Prevent body scroll when menu is open
        if (!isExpanded) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
}

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu && navMenu.classList.contains('open')) {
            navMenu.classList.remove('open');
            navToggle?.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu?.classList.contains('open') && 
        !navMenu.contains(e.target) && 
        !navToggle?.contains(e.target)) {
        navMenu.classList.remove('open');
        navToggle?.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
});

// Navbar scroll effect
const handleNavScroll = throttle(() => {
    if (window.scrollY > 100) {
        nav?.classList.add('scrolled');
    } else {
        nav?.classList.remove('scrolled');
    }
}, 100);

window.addEventListener('scroll', handleNavScroll);

// Active section highlighting
const highlightActiveSection = () => {
    const scrollPosition = window.scrollY + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (!correspondingLink) return;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            correspondingLink.classList.add('active');
        }
    });
};

const debouncedHighlight = debounce(highlightActiveSection, 50);
window.addEventListener('scroll', debouncedHighlight);
window.addEventListener('load', highlightActiveSection);

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navHeight = nav?.offsetHeight || 80;
            const targetPosition = targetElement.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ================================
// SCROLL ANIMATIONS
// ================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optionally unobserve after animation
            // fadeInObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for fade-in animations
const observeElements = () => {
    const elementsToAnimate = [
        '.about-card',
        '.skill-category',
        '.project-card',
        '.skill-group',
        '.timeline-item',
        '.achievement-card',
        '.contact-card'
    ];
    
    elementsToAnimate.forEach(selector => {
        document.querySelectorAll(selector).forEach((el, index) => {
            el.classList.add('fade-in');
            el.style.transitionDelay = `${index * 0.1}s`;
            fadeInObserver.observe(el);
        });
    });
};

// Run on page load
window.addEventListener('load', observeElements);

// ================================
// FORM HANDLING
// ================================

const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const showError = (input, message) => {
    const formGroup = input.closest('.form-group');
    const errorElement = formGroup?.querySelector('.error-message');
    
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    input.setAttribute('aria-invalid', 'true');
    input.style.borderColor = '#ff6b6b';
};

const clearError = (input) => {
    const formGroup = input.closest('.form-group');
    const errorElement = formGroup?.querySelector('.error-message');
    
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
    
    input.removeAttribute('aria-invalid');
    input.style.borderColor = '';
};

const validateForm = () => {
    let isValid = true;
    
    const nameInput = contactForm?.querySelector('#name');
    const emailInput = contactForm?.querySelector('#email');
    const messageInput = contactForm?.querySelector('#message');
    
    // Validate name
    if (nameInput) {
        const name = nameInput.value.trim();
        if (!name) {
            showError(nameInput, 'Please enter your name');
            isValid = false;
        } else if (name.length < 2) {
            showError(nameInput, 'Name must be at least 2 characters');
            isValid = false;
        } else {
            clearError(nameInput);
        }
    }
    
    // Validate email
    if (emailInput) {
        const email = emailInput.value.trim();
        if (!email) {
            showError(emailInput, 'Please enter your email');
            isValid = false;
        } else if (!validateEmail(email)) {
            showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        } else {
            clearError(emailInput);
        }
    }
    
    // Validate message
    if (messageInput) {
        const message = messageInput.value.trim();
        if (!message) {
            showError(messageInput, 'Please enter a message');
            isValid = false;
        } else if (message.length < 10) {
            showError(messageInput, 'Message must be at least 10 characters');
            isValid = false;
        } else {
            clearError(messageInput);
        }
    }
    
    return isValid;
};

// Real-time validation on blur
if (contactForm) {
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.value.trim()) {
                validateForm();
            }
        });
        
        // Clear error on input
        input.addEventListener('input', () => {
            if (input.getAttribute('aria-invalid') === 'true') {
                clearError(input);
            }
        });
    });
}

// Form submission
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Clear previous status
        if (formStatus) {
            formStatus.textContent = '';
            formStatus.className = 'form-status';
        }
        
        // Validate form
        if (!validateForm()) {
            return;
        }
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = {
            access_key: 'f45e1224-9822-4d7b-9ce0-e88fb5594e30',
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message'),
            subject: `New message from ${formData.get('name')} - Portfolio Contact Form`
        };
        
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton?.innerHTML;
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.innerHTML = '<span>Sending...</span>';
        }
        
        try {
            // Send to Web3Forms API
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            const result = await response.json();
            
            if (result.success) {
                // Success
                if (formStatus) {
                    formStatus.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
                    formStatus.style.color = 'var(--accent-cyan)';
                }
                
                // Reset form
                contactForm.reset();
                
                // Clear form after delay
                setTimeout(() => {
                    if (formStatus) {
                        formStatus.textContent = '';
                    }
                }, 5000);
            } else {
                throw new Error(result.message || 'Submission failed');
            }
            
        } catch (error) {
            // Error handling
            if (formStatus) {
                formStatus.textContent = '✗ Something went wrong. Please try again.';
                formStatus.style.color = '#ff6b6b';
            }
            console.error('Form submission error:', error);
        } finally {
            // Reset button
            if (submitButton && originalButtonText) {
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
            }
        }
    });
}

// ================================
// DYNAMIC YEAR IN FOOTER
// ================================

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// ================================
// KEYBOARD NAVIGATION
// ================================

// Trap focus in mobile menu when open
const trapFocus = (element) => {
    const focusableElements = element.querySelectorAll(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled])'
    );
    
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    const handleTab = (e) => {
        if (e.key !== 'Tab') return;
        
        if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
                lastFocusable.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastFocusable) {
                firstFocusable.focus();
                e.preventDefault();
            }
        }
    };
    
    element.addEventListener('keydown', handleTab);
    
    return () => {
        element.removeEventListener('keydown', handleTab);
    };
};

// Close mobile menu on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu?.classList.contains('open')) {
        navMenu.classList.remove('open');
        navToggle?.setAttribute('aria-expanded', 'false');
        navToggle?.focus();
        document.body.style.overflow = '';
    }
});

// ================================
// PERFORMANCE OPTIMIZATIONS
// ================================

// Lazy load images when they come into viewport
const lazyLoadImages = () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
};

window.addEventListener('load', lazyLoadImages);

// ================================
// SCROLL TO TOP BUTTON (Optional)
// ================================

const createScrollToTopButton = () => {
    const button = document.createElement('button');
    button.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 19V5M5 12l7-7 7 7"/>
        </svg>
    `;
    button.className = 'scroll-to-top';
    button.setAttribute('aria-label', 'Scroll to top');
    button.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: var(--gradient-primary);
        color: var(--bg-primary);
        border: none;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        box-shadow: var(--shadow-lg);
        transition: all var(--transition-base);
        z-index: 50;
    `;
    
    // Show/hide based on scroll position
    const toggleButton = throttle(() => {
        if (window.scrollY > 500) {
            button.style.display = 'flex';
        } else {
            button.style.display = 'none';
        }
    }, 100);
    
    window.addEventListener('scroll', toggleButton);
    
    // Scroll to top on click
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effect
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-4px) scale(1.05)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0) scale(1)';
    });
    
    document.body.appendChild(button);
};

// Uncomment to enable scroll-to-top button
// window.addEventListener('load', createScrollToTopButton);

// ================================
// THEME SWITCHER (Optional)
// ================================

const initThemeSwitcher = () => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Create theme toggle button if needed
    // Implementation left as optional enhancement
};

// ================================
// ANALYTICS & TRACKING (Optional)
// ================================

const trackEvent = (category, action, label) => {
    // Placeholder for analytics tracking
    // Integration with Google Analytics, Plausible, etc.
    console.log('Event tracked:', { category, action, label });
};

// Track important interactions
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        const buttonText = button.textContent.trim();
        trackEvent('Button', 'Click', buttonText);
    });
});

// ================================
// ACCESSIBILITY ENHANCEMENTS
// ================================

// Announce page transitions to screen readers
const announcePageChange = (message) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
};

// ================================
// ERROR HANDLING
// ================================

window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
    // Optionally send to error tracking service
});

// ================================
// INITIALIZATION
// ================================

const init = () => {
    console.log('Portfolio initialized successfully');
    
    // Set initial active link
    highlightActiveSection();
    
    // Initialize any other features
    // initThemeSwitcher();
};

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ================================
// EXPORT FOR TESTING (Optional)
// ================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateEmail,
        debounce,
        throttle
    };
}