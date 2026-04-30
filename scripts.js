const PROJECTS = [
    {
        id: 'bi-nepal',
        title: 'BI Nepal',
        description: 'BI-focused project combining notebook-driven analysis with a frontend visualization layer, using HTML, CSS, and JavaScript to present insights in a clear and interactive way.',
        tags: ['HTML', 'CSS', 'JavaScript', 'Data Analysis', 'Python'],
        category: ['web', 'data'],
        image: '',
        github: 'https://github.com/acharya-2226/bi-nepal',
        demo: '',
        featured: true
    },
    {
        id: 'lms-project',
        title: 'Learning Management System',
        description: 'Frontend LMS prototype featuring course pages, navigation, and student-oriented interactions, designed to reflect core e-learning platform features.',
        tags: ['HTML5', 'CSS3', 'JavaScript'],
        category: ['web'],
        image: '',
        github: 'https://github.com/acharya-2226/lms-project',
        demo: '',
        featured: true
    },
    {
        id: 'ips-cinemas',
        title: 'IPS Cinemas',
        description: 'Cinema-style frontend project demonstrating interaction-focused page behavior and UI flow with JavaScript-powered user experience patterns.',
        tags: ['JavaScript', 'HTML', 'CSS'],
        category: ['web'],
        image: '',
        github: 'https://github.com/acharya-2226/ipscinemas',
        demo: '',
        featured: false
    }
];

const FORMSPREE_ENDPOINT = '';

const debounce = (fn, wait = 100) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), wait);
    };
};

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function getProjectInitials(title) {
    const words = title.trim().split(/\s+/).filter(Boolean);

    if (!words.length) {
        return '';
    }

    if (words[0].length <= 3 && words[0] === words[0].toUpperCase()) {
        return words[0];
    }

    return words
        .slice(0, 3)
        .map((word) => word.charAt(0).toUpperCase())
        .join('');
}

function createProjectCard(project, isFeatured = false) {
    const card = document.createElement('article');
    card.className = `project-card${isFeatured ? ' project-card--featured' : ''}`;
    card.setAttribute('data-id', project.id);

    const hasThumbnail = Boolean(project.image);
    const githubIcon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>';
    const externalIcon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>';

    card.innerHTML = `
        ${hasThumbnail ? `
        <div class="project-thumbnail">
            <img src="${project.image}" alt="${project.title} screenshot" loading="lazy" decoding="async" width="640" height="360">
        </div>` : `
        <div class="project-thumbnail project-thumbnail--placeholder" aria-hidden="true">
            <span class="project-initials">${getProjectInitials(project.title)}</span>
        </div>`}
        <div class="project-body">
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-tags" aria-label="Technologies used">
                ${project.tags.map((tag) => `<span class="tag">${tag}</span>`).join('')}
            </div>
        </div>
        <div class="project-footer">
            ${project.github ? `<a href="${project.github}" target="_blank" rel="noopener noreferrer" class="project-link" aria-label="View ${project.title} on GitHub">${githubIcon}<span>Code</span></a>` : ''}
            ${project.demo ? `<a href="${project.demo}" target="_blank" rel="noopener noreferrer" class="project-link project-link--primary" aria-label="View ${project.title} live demo">${externalIcon}<span>Live Demo</span></a>` : ''}
        </div>
    `;

    return card;
}

function animateProjectCards(cards) {
    if (prefersReducedMotion || !window.gsap || !window.ScrollTrigger || !cards.length) {
        return;
    }

    gsap.from(cards, {
        scrollTrigger: {
            trigger: cards[0],
            start: 'top 90%',
            toggleActions: 'play none none none'
        },
        y: 24,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
        stagger: 0.08,
        overwrite: 'auto',
        clearProps: 'y',
        onComplete: () => {
            cards.forEach(card => {
                gsap.set(card, { clearProps: 'transform,opacity' });
            });
        }
    });
}

function renderFeaturedProjects() {
    const featuredGrid = document.getElementById('featured-projects');
    if (!featuredGrid) return;

    featuredGrid.innerHTML = '';
    const featuredProjects = PROJECTS.filter((project) => project.featured);

    featuredProjects.forEach((project) => {
        featuredGrid.appendChild(createProjectCard(project, true));
    });

    animateProjectCards(Array.from(featuredGrid.children));
}

function renderProjects(projects) {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    const mountCards = () => {
        grid.innerHTML = '';
        projects.forEach((project) => {
            grid.appendChild(createProjectCard(project));
        });
        animateProjectCards(Array.from(grid.children));
    };

    if (!prefersReducedMotion && window.gsap && grid.children.length > 0) {
        gsap.to(grid.children, {
            opacity: 0,
            y: 8,
            duration: 0.2,
            ease: 'power2.in',
            stagger: 0.02,
            onComplete: mountCards
        });
        return;
    }

    mountCards();
}

function filterProjects(filter) {
    const filtered = filter === 'all'
        ? PROJECTS
        : PROJECTS.filter((project) => project.category.includes(filter));

    renderProjects(filtered);

    document.querySelectorAll('.filter-btn').forEach((button) => {
        const isActive = button.dataset.filter === filter;
        button.classList.toggle('active', isActive);
        button.setAttribute('aria-pressed', String(isActive));
    });
}

function initProjectFilters() {
    const filterContainer = document.getElementById('projects-filter');
    if (!filterContainer) return;

    filterContainer.innerHTML = '';
    const allCategories = [...new Set(PROJECTS.flatMap((project) => project.category))];
    const filters = ['all', ...allCategories];
    const labelMap = {
        all: 'All',
        web: 'Web',
        fullstack: 'Full Stack',
        backend: 'Backend',
        data: 'Data / ML'
    };

    filters.forEach((filter, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = `filter-btn${index === 0 ? ' active' : ''}`;
        button.dataset.filter = filter;
        button.textContent = labelMap[filter] || filter;
        button.setAttribute('aria-pressed', String(index === 0));
        button.addEventListener('click', () => filterProjects(filter));
        filterContainer.appendChild(button);
    });
}

function initNavigation() {
    const nav = document.querySelector('.site-nav');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    const closeMobileMenu = () => {
        if (!navMenu || !navToggle) return;
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    };

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', String(!isExpanded));
            navMenu.classList.toggle('open');
            document.body.style.overflow = !isExpanded ? 'hidden' : '';
        });
    }

    document.querySelectorAll('.nav-menu a[href^="#"]').forEach((link) => {
        link.addEventListener('click', closeMobileMenu);
    });

    document.addEventListener('click', (event) => {
        if (!navMenu?.classList.contains('open')) return;
        if (navMenu.contains(event.target) || navToggle?.contains(event.target)) return;
        closeMobileMenu();
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && navMenu?.classList.contains('open')) {
            closeMobileMenu();
            navToggle?.focus();
        }
    });

    const applyScrolledState = debounce(() => {
        nav?.classList.toggle('scrolled', window.scrollY > 60);
    }, 50);

    window.addEventListener('scroll', applyScrolledState, { passive: true });
    applyScrolledState();
}

function initActiveNavObserver() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            navLinks.forEach((link) => link.classList.remove('active'));
            const activeLink = document.querySelector(`nav a[href="#${entry.target.id}"]`);
            if (activeLink) activeLink.classList.add('active');
        });
    }, { threshold: 0.4, rootMargin: '-10% 0px -50% 0px' });

    sections.forEach((section) => observer.observe(section));
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function initContactForm() {
    const form = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    if (!form || !formStatus) return;

    const setError = (input, message) => {
        const error = input.closest('.form-group')?.querySelector('.error-message');
        if (error) error.textContent = message;
        input.setAttribute('aria-invalid', 'true');
    };

    const clearError = (input) => {
        const error = input.closest('.form-group')?.querySelector('.error-message');
        if (error) error.textContent = '';
        input.removeAttribute('aria-invalid');
    };

    const validate = () => {
        let isValid = true;
        const name = form.querySelector('#name');
        const email = form.querySelector('#email');
        const message = form.querySelector('#message');

        if (name) {
            if (!name.value.trim()) {
                setError(name, 'Please enter your name.');
                isValid = false;
            } else {
                clearError(name);
            }
        }

        if (email) {
            if (!email.value.trim()) {
                setError(email, 'Please enter your email.');
                isValid = false;
            } else if (!validateEmail(email.value.trim())) {
                setError(email, 'Please enter a valid email address.');
                isValid = false;
            } else {
                clearError(email);
            }
        }

        if (message) {
            if (!message.value.trim()) {
                setError(message, 'Please enter a message.');
                isValid = false;
            } else if (message.value.trim().length < 10) {
                setError(message, 'Message must be at least 10 characters.');
                isValid = false;
            } else {
                clearError(message);
            }
        }

        return isValid;
    };

    form.querySelectorAll('input, textarea').forEach((field) => {
        field.addEventListener('blur', validate);
        field.addEventListener('input', () => clearError(field));
    });

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        formStatus.textContent = '';

        if (!validate()) return;

        const submitButton = form.querySelector('button[type="submit"]');
        const originalButtonText = submitButton?.innerHTML || '';
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.innerHTML = '<span>Sending...</span>';
        }

        const formData = new FormData(form);
        const name = String(formData.get('name') || '');
        const email = String(formData.get('email') || '');
        const message = String(formData.get('message') || '');

        try {
            if (FORMSPREE_ENDPOINT) {
                const response = await fetch(FORMSPREE_ENDPOINT, {
                    method: 'POST',
                    headers: { Accept: 'application/json' },
                    body: formData
                });

                if (!response.ok) {
                    throw new Error('Submission failed');
                }
            } else {
                const subject = encodeURIComponent(`Portfolio message from ${name}`);
                const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
                window.location.href = `mailto:sidhcoe@gmail.com?subject=${subject}&body=${body}`;
            }

            form.outerHTML = '<div class="form-success" role="status" aria-live="polite"><h3>Thank you!</h3><p>Your message has been prepared successfully. I will get back to you soon.</p></div>';
        } catch (_error) {
            formStatus.textContent = 'Something went wrong. Please try again.';
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
            }
        }
    });
}

function initGsapAnimations() {
    if (!window.gsap || !window.ScrollTrigger) {
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    if (prefersReducedMotion) {
        document.querySelectorAll('.hero-name, .hero-tagline, .hero-description, .hero-cta, .hero-image, .section-heading, .experience-item, .skills-group, .project-card, .contact-section').forEach((element) => {
            element.style.opacity = '1';
            element.style.transform = 'none';
        });
        return;
    }

    gsap.set(['.hero-name', '.hero-tagline', '.hero-description', '.hero-cta', '.hero-image'], { opacity: 1 });

    gsap.from('.hero-name', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0
    });

    gsap.from('.hero-tagline', {
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out',
        delay: 0.08
    });

    gsap.from('.hero-description', {
        y: 15,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        delay: 0.16
    });

    gsap.from('.hero-cta', {
        y: 15,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
        delay: 0.24
    });

    gsap.from('.hero-image', {
        scale: 0.95,
        opacity: 0,
        duration: 0.9,
        ease: 'power2.out',
        delay: 0.08
    });

    gsap.utils.toArray('.section-heading').forEach((heading) => {
        gsap.from(heading, {
            scrollTrigger: {
                trigger: heading,
                start: 'top 90%',
                toggleActions: 'play none none none'
            },
            y: 24,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out'
        });
    });

    gsap.utils.toArray('.experience-item').forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 90%',
                toggleActions: 'play none none none'
            },
            x: -20,
            opacity: 0,
            duration: 0.5,
            ease: 'power2.out',
            delay: index * 0.08
        });
    });

    gsap.utils.toArray('.skills-group').forEach((group, index) => {
        gsap.from(group, {
            scrollTrigger: {
                trigger: group,
                start: 'top 90%',
                toggleActions: 'play none none none'
            },
            y: 16,
            opacity: 0,
            duration: 0.5,
            ease: 'power2.out',
            delay: index * 0.08
        });
    });

    gsap.from('.contact-section', {
        scrollTrigger: {
            trigger: '.contact-section',
            start: 'top 90%',
            toggleActions: 'play none none none'
        },
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out'
    });

    const navbar = document.querySelector('nav') || document.querySelector('header');
    let lastScrollY = 0;
    if (navbar) {
        gsap.set(navbar, { y: 0 });
        ScrollTrigger.create({
            onUpdate: () => {
                const currentScrollY = window.scrollY;
                if (currentScrollY > 80 && currentScrollY > lastScrollY) {
                    gsap.to(navbar, { y: -100, duration: 0.3, ease: 'power2.in', overwrite: true });
                } else {
                    gsap.to(navbar, { y: 0, duration: 0.3, ease: 'power2.out', overwrite: true });
                }
                lastScrollY = currentScrollY;
            }
        });
    }

    const progress = document.getElementById('scroll-progress');
    if (progress) {
        ScrollTrigger.create({
            onUpdate: (self) => {
                progress.style.width = `${self.progress * 100}%`;
            }
        });
    }
}

function initYear() {
    const year = document.getElementById('year');
    if (year) {
        year.textContent = String(new Date().getFullYear());
    }
}

function safeLocalStorageRead(key) {
    try {
        return localStorage.getItem(key);
    } catch (_error) {
        return null;
    }
}

function initScrollToTop() {
    const scrollBtn = document.getElementById('scroll-to-top');
    if (!scrollBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });

    scrollBtn.addEventListener('click', () => {
        gsap.to(window, {
            scrollTo: 0,
            duration: 0.8,
            ease: 'power2.inOut'
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    safeLocalStorageRead('theme');
    initYear();
    initNavigation();
    initActiveNavObserver();
    initProjectFilters();
    filterProjects('all');
    initContactForm();
    initGsapAnimations();
    initScrollToTop();
});