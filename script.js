// ================================
// NAVEGACIÓN Y MENÚ MÓVIL
// ================================

const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav__link');

// Toggle menú móvil
if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('show');
    });
}

// Cerrar menú al hacer clic en un enlace
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('show')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('show');
        }
    });
});

// Cerrar menú al hacer clic fuera
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        if (navMenu.classList.contains('show')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('show');
        }
    }
});

// ================================
// NAVEGACIÓN ACTIVA AL HACER SCROLL
// ================================

const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', scrollActive);

// ================================
// HEADER EFECTO SCROLL
// ================================

const header = document.querySelector('.header');

function scrollHeader() {
    if (window.scrollY >= 100) {
        header.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.15)';
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    }
}

window.addEventListener('scroll', scrollHeader);

// ================================
// EFECTO DE REVELACIÓN AL HACER SCROLL
// ================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observar todas las tarjetas y secciones
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.historia__card, .feature__item, .meme__card, .valor__item');
    cards.forEach(card => {
        observer.observe(card);
    });
});

// ================================
// FORMULARIO DE CONTACTO
// ================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        // Aquí puedes agregar la lógica para enviar el formulario
        // Por ejemplo, usando EmailJS, Formspree, o tu propio backend
        
        // Simulación de envío
        console.log('Mensaje enviado:', {
            name,
            email,
            message
        });

        // Mostrar mensaje de confirmación
        alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
        
        // Limpiar formulario
        contactForm.reset();
    });
}

// ================================
// SMOOTH SCROLL PARA ENLACES INTERNOS
// ================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ================================
// EFECTOS PARALLAX EN HERO
// ================================

const heroSection = document.querySelector('.hero');

if (heroSection) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroContent = heroSection.querySelector('.hero__content');
        const heroImage = heroSection.querySelector('.hero__image');
        
        if (heroContent && heroImage && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroImage.style.transform = `translateY(${scrolled * 0.2}px)`;
        }
    });
}

// ================================
// CONTADOR ANIMADO (si se necesita en el futuro)
// ================================

function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    
    window.requestAnimationFrame(step);
}

// ================================
// LAZY LOADING DE IMÁGENES
// ================================

const images = document.querySelectorAll('img[data-src]');

if ('IntersectionObserver' in window) {
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

    images.forEach(img => {
        imageObserver.observe(img);
    });
} else {
    // Fallback para navegadores sin soporte
    images.forEach(img => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
    });
}

// ================================
// MOUSE TRAIL EFFECT (opcional y elegante)
// ================================

let mouseTrail = [];

function createMouseTrail(e) {
    const trail = document.createElement('div');
    trail.className = 'mouse-trail';
    trail.style.left = e.clientX + 'px';
    trail.style.top = e.clientY + 'px';
    document.body.appendChild(trail);

    setTimeout(() => {
        trail.style.opacity = '0';
        trail.style.transform = 'scale(0)';
        
        setTimeout(() => {
            trail.remove();
        }, 300);
    }, 100);
}

// Desactivado por defecto - descomentar para activar
// document.addEventListener('mousemove', createMouseTrail);

// ================================
// PREVENIR FOCUS EN ENLACES SIN HREF
// ================================

document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
    });
});

// ================================
// CONSOLE MESSAGE
// ================================

console.log('%c🐔 COCOIN - El corral te espera 🐔', 'color: #FF6B35; font-size: 20px; font-weight: bold;');
console.log('%cÚnete a nuestra comunidad en Telegram: https://t.me/cocoin', 'color: #FFC107; font-size: 12px;');

