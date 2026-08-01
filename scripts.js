/* ===================================================================
   SIDDHARTH ACHARYA — PORTFOLIO SCRIPTS
   ===================================================================
   1. Project Data (Content Separated from Layout)
   2. Project Rendering
   3. Filter & Search
   4. Navigation (Mobile Toggle, Active State, Smooth Scroll)
   5. Contact Form Validation & Submission
   6. Scroll Progress & Scroll-to-Top
   7. Intersection Observer Animations
   8. Performance: Lazy Image Loading Fallback
   =================================================================== */

(function () {
    'use strict';

    /* -------------------------------------------------------------------
       1. Project Data — Content separated from layout for easy maintenance
       Add/edit/remove projects here without touching HTML/CSS
       ------------------------------------------------------------------- */
    const projects = [
        {
            id: 'student-dashboard',
            title: 'Student Management Dashboard',
            description: 'Full-stack student management system with authentication, CRUD operations, attendance tracking, and grade management. Built as an academic project demonstrating end-to-end web application development.',
            techStack: ['Django', 'Python', 'HTML5', 'CSS3', 'JavaScript', 'SQLite'],
            role: 'Full-Stack Developer',
            category: ['web'],
            liveUrl: '#',
            githubUrl: 'https://github.com/acharya-2226',
            image: 'https://placehold.co/640x400/1a1a2e/6366f1?text=Student+Dashboard'
        },
        {
            id: 'sign-language-ml',
            title: 'Sign Language Recognition',
            description: 'Machine learning project using Convolutional Neural Networks (CNN) for real-time sign language gesture recognition. Includes dataset preprocessing, model training, and accuracy evaluation pipeline.',
            techStack: ['Python', 'TensorFlow', 'OpenCV', 'NumPy', 'Matplotlib'],
            role: 'ML Developer',
            category: ['ml', 'systems'],
            liveUrl: '#',
            githubUrl: 'https://github.com/acharya-2226',
            image: 'https://placehold.co/640x400/1a1a2e/a855f7?text=Sign+Language+ML'
        },
        {
            id: 'network-design-lab',
            title: 'Enterprise Network Design Lab',
            description: 'Cisco Packet Tracer lab implementing enterprise network design with VLANs, OSPF routing, NAT, DHCP, and ACLs. Includes topology documentation and configuration reference sheets.',
            techStack: ['Cisco Packet Tracer', 'VLANs', 'OSPF', 'NAT', 'DHCP'],
            role: 'Network Designer',
            category: ['networking'],
            liveUrl: '#',
            githubUrl: 'https://github.com/acharya-2226',
            image: 'https://placehold.co/640x400/1a1a2e/10b981?text=Network+Lab'
        },
        {
            id: 'data-analysis-notebook',
            title: 'Exploratory Data Analysis',
            description: 'Jupyter Notebook collection demonstrating EDA techniques — data cleaning, statistical analysis, and visualization using Pandas, Matplotlib, and Seaborn on real-world datasets.',
            techStack: ['Python', 'Pandas', 'Matplotlib', 'Seaborn', 'Jupyter'],
            role: 'Data Analyst',
            category: ['data'],
            liveUrl: '#',
            githubUrl: 'https://github.com/acharya-2226',
            image: 'https://placehold.co/640x400/1a1a2e/ec4899?text=EDA+Analysis'
        },
        {
            id: 'computer-graphics-opengl',
            title: 'Computer Graphics with OpenGL',
            description: 'Implementation of 2D/3D transformations, lighting models, texture mapping, and shading algorithms using OpenGL and C++. Covers ray tracing fundamentals and scene graph management.',
            techStack: ['C++', 'OpenGL', 'GLSL', 'Mathematics'],
            role: 'Developer',
            category: ['systems'],
            liveUrl: '#',
            githubUrl: 'https://github.com/acharya-2226',
            image: 'https://placehold.co/640x400/1a1a2e/f59e0b?text=OpenGL+Graphics'
        },
        {
            id: 'dsa-implementations',
            title: 'Data Structures & Algorithms',
            description: 'Comprehensive implementation of essential data structures (linked lists, trees, graphs, heaps) and classic algorithms (sorting, searching, dynamic programming) in C and Python.',
            techStack: ['C', 'Python', 'Algorithms', 'Data Structures'],
            role: 'Developer',
            category: ['systems'],
            liveUrl: '#',
            githubUrl: 'https://github.com/acharya-2226',
            image: 'https://placehold.co/640x400/1a1a2e/fbbf24?text=DSA+Implementations'
        },
        {
            id: 'django-api',
            title: 'RESTful API with Django',
            description: 'RESTful API backend built with Django REST Framework featuring JWT authentication, pagination, filtering, and comprehensive API documentation. Designed for consumption by mobile and web clients.',
            techStack: ['Django', 'DRF', 'Python', 'JWT', 'PostgreSQL'],
            role: 'Backend Developer',
            category: ['web'],
            liveUrl: '#',
            githubUrl: 'https://github.com/acharya-2226',
            image: 'https://placehold.co/640x400/1a1a2e/3b82f6?text=Django+API'
        },
        {
            id: 'packet-tracer-vlan',
            title: 'VLAN Configuration & Routing',
            description: 'Detailed Packet Tracer lab demonstrating VLAN setup, trunk configuration, inter-VLAN routing with router-on-a-stick, and network security with ACLs for a multi-department organization.',
            techStack: ['Cisco Packet Tracer', 'VLANs', 'Router-on-a-Stick', 'ACLs'],
            role: 'Network Engineer',
            category: ['networking'],
            liveUrl: '#',
            githubUrl: 'https://github.com/acharya-2226',
            image: 'https://placehold.co/640x400/1a1a2e/34d399?text=VLAN+Lab'
        },
        {
            id: 'ml-classification',
            title: 'Classification Model Comparison',
            description: 'Comparative study of multiple machine learning classifiers (SVM, Random Forest, KNN, Logistic Regression) on standard datasets with cross-validation, hyperparameter tuning, and performance metrics.',
            techStack: ['Python', 'Scikit-learn', 'Pandas', 'Matplotlib'],
            role: 'ML Researcher',
            category: ['ml', 'data'],
            liveUrl: '#',
            githubUrl: 'https://github.com/acharya-2226',
            image: 'https://placehold.co/640x400/1a1a2e/c084fc?text=ML+Classification'
        }
    ];

    /* -------------------------------------------------------------------
       2. Project Rendering
       ------------------------------------------------------------------- */
    const projectsGrid = document.getElementById('projects-grid');
    const noResults = document.getElementById('no-results');

    function getCategoryClass(categories) {
        if (categories.includes('web')) return 'tag-web';
        if (categories.includes('ml')) return 'tag-ml';
        if (categories.includes('networking')) return 'tag-networking';
        if (categories.includes('systems')) return 'tag-systems';
        if (categories.includes('data')) return 'tag-data';
        return 'tag-web';
    }

    function getCategoryLabel(categories) {
        if (categories.includes('web')) return 'Web';
        if (categories.includes('ml')) return 'ML / AI';
        if (categories.includes('networking')) return 'Networking';
        if (categories.includes('systems')) return 'Systems';
        if (categories.includes('data')) return 'Data Science';
        return 'Web';
    }

    function renderProjectCard(project) {
        const categoryClass = getCategoryClass(project.category);
        const categoryLabel = getCategoryLabel(project.category);

        const techTags = project.techStack.map(tech =>
            `<span class="tech-pill">${tech}</span>`
        ).join('');

        return `
            <article class="project-card" data-categories="${project.category.join(',')}" data-id="${project.id}">
                <img class="project-card-image" src="${project.image}" alt="${project.title} project screenshot" loading="lazy" width="640" height="400" onerror="this.src='https://placehold.co/640x400/1a1a2e/6366f1?text=Project'">
                <div class="project-card-body">
                    <div class="project-card-header">
                        <h3>${project.title}</h3>
                        <span class="project-tag ${categoryClass}">${categoryLabel}</span>
                    </div>
                    <p class="project-card-description">${project.description}</p>
                    <div class="project-tech-stack">${techTags}</div>
                    <p class="project-card-role">Role: ${project.role}</p>
                    <div class="project-card-links">
                        <a href="${project.liveUrl}" class="project-link" target="_blank" rel="noopener noreferrer" aria-label="View ${project.title} live demo">
                            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V9"/><path d="M15 1L11 5"/><path d="M9 1h6v6"/></svg>
                            Live Demo
                        </a>
                        <a href="${project.githubUrl}" class="project-link" target="_blank" rel="noopener noreferrer" aria-label="View ${project.title} source code on GitHub">
                            <svg viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
                            GitHub
                        </a>
                    </div>
                </div>
            </article>
        `;
    }

    function renderAllProjects() {
        if (!projectsGrid) return;
        projectsGrid.innerHTML = projects.map(renderProjectCard).join('');
    }

    /* -------------------------------------------------------------------
       3. Filter & Search
       ------------------------------------------------------------------- */
    function initFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        let activeFilter = 'all';

        function applyFilters() {
            const searchValue = document.getElementById('project-search')?.value.toLowerCase().trim() || '';
            const cards = document.querySelectorAll('.project-card');
            let visibleCount = 0;

            cards.forEach(card => {
                const categories = card.dataset.categories.split(',');
                const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
                const description = card.querySelector('.project-card-description')?.textContent.toLowerCase() || '';
                const techText = card.querySelector('.project-tech-stack')?.textContent.toLowerCase() || '';
                const allText = title + ' ' + description + ' ' + techText;

                const matchesFilter = activeFilter === 'all' || categories.includes(activeFilter);
                const matchesSearch = !searchValue || allText.includes(searchValue);

                if (matchesFilter && matchesSearch) {
                    card.classList.remove('hidden');
                    card.style.display = '';
                    visibleCount++;
                } else {
                    card.classList.add('hidden');
                    card.style.display = 'none';
                }
            });

            if (noResults) {
                noResults.hidden = visibleCount > 0;
            }
        }

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => {
                    b.classList.remove('active');
                    b.setAttribute('aria-pressed', 'false');
                });
                btn.classList.add('active');
                btn.setAttribute('aria-pressed', 'true');
                activeFilter = btn.dataset.filter;
                applyFilters();
            });
        });

        const searchInput = document.getElementById('project-search');
        if (searchInput) {
            let debounceTimer;
            searchInput.addEventListener('input', () => {
                clearTimeout(debounceTimer);
                debounceTimer = setTimeout(applyFilters, 250);
            });
        }
    }

    /* -------------------------------------------------------------------
       4. Navigation
       ------------------------------------------------------------------- */
    function initNavigation() {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.getElementById('primary-menu');
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section[id]');

        // Mobile menu toggle
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                const isOpen = navMenu.classList.toggle('open');
                navToggle.setAttribute('aria-expanded', String(isOpen));
            });

            // Close menu on link click
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('open');
                    navToggle.setAttribute('aria-expanded', 'false');
                });
            });

            // Close menu on Escape
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && navMenu.classList.contains('open')) {
                    navMenu.classList.remove('open');
                    navToggle.setAttribute('aria-expanded', 'false');
                    navToggle.focus();
                }
            });
        }

        // Active section on scroll (Intersection Observer)
        if ('IntersectionObserver' in window) {
            const observerOptions = {
                root: null,
                rootMargin: '-20% 0px -60% 0px',
                threshold: 0
            };

            const sectionObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const id = entry.target.id;
                        navLinks.forEach(link => {
                            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                        });
                    }
                });
            }, observerOptions);

            sections.forEach(section => sectionObserver.observe(section));
        } else {
            // Fallback: update active on scroll
            let scrollTimeout;
            window.addEventListener('scroll', () => {
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(() => {
                    const scrollY = window.scrollY + 120;
                    sections.forEach(section => {
                        const top = section.offsetTop;
                        const height = section.offsetHeight;
                        if (scrollY >= top && scrollY < top + height) {
                            navLinks.forEach(link => {
                                link.classList.toggle('active', link.getAttribute('href') === `#${section.id}`);
                            });
                        }
                    });
                }, 50);
            });
        }
    }

    /* -------------------------------------------------------------------
       5. Contact Form Validation & Submission
       ------------------------------------------------------------------- */
    function initContactForm() {
        const form = document.getElementById('contact-form');
        const formStatus = document.getElementById('form-status');
        const submitBtn = document.getElementById('submit-btn');

        if (!form) return;

        // Simple client-side validation
        function validateField(field) {
            const errorEl = field.parentElement.querySelector('.error-message');
            let isValid = true;
            let message = '';

            if (field.hasAttribute('required') && !field.value.trim()) {
                isValid = false;
                message = 'This field is required.';
            } else if (field.type === 'email' && field.value.trim()) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(field.value.trim())) {
                    isValid = false;
                    message = 'Please enter a valid email address.';
                }
            }

            if (errorEl) errorEl.textContent = message;
            field.classList.toggle('error', !isValid);
            return isValid;
        }

        // Real-time validation
        form.querySelectorAll('input, textarea').forEach(field => {
            field.addEventListener('blur', () => validateField(field));
            field.addEventListener('input', () => {
                if (field.classList.contains('error')) {
                    validateField(field);
                }
            });
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Validate all fields
            let allValid = true;
            form.querySelectorAll('input[required], textarea[required]').forEach(field => {
                if (!validateField(field)) allValid = false;
            });

            if (!allValid) {
                if (formStatus) {
                    formStatus.textContent = 'Please fix the errors above before submitting.';
                    formStatus.className = 'form-status error';
                }
                return;
            }

            // Disable submit button
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.querySelector('span').textContent = 'Sending...';
            }

            // Collect form data
            const formData = new FormData(form);
            const name = formData.get('name')?.trim() || '';
            const email = formData.get('email')?.trim() || '';
            const subject = formData.get('subject')?.trim() || 'Portfolio Contact';
            const message = formData.get('message')?.trim() || '';

            // Sanitize (basic XSS prevention)
            const sanitize = (str) => str.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
            const sanitizedName = sanitize(name);
            const sanitizedEmail = sanitize(email);
            const sanitizedSubject = sanitize(subject);
            const sanitizedMessage = sanitize(message);

            // Use Web3Forms API (free, no API key needed for testing)
            // Replace with your actual Web3Forms access key
            const web3formsKey = 'f45e1224-9822-4d7b-9ce0-e88fb5594e30';

            const payload = {
                access_key: web3formsKey,
                name: sanitizedName,
                email: sanitizedEmail,
                subject: sanitizedSubject,
                message: sanitizedMessage,
                from_name: 'Siddharth Acharya Portfolio'
            };

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    if (formStatus) {
                        formStatus.textContent = 'Message sent successfully! I\'ll get back to you soon.';
                        formStatus.className = 'form-status success';
                    }
                    form.reset();
                    // Clear any remaining error states
                    form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
                    form.querySelectorAll('.error-message').forEach(el => el.textContent = '');
                } else {
                    throw new Error(data.message || 'Submission failed.');
                }
            })
            .catch((error) => {
                if (formStatus) {
                    formStatus.textContent = 'Something went wrong. Please try again or email me directly.';
                    formStatus.className = 'form-status error';
                }
                console.error('Form submission error:', error);
            })
            .finally(() => {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.querySelector('span').textContent = 'Send Message';
                }
            });
        });
    }

    /* -------------------------------------------------------------------
       6. Scroll Progress & Scroll-to-Top
       ------------------------------------------------------------------- */
    function initScrollFeatures() {
        const progressBar = document.getElementById('scroll-progress');
        const scrollBtn = document.getElementById('scroll-to-top');
        let ticking = false;

        function updateScroll() {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

            // Progress bar
            if (progressBar) {
                progressBar.style.width = `${scrollPercent}%`;
            }

            // Scroll-to-top button
            if (scrollBtn) {
                if (scrollTop > 400) {
                    scrollBtn.classList.add('visible');
                    scrollBtn.hidden = false;
                } else {
                    scrollBtn.classList.remove('visible');
                    scrollBtn.hidden = true;
                }
            }

            ticking = false;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateScroll);
                ticking = true;
            }
        }, { passive: true });

        // Scroll-to-top click
        if (scrollBtn) {
            scrollBtn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }

        // Footer year
        const yearEl = document.getElementById('year');
        if (yearEl) {
            yearEl.textContent = new Date().getFullYear();
        }
    }

    /* -------------------------------------------------------------------
       7. Intersection Observer Animations
       ------------------------------------------------------------------- */
    function initAnimations() {
        if (!('IntersectionObserver' in window)) return;

        const animateElements = document.querySelectorAll(
            '.section-header, .about-card, .skill-category, .skill-group, ' +
            '.timeline-item, .blog-card, .contact-card, .project-card'
        );

        // Initially hide
        animateElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(24px)';
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });

        const animObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Stagger animation
                    const delay = Math.min(index % 4, 3) * 80;
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, delay);
                    animObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });

        animateElements.forEach(el => animObserver.observe(el));
    }

    /* -------------------------------------------------------------------
       8. Image Error Handling
       ------------------------------------------------------------------- */
    function initImageFallbacks() {
        document.querySelectorAll('img[onerror]').forEach(img => {
            img.addEventListener('error', () => {
                img.src = 'https://placehold.co/640x400/1a1a2e/6366f1?text=Project';
                img.removeAttribute('onerror');
            }, { once: true });
        });
    }

    /* -------------------------------------------------------------------
       Initialize Everything
       ------------------------------------------------------------------- */
    function init() {
        renderAllProjects();
        initFilters();
        initNavigation();
        initContactForm();
        initScrollFeatures();
        initAnimations();
        initImageFallbacks();
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
