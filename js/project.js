document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('[data-filter-btn]');
  const projectItems = document.querySelectorAll('[data-filter-item]');
  const demoButtons = document.querySelectorAll('.demo-btn');
  const demoModal = document.getElementById('demo-modal');
  const closeModal = document.querySelector('.close-modal');
  const demoVideo = document.getElementById('demo-video');
  const modalTitle = document.querySelector('.modal-title');

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
      button.addEventListener('click', function() {
          // Retirer la classe active de tous les boutons
          filterButtons.forEach(btn => btn.classList.remove('active'));
          // Ajouter la classe active au bouton cliqué
          this.classList.add('active');

          // Filtrer les projets
          const categoryId = this.getAttribute('data-category-id');
          filterProjects(categoryId);
      });
  });

  // Gestion des projets avec images multiples
  projectItems.forEach((item) => {
    const projectTitle = item.querySelector(".project-title").textContent.trim();
    
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

    const updateImage = () => {
      if (images.length > 0 && imgElement && counterElement) {
        imgElement.src = images[currentIndex];
        counterElement.textContent = `${currentIndex + 1}/${images.length}`;
      }
    };

    if (leftArrow) {
      leftArrow.addEventListener("click", (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateImage();
      });
    }

    if (rightArrow) {
      rightArrow.addEventListener("click", (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % images.length;
        updateImage();
      });
    }

    updateImage();
  });

  // Gestion des démos vidéo
  const demoVideos = {
    'chat-app': './assets/videos/chat-app-demo.mp4',
    'health-app': './assets/videos/health-app-demo.mp4',
    'car-rental': './assets/videos/car-rental-demo.mp4',
    'e-commerce': './assets/videos/e-commerce-demo.mp4'
  };

  if (demoButtons.length > 0) {
    demoButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        const projectId = this.getAttribute('data-project');
        const projectTitle = this.closest('.project-item').querySelector('.project-title').textContent;
        
        // Charger la vidéo correspondante
        if (demoVideos[projectId] && demoVideo && modalTitle && demoModal) {
          demoVideo.src = demoVideos[projectId];
          modalTitle.textContent = `${projectTitle} Demo`;
          demoModal.style.display = 'block';
          document.body.style.overflow = 'hidden';
        } else {
          alert('Demo video not available for this project yet.');
        }
      });
    });
  }

  // Fermer la modal
  if (closeModal) {
    closeModal.addEventListener('click', function() {
      if (demoModal && demoVideo) {
        demoModal.style.display = 'none';
        demoVideo.pause();
        document.body.style.overflow = 'auto';
      }
    });
  }

  // Fermer la modal en cliquant à l'extérieur
  window.addEventListener('click', function(event) {
    if (demoModal && event.target === demoModal) {
      demoModal.style.display = 'none';
      if (demoVideo) demoVideo.pause();
      document.body.style.overflow = 'auto';
    }
  });
});