// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const themeToggleBtn = document.querySelector('.theme-toggle');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar Background on Scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
});

// Animate Skill Bars on Scroll
const skillBars = document.querySelectorAll('.skill-progress');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target;
            const width = progressBar.style.width;
            progressBar.style.width = '0';
            setTimeout(() => {
                progressBar.style.width = width;
            }, 100);
            skillObserver.unobserve(progressBar);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});

// Active Nav Link Highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Typing Effect for Hero Name (Optional Enhancement)
const heroName = document.querySelector('.hero-name');
if (heroName) {
    const text = heroName.textContent;
    heroName.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            heroName.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Uncomment below to enable typing effect
    // setTimeout(typeWriter, 500);
}

// Add parallax effect to home section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const homeSection = document.querySelector('.home');
    if (homeSection && scrolled < window.innerHeight) {
        homeSection.style.transform = `translateY(${scrolled * 0.5}px)`;
        homeSection.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
    }
});

// Theme toggling and persistence
const THEME_KEY = 'vb_theme';

function applyTheme(theme) {
    if (theme === 'light') {
        document.body.classList.add('light-theme');
        if (themeToggleBtn) themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        document.body.classList.remove('light-theme');
        if (themeToggleBtn) themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
    }
}

function getInitialTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
    const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    return prefersLight ? 'light' : 'dark';
}

let currentTheme = getInitialTheme();
applyTheme(currentTheme);

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        localStorage.setItem(THEME_KEY, currentTheme);
        applyTheme(currentTheme);
    });
}

// Add hover effect to cards
document.querySelectorAll('.cert-card, .project-card, .contact-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// Certificate Modal Functionality
const certificateModal = document.getElementById('certificateModal');
const certificateFrame = document.getElementById('certificateFrame');
const closeModal = document.querySelector('.close-modal');

// Function to open certificate modal
function openCertificateModal(certificateUrl, certificateTitle) {
    certificateFrame.src = certificateUrl;
    const titleElement = document.getElementById('certificateTitle');
    if (titleElement) {
        titleElement.textContent = `Certificate - ${certificateTitle}`;
    }
    certificateModal.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

// Function to close certificate modal
function closeCertificateModal() {
    certificateModal.classList.remove('show');
    document.body.style.overflow = 'auto'; // Restore scrolling
    // Clear iframe src after a delay to stop any ongoing loads
    setTimeout(() => {
        certificateFrame.src = '';
    }, 300);
}

// Add click event listeners to certification icons
document.querySelectorAll('.clickable-cert').forEach(icon => {
    icon.addEventListener('click', (e) => {
        e.stopPropagation();
        const certCard = icon.closest('.cert-card');
        const certificateUrl = certCard.getAttribute('data-certificate');
        const certificateTitle = certCard.querySelector('h3')?.textContent || 'Certificate';
        if (certificateUrl) {
            openCertificateModal(certificateUrl, certificateTitle);
        }
    });
});

// Close modal when clicking the close button
if (closeModal) {
    closeModal.addEventListener('click', closeCertificateModal);
}

// Close modal when clicking outside the modal content
certificateModal.addEventListener('click', (e) => {
    if (e.target === certificateModal) {
        closeCertificateModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && certificateModal.classList.contains('show')) {
        closeCertificateModal();
    }
});

// Console message
console.log('%cWelcome to Vaishnavi B R\'s Portfolio!', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with passion and modern web technologies', 'color: #8b5cf6; font-size: 12px;');

