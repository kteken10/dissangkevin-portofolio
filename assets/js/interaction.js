document.querySelectorAll('.project-card').forEach(card => {
    const images = card.querySelectorAll('.image-slider img');
    const leftArrow = card.querySelector('.left-arrow');
    const rightArrow = card.querySelector('.right-arrow');
    const imageTitle = card.querySelector('.image-title');
    let currentIndex = 0;

    // Fonction pour mettre à jour l'image active et le titre
    function updateImage(index) {
        images.forEach((img, i) => {
            img.classList.toggle('active', i === index);
        });
        imageTitle.textContent = images[index].getAttribute('data-title');
    }

    // Navigation à gauche
    leftArrow.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateImage(currentIndex);
    });

    // Navigation à droite
    rightArrow.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        updateImage(currentIndex);
    });

    // Initialiser avec la première image
    updateImage(currentIndex);
});