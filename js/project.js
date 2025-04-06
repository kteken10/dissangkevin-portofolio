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