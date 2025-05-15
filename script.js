document.addEventListener('DOMContentLoaded', function() {
    // Changer d'écran
    const screens = [
        'screen1.jpg',
        'screen2.jpg',
        'screen3.jpg'
    ];
    let currentScreen = 0;
    const screenElement = document.querySelector('.app-screenshot');
    
    document.getElementById('change-screen').addEventListener('click', function() {
        currentScreen = (currentScreen + 1) % screens.length;
        screenElement.classList.remove('new-screen');
        void screenElement.offsetWidth; // Déclenche le reflow
        screenElement.src = screens[currentScreen];
        screenElement.classList.add('new-screen');
    });
    
    // Basculer mode sombre
    document.getElementById('toggle-dark').addEventListener('click', function() {
        document.querySelector('.iphone-pro').classList.toggle('dark-mode');
    });
    
    // Effet 3D au mouvement de souris
    const iphone = document.querySelector('.iphone-pro');
    document.addEventListener('mousemove', function(e) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        iphone.style.transform = `
            rotateY(${(x - 0.5) * 10}deg)
            rotateX(${(0.5 - y) * 10}deg)
        `;
    });
});