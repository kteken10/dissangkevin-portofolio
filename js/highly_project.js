document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-nav.prev');
    const nextBtn = document.querySelector('.carousel-nav.next');
    const pagination = document.querySelector('.carousel-pagination');
    let currentIndex = 0;
    
    // Créer les indicateurs de pagination
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('pagination-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        pagination.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.pagination-dot');
    
    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Mettre à jour les classes actives
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentIndex);
        });
        
        // Mettre à jour les points de pagination
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
        
        // Mettre à jour l'état des boutons (sans les cacher)
        prevBtn.style.opacity = currentIndex === 0 ? 0.5 : 1;
        nextBtn.style.opacity = currentIndex === slides.length - 1 ? 0.5 : 1;
        prevBtn.style.cursor = currentIndex === 0 ? 'not-allowed' : 'pointer';
        nextBtn.style.cursor = currentIndex === slides.length - 1 ? 'not-allowed' : 'pointer';
    }
    
    function goToSlide(index) {
        if (index < 0 || index >= slides.length) return;
        currentIndex = index;
        updateCarousel();
    }
    
    function nextSlide() {
        if (currentIndex < slides.length - 1) {
            currentIndex++;
            updateCarousel();
        }
    }
    
    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    }
    
    // Écouteurs d'événements
    nextBtn.addEventListener('click', function() {
        if (currentIndex < slides.length - 1) nextSlide();
    });
    
    prevBtn.addEventListener('click', function() {
        if (currentIndex > 0) prevSlide();
    });
    
    // Support du glissement tactile
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});
    
    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, {passive: true});
    
    function handleSwipe() {
        const threshold = 50;
        if (touchEndX < touchStartX - threshold) nextSlide();
        if (touchEndX > touchStartX + threshold) prevSlide();
    }
    
    // Navigation au clavier
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
    });
    
    // Initialisation
    updateCarousel();
});