// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Close menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
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

// Hero Background and Color Cycling
const heroBgs = document.querySelectorAll('.hero-bg');
const heroOverlay = document.querySelector('.hero-overlay');
const productCircles = document.querySelectorAll('.product-circle');
const overlays = ['overlay-orange', 'overlay-blue', 'overlay-green'];
let currentHeroIndex = 0;
let heroInterval;

function updateHero(index) {
    // Update backgrounds
    heroBgs.forEach((bg, i) => {
        bg.classList.toggle('active', i === index);
    });

    // Update product circles
    productCircles.forEach((circle, i) => {
        circle.classList.toggle('active', i === index);
    });

    // Update overlay color
    heroOverlay.className = 'hero-overlay';
    if (index < overlays.length) {
        heroOverlay.classList.add(overlays[index]);
    }

    currentHeroIndex = index;
}

function startHeroRotation() {
    stopHeroRotation();
    heroInterval = setInterval(() => {
        let nextIndex = (currentHeroIndex + 1) % heroBgs.length;
        updateHero(nextIndex);
    }, 5000);
}

function stopHeroRotation() {
    if (heroInterval) {
        clearInterval(heroInterval);
    }
}

productCircles.forEach((circle, index) => {
    circle.addEventListener('click', () => {
        updateHero(index);
        startHeroRotation();
    });
});

// Initialize hero rotation
if (heroBgs.length > 0) {
    updateHero(0);
    startHeroRotation();
}

// Testimonials Carousel - Version corrigée
const track = document.getElementById('testimonialTrack');
const prevBtn = document.getElementById('prevTestimonial');
const nextBtn = document.getElementById('nextTestimonial');

if (track && prevBtn && nextBtn) {
    let currentIndex = 0;
    const cards = track.querySelectorAll('.testimonial-card');
    const totalCards = cards.length;

    // Fonction pour obtenir le nombre de cartes visibles selon la largeur d'écran
    function getCardsPerView() {
        return window.innerWidth >= 768 ? 3 : 1;
    }

    // Fonction pour calculer la largeur d'une carte + gap
    function getCardWidth() {
        const card = cards[0];
        if (!card) return 0;

        const cardWidth = card.offsetWidth;
        const gap = 24; // 1.5rem = 24px

        return cardWidth + gap;
    }

    // Fonction pour mettre à jour la position du carrousel
    function updateCarousel() {
        const cardWidth = getCardWidth();
        const offset = currentIndex * cardWidth;
        track.style.transform = `translateX(-${offset}px)`;
        updateButtons();
    }

    // Fonction pour mettre à jour l'état des boutons
    function updateButtons() {
        const cardsPerView = getCardsPerView();
        const maxIndex = Math.max(0, totalCards - cardsPerView);

        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= maxIndex;
    }

    // Bouton suivant
    nextBtn.addEventListener('click', () => {
        const cardsPerView = getCardsPerView();
        const maxIndex = Math.max(0, totalCards - cardsPerView);

        if (currentIndex < maxIndex) {
            currentIndex++;
            updateCarousel();
        }
    });

    // Bouton précédent
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    // Réinitialiser lors du redimensionnement de la fenêtre
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            const cardsPerView = getCardsPerView();
            const maxIndex = Math.max(0, totalCards - cardsPerView);

            // Ajuster l'index si nécessaire
            if (currentIndex > maxIndex) {
                currentIndex = maxIndex;
            }

            updateCarousel();
        }, 250);
    });

    // Initialiser le carrousel
    updateCarousel();
}