// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Navbar Background Change on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'var(--white)';
        navbar.style.backdropFilter = 'none';
    }
});

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe service cards
document.querySelectorAll('.service-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.animationDelay = `${index * 0.1}s`;
    observer.observe(card);
});

// Observe gallery items
document.querySelectorAll('.gallery-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.animationDelay = `${index * 0.1}s`;
    observer.observe(item);
});

// Observe info cards
document.querySelectorAll('.info-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.animationDelay = `${index * 0.15}s`;
    observer.observe(card);
});

// Form Submission Handler
const appointmentForm = document.getElementById('appointmentForm');

appointmentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value;
    
    // Create success message
    const successMessage = document.createElement('div');
    successMessage.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #d4af37, #c9a961);
        color: white;
        padding: 2rem 3rem;
        border-radius: 15px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        text-align: center;
        z-index: 10000;
        animation: fadeInUp 0.5s ease-out;
    `;
    
    successMessage.innerHTML = `
        <i class="fas fa-check-circle" style="font-size: 3rem; margin-bottom: 1rem;"></i>
        <h3 style="margin-bottom: 0.5rem;">Appointment Request Received!</h3>
        <p>Thank you, ${name}! We'll contact you shortly at ${email} to confirm your ${getServiceName(service)} appointment.</p>
    `;
    
    document.body.appendChild(successMessage);
    
    // Reset form
    appointmentForm.reset();
    
    // Remove message after 5 seconds
    setTimeout(() => {
        successMessage.style.animation = 'fadeOutDown 0.5s ease-out';
        setTimeout(() => {
            document.body.removeChild(successMessage);
        }, 500);
    }, 5000);
});

// Helper function to get service name
function getServiceName(serviceValue) {
    const services = {
        'hair-styling': 'Hair Styling',
        'spa': 'Spa Treatment',
        'nails': 'Manicure & Pedicure',
        'facial': 'Facial Treatment',
        'makeup': 'Makeup Services',
        'treatment': 'Hair Treatment'
    };
    return services[serviceValue] || 'selected';
}

// Add fade out animation keyframe dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOutDown {
        from {
            opacity: 1;
            transform: translate(-50%, -50%);
        }
        to {
            opacity: 0;
            transform: translate(-50%, -40%);
        }
    }
`;
document.head.appendChild(style);

// Active Navigation Link Highlight
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Gallery Item Click - Zoom Effect
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        const imgSrc = this.querySelector('img').src;
        
        // Create modal
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            cursor: pointer;
            animation: fadeIn 0.3s ease-out;
        `;
        
        const img = document.createElement('img');
        img.src = imgSrc;
        img.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            border-radius: 10px;
            box-shadow: 0 0 50px rgba(212, 175, 55, 0.5);
            animation: zoomIn 0.3s ease-out;
        `;
        
        modal.appendChild(img);
        document.body.appendChild(modal);
        
        // Close on click
        modal.addEventListener('click', () => {
            modal.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        });
    });
});

// Add additional animation keyframes
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    @keyframes zoomIn {
        from {
            opacity: 0;
            transform: scale(0.5);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    .nav-link.active {
        color: var(--primary-color);
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(additionalStyles);

// Loading Animation
window.addEventListener('load', () => {
    document.body.style.overflow = 'auto';
});

console.log('Luxe Beauty Salon - Website Loaded Successfully! ✨');
