const filterButtons = document.querySelectorAll('[data-filter-btn]');
const filterSelectItems = document.querySelectorAll('[data-select-item]');
const filterSelect = document.querySelector('[data-select]');
const projectItems = document.querySelectorAll('[data-filter-item]');

// Filtrage des projets
function filterProjects(categoryId) {
    projectItems.forEach(item => {
        if (categoryId === 'all' || item.getAttribute('data-category-id') === categoryId) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Gestion des boutons de filtre
filterButtons.forEach(button => {
    button.addEventListener('click', function () {
        // Retirer la classe active de tous les boutons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Ajouter la classe active au bouton cliqué
        this.classList.add('active');

        // Filtrer les projets
        const categoryId = this.getAttribute('data-category-id');
        filterProjects(categoryId);
    });
});

// Gestion des éléments de la liste de sélection
filterSelectItems.forEach(item => {
    item.addEventListener('click', function () {
        const categoryId = this.getAttribute('data-category-id');
        filterProjects(categoryId);

        // Mettre à jour la valeur sélectionnée
        selectValue.textContent = this.textContent;

        // Fermer la liste déroulante
        selectList.classList.remove('active');
        filterSelect.classList.remove('active');

        // Mettre à jour le bouton actif dans la liste des filtres
        filterButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-category-id') === categoryId) {
                btn.classList.add('active');
            }
        });
    });
});

// Fermer la liste déroulante quand on clique ailleurs
document.addEventListener('click', function (e) {
    if (!filterSelect.contains(e.target) && !selectList.contains(e.target)) {
        filterSelect.classList.remove('active');
        selectList.classList.remove('active');
    }
});



projectItems.forEach((item) => {
  // Récupérer le titre du projet pour identifier le projet
  const projectTitle = item.querySelector(".project-title").textContent.trim();

  // Associer un tableau d'images spécifique à chaque projet
  let images = [];
  if (projectTitle === "Chat App") {
    images = [
      "./assets/images/chatapp/login.png",
      "./assets/images/chatapp/signup.png",
      "./assets/images/chatapp/discusion.png",
      "./assets/images/chatapp/contactad.png",
    ];
  } 
  else if (projectTitle === "Health App") {
    images = [
      "./assets/images/DeseaseCategory.png",
      "./assets/images/DeseaseCategory2.png",
    ];
  } else if (projectTitle === "Car Rental App") {
    images = [
      "./assets/images/homeCarRental.png",
      "./assets/images/homeCarRental2.png",
      "./assets/images/homeCarRental3.png",
    ];
  } else if (projectTitle === "My Shop (e-commerce)") {
    images = [
      "./assets/images/StartScreen.png",
      "./assets/images/StartScreen2.png",
      "./assets/images/StartScreen3.png",
    ];
  }

  let currentIndex = 0;

  const imgElement = item.querySelector("img");
  const counterElement = item.querySelector(".image-counter");
  const leftArrow = item.querySelector(".left-arrow");
  const rightArrow = item.querySelector(".right-arrow");

  // Fonction pour mettre à jour l'image et le compteur
  const updateImage = () => {
    if (images.length > 0) {
      imgElement.src = images[currentIndex];
      counterElement.textContent = `${currentIndex + 1}/${images.length}`;
    }
  };

  // Gestion des clics sur les flèches gauche et droite
  leftArrow.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateImage();
  });

  rightArrow.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateImage();
  });

  // Initialiser l'image et le compteur
  updateImage();
});