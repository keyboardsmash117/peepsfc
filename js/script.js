// FFXIV FC Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize page transitions
    initPageTransitions();
    
    // Navigation functionality
    initNavigation();
    
    // Form handling
    initForms();
    
    // Smooth scrolling
    initSmoothScrolling();
    
    // Add some interactive effects
    initEffects();
});

function initPageTransitions() {
    // Add page transition classes
    document.body.classList.add('page-transition');
    
    // Trigger loaded state after a short delay
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
    
    // Add fade-in class to main content sections
    const sections = document.querySelectorAll('section, .page-header, .guide-container');
    sections.forEach((section, index) => {
        setTimeout(() => {
            section.classList.add('fade-in');
        }, 200 + (index * 100));
    });
    
    // Enhanced navigation with page transitions
    const internalLinks = document.querySelectorAll('a[href]:not([href^="http"]):not([href^="#"]):not([target="_blank"])');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            
            if (href && href !== '#' && !href.startsWith('javascript:')) {
                // Start page transition
                document.body.classList.remove('loaded');
                document.body.style.opacity = '0.7';
                
                // Navigate after transition
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            }
        });
    });
}

function initNavigation() {
    // Handle dropdown menus
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const dropdown = this.nextElementSibling;
            
            if (dropdown && dropdown.classList.contains('dropdown-menu')) {
                dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
            }
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-dropdown')) {
            const dropdowns = document.querySelectorAll('.dropdown-menu');
            dropdowns.forEach(dropdown => {
                dropdown.style.display = 'none';
            });
        }
    });
    
    // Context-aware job navigation
    initContextAwareJobNav();
    
    // Highlight active page
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage || 
            (currentPage.includes('index.html') && link.getAttribute('href') === 'index.html') ||
            (currentPage.endsWith('/') && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

function initContextAwareJobNav() {
    // Determine current section context
    const currentPath = window.location.pathname;
    let context = 'general'; // default
    
    if (currentPath.includes('raids.html') || currentPath.includes('raid-guides/')) {
        context = 'raids';
    } else if (currentPath.includes('main-line.html')) {
        context = 'main-line';
    } else if (currentPath.includes('crafting-gathering.html')) {
        context = 'crafting';
    }
    
    // Job mapping for different contexts
    const jobMappings = {
        // Tank jobs
        'paladin': {
            general: 'pages/jobs/paladin.html',
            raids: 'pages/raid-guides/paladin-raids.html',
            'main-line': 'pages/jobs/paladin.html',
            crafting: 'pages/jobs/paladin.html'
        },
        'warrior': {
            general: 'pages/jobs/warrior.html',
            raids: 'pages/raid-guides/warrior-raids.html',
            'main-line': 'pages/jobs/warrior.html',
            crafting: 'pages/jobs/warrior.html'
        },
        'dark-knight': {
            general: 'pages/jobs/dark-knight.html',
            raids: 'pages/raid-guides/dark-knight-raids.html',
            'main-line': 'pages/jobs/dark-knight.html',
            crafting: 'pages/jobs/dark-knight.html'
        },
        'gunbreaker': {
            general: 'pages/jobs/gunbreaker.html',
            raids: 'pages/raid-guides/gunbreaker-raids.html',
            'main-line': 'pages/jobs/gunbreaker.html',
            crafting: 'pages/jobs/gunbreaker.html'
        },
        // Healer jobs
        'white-mage': {
            general: 'pages/jobs/white-mage.html',
            raids: 'pages/raid-guides/white-mage-raids.html',
            'main-line': 'pages/jobs/white-mage.html',
            crafting: 'pages/jobs/white-mage.html'
        },
        'scholar': {
            general: 'pages/jobs/scholar.html',
            raids: 'pages/raid-guides/scholar-raids.html',
            'main-line': 'pages/jobs/scholar.html',
            crafting: 'pages/jobs/scholar.html'
        },
        'astrologian': {
            general: 'pages/jobs/astrologian.html',
            raids: 'pages/raid-guides/astrologian-raids.html',
            'main-line': 'pages/jobs/astrologian.html',
            crafting: 'pages/jobs/astrologian.html'
        },
        'sage': {
            general: 'pages/jobs/sage.html',
            raids: 'pages/raid-guides/sage-raids.html',
            'main-line': 'pages/jobs/sage.html',
            crafting: 'pages/jobs/sage.html'
        },
        // Add all other jobs...
        'monk': {
            general: 'pages/jobs/monk.html',
            raids: 'pages/raid-guides/monk-raids.html',
            'main-line': 'pages/jobs/monk.html',
            crafting: 'pages/jobs/monk.html'
        },
        'dragoon': {
            general: 'pages/jobs/dragoon.html',
            raids: 'pages/raid-guides/dragoon-raids.html',
            'main-line': 'pages/jobs/dragoon.html',
            crafting: 'pages/jobs/dragoon.html'
        },
        'ninja': {
            general: 'pages/jobs/ninja.html',
            raids: 'pages/raid-guides/ninja-raids.html',
            'main-line': 'pages/jobs/ninja.html',
            crafting: 'pages/jobs/ninja.html'
        },
        'samurai': {
            general: 'pages/jobs/samurai.html',
            raids: 'pages/raid-guides/samurai-raids.html',
            'main-line': 'pages/jobs/samurai.html',
            crafting: 'pages/jobs/samurai.html'
        },
        'reaper': {
            general: 'pages/jobs/reaper.html',
            raids: 'pages/raid-guides/reaper-raids.html',
            'main-line': 'pages/jobs/reaper.html',
            crafting: 'pages/jobs/reaper.html'
        },
        'viper': {
            general: 'pages/jobs/viper.html',
            raids: 'pages/raid-guides/viper-raids.html',
            'main-line': 'pages/jobs/viper.html',
            crafting: 'pages/jobs/viper.html'
        },
        'bard': {
            general: 'pages/jobs/bard.html',
            raids: 'pages/raid-guides/bard-raids.html',
            'main-line': 'pages/jobs/bard.html',
            crafting: 'pages/jobs/bard.html'
        },
        'machinist': {
            general: 'pages/jobs/machinist.html',
            raids: 'pages/raid-guides/machinist-raids.html',
            'main-line': 'pages/jobs/machinist.html',
            crafting: 'pages/jobs/machinist.html'
        },
        'dancer': {
            general: 'pages/jobs/dancer.html',
            raids: 'pages/raid-guides/dancer-raids.html',
            'main-line': 'pages/jobs/dancer.html',
            crafting: 'pages/jobs/dancer.html'
        },
        'black-mage': {
            general: 'pages/jobs/black-mage.html',
            raids: 'pages/raid-guides/black-mage-raids.html',
            'main-line': 'pages/jobs/black-mage.html',
            crafting: 'pages/jobs/black-mage.html'
        },
        'summoner': {
            general: 'pages/jobs/summoner.html',
            raids: 'pages/raid-guides/summoner-raids.html',
            'main-line': 'pages/jobs/summoner.html',
            crafting: 'pages/jobs/summoner.html'
        },
        'red-mage': {
            general: 'pages/jobs/red-mage.html',
            raids: 'pages/raid-guides/red-mage-raids.html',
            'main-line': 'pages/jobs/red-mage.html',
            crafting: 'pages/jobs/red-mage.html'
        },
        'pictomancer': {
            general: 'pages/jobs/pictomancer.html',
            raids: 'pages/raid-guides/pictomancer-raids.html',
            'main-line': 'pages/jobs/pictomancer.html',
            crafting: 'pages/jobs/pictomancer.html'
        },
        'blue-mage': {
            general: 'pages/jobs/blue-mage.html',
            raids: 'pages/raid-guides/blue-mage-raids.html',
            'main-line': 'pages/jobs/blue-mage.html',
            crafting: 'pages/jobs/blue-mage.html'
        }
    };
    
    // Update job links based on context
    const jobDropdownLinks = document.querySelectorAll('.dropdown-menu a[href*="jobs/"]');
    
    jobDropdownLinks.forEach(link => {
        try {
            const href = link.getAttribute('href');
            if (!href) return;
            
            const jobName = href.split('/').pop().replace('.html', '');
            
            if (jobMappings[jobName] && jobMappings[jobName][context]) {
                // Calculate relative path from current location
                let newHref = jobMappings[jobName][context];
                
                // Adjust path based on current depth
                if (currentPath.includes('raid-guides/') && !currentPath.includes('raid-guides/paladin/')) {
                    // We're in raid-guides/ directory
                    newHref = newHref.replace('pages/', '../');
                } else if (currentPath.includes('raid-guides/paladin/')) {
                    // We're in raid-guides/paladin/ directory  
                    newHref = newHref.replace('pages/', '../../');
                } else if (currentPath.includes('pages/')) {
                    // We're in pages/ directory
                    newHref = newHref.replace('pages/', '');
                } else {
                    // We're in root directory - keep as is
                    newHref = newHref;
                }
                
                link.setAttribute('href', newHref);
            }
        } catch (error) {
            console.log('Error updating link:', error);
            // Continue with other links if one fails
        }
    });
}

function initForms() {
    // Handle Q&A form submission
    const qaForm = document.querySelector('form[name="qa-form"]');
    
    if (qaForm) {
        qaForm.addEventListener('submit', function(e) {
            const recipient = document.getElementById('recipient').value;
            const question = document.getElementById('question').value;
            
            if (!recipient || !question.trim()) {
                e.preventDefault();
                alert('Please select a recipient and enter your question.');
                return;
            }
            
            // Show submission feedback
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Submitting...';
            submitBtn.disabled = true;
            
            // Re-enable after form submission (handled by Netlify)
            setTimeout(() => {
                submitBtn.textContent = 'Question Submitted! ✨';
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }, 1000);
        });
    }
}

function initSmoothScrolling() {
    // Smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function initEffects() {
    // Add hover effects to artwork placeholders
    const artworkPlaceholders = document.querySelectorAll('.artwork-placeholder');
    
    artworkPlaceholders.forEach(placeholder => {
        placeholder.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        placeholder.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add typing effect to welcome message (optional enhancement)
    const welcomeMessage = document.querySelector('.welcome-message');
    if (welcomeMessage && !sessionStorage.getItem('typingShown')) {
        typeWriter(welcomeMessage);
        sessionStorage.setItem('typingShown', 'true');
    }
    
    // Add floating animation to FC logo
    const fcLogo = document.querySelector('.fc-logo');
    if (fcLogo) {
        let direction = 1;
        setInterval(() => {
            const currentTransform = fcLogo.style.transform || 'translateY(0px)';
            const currentY = parseFloat(currentTransform.match(/translateY\((-?\d+(?:\.\d+)?)px\)/) || [0, 0])[1];
            const newY = currentY + (direction * 0.5);
            
            if (newY > 5) direction = -1;
            if (newY < -5) direction = 1;
            
            fcLogo.style.transform = `translateY(${newY}px)`;
        }, 100);
    }
}

function typeWriter(element) {
    const originalText = element.textContent;
    element.textContent = '';
    element.style.opacity = '1';
    
    let i = 0;
    const speed = 50;
    
    function type() {
        if (i < originalText.length) {
            element.textContent += originalText.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Utility function for smooth page transitions
function navigateToPage(url) {
    document.body.style.opacity = '0.8';
    setTimeout(() => {
        window.location.href = url;
    }, 200);
}

// Add some FFXIV-themed console messages for fun
console.log(`
⭐ Peeps FC Website ⭐
─────────────────────
Welcome to Eorzea, adventurer!
This website was crafted with 💙
`);

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
        // Easter egg activated!
        document.body.style.animation = 'rainbow 2s infinite';
        setTimeout(() => {
            document.body.style.animation = '';
            alert('🌟 You found the secret! May the Twelve guide your path, adventurer! 🌟');
        }, 2000);
    }
});

// Add rainbow animation for easter egg
const style = document.createElement('style');
style.textContent = `
@keyframes rainbow {
    0% { filter: hue-rotate(0deg); }
    25% { filter: hue-rotate(90deg); }
    50% { filter: hue-rotate(180deg); }
    75% { filter: hue-rotate(270deg); }
    100% { filter: hue-rotate(360deg); }
}
`;
document.head.appendChild(style);

// FAQ Toggle Function
function toggleFAQ(button) {
    const faqItem = button.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Close all other FAQ items
    document.querySelectorAll('.faq-item.active').forEach(item => {
        if (item !== faqItem) {
            item.classList.remove('active');
        }
    });
    
    // Toggle current item
    if (isActive) {
        faqItem.classList.remove('active');
    } else {
        faqItem.classList.add('active');
    }
}