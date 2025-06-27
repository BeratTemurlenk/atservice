// Smooth scrolling voor navigatie links
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

// Modal functionaliteit
const modal = document.getElementById('contactModal');
const modalTitle = document.getElementById('modalTitle');
const closeBtn = document.querySelector('.close');

// Functie om contact informatie te tonen
function showContactInfo(jobType) {
    const jobNames = {
        'pijpfitter': 'Pijpfitter',
        'elektricien': 'Elektricien',
        'loodgieter': 'Loodgieter',
        'timmerman': 'Timmerman'
    };
    
    modalTitle.textContent = `Contact Informatie - ${jobNames[jobType]}`;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Modal sluiten
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Modal sluiten bij klik buiten modal
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// ESC toets om modal te sluiten
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= (sectionTop - 200)) {
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

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.job-card, .feature, .info-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Job card hover effects
document.querySelectorAll('.job-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Floating icons animation enhancement
const floatingIcons = document.querySelectorAll('.floating-icons i');
floatingIcons.forEach((icon, index) => {
    icon.style.animationDelay = `${index * 1.5}s`;
});

// Mobile menu toggle
const burger = document.querySelector('.burger');
if (burger) {
    burger.addEventListener('click', () => {
        const navLinksElement = document.querySelector('.nav-links');
        navLinksElement.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
    });
}

// Add loading animation for page
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Smooth reveal animation for hero section
document.addEventListener('DOMContentLoaded', () => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
        
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const floatingIconsContainer = document.querySelector('.floating-icons');
    
    if (hero && floatingIconsContainer) {
        const rate = scrolled * -0.5;
        floatingIconsContainer.style.transform = `translateY(${rate}px)`;
    }
});

// Add click-to-call functionality
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', (e) => {
        // Add confirmation for mobile devices
        if (window.innerWidth <= 768) {
            const confirmed = confirm('Wilt u bellen naar ' + link.textContent + '?');
            if (!confirmed) {
                e.preventDefault();
            }
        }
    });
});

// Add email confirmation
document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const confirmed = confirm('Wilt u een e-mail sturen naar ' + link.textContent + '?');
        if (!confirmed) {
            e.preventDefault();
        }
    });
});

// Add success message for form submission
function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(successDiv);
        }, 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .nav-links a.active {
        color: #2563eb;
    }
    
    .nav-links a.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Voeg de animatie toe aan de CSS
const heroFloatStyle = document.createElement('style');
heroFloatStyle.textContent = `
@keyframes floatHero {
    0% { transform: translateY(0) scale(1) rotate(0deg); }
    50% { transform: translateY(-18px) scale(1.08) rotate(8deg); }
    100% { transform: translateY(0) scale(1) rotate(0deg); }
}`;
document.head.appendChild(heroFloatStyle);

// Iconen diagonaal (ruitpatroon) plaatsen met 300px tussenruimte
function placeFloatingIcons() {
    const container = document.querySelector('.floating-icons');
    const heroContent = document.querySelector('.hero-content');
    const hero = document.querySelector('.hero');
    if (container && hero) {
        const iconSize = 48;
        const spacing = 300;
        const width = hero.offsetWidth;
        const height = hero.offsetHeight;
        const icons = [
            'fa-wrench',
            'fa-bolt',
            'fa-tools',
            'fa-hammer'
        ];
        container.innerHTML = '';
        let iconIndex = 0;
        let placedIcons = 0;
        // Bereken aantal kolommen en rijen
        const cols = Math.floor(width / spacing);
        const rows = Math.floor(height / spacing);
        // Bepaal bounding box van de tekst relatief aan .hero
        let textRect = {left:0,top:0,right:0,bottom:0};
        if(heroContent) {
            const contentRect = heroContent.getBoundingClientRect();
            const heroRect = hero.getBoundingClientRect();
            textRect = {
                left: contentRect.left - heroRect.left,
                top: contentRect.top - heroRect.top,
                right: contentRect.right - heroRect.left,
                bottom: contentRect.bottom - heroRect.top
            };
        }
        const yOffset = -60; // alles 60px omhoog
        for (let row = -1; row <= rows; row++) {
            for (let col = 0; col < cols; col++) {
                let x = col * spacing + (row % 2 === 0 ? 0 : spacing / 2);
                let y = row * spacing + yOffset;
                // In de eerste 500px van de hero alleen filteren als het binnen de hoogte van de tekst valt
                if (x < 500 && y + iconSize > textRect.top && y < textRect.bottom) {
                    continue;
                }
                const icon = document.createElement('i');
                icon.className = 'fas ' + icons[iconIndex % icons.length];
                iconIndex++;
                icon.style.position = 'absolute';
                icon.style.left = `${x}px`;
                icon.style.top = `${y}px`;
                icon.style.fontSize = '2.5rem';
                icon.style.color = 'rgba(255,255,255,0.3)';
                icon.style.animation = `float 6s ease-in-out infinite`;
                icon.style.animationDelay = `${Math.random() * 6}s`;
                container.appendChild(icon);
                placedIcons++;
            }
        }
        console.log('Aantal geplaatste iconen:', placedIcons);
    }
}
placeFloatingIcons();
window.addEventListener('resize', placeFloatingIcons); 