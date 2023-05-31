// Récupération des éléments DOM
const gallery = document.getElementById('gallery'); // Élément DOM de la galerie d'images
const filterContainer = document.getElementById('filter-container'); // Élément DOM du conteneur de filtrage
const edited= document.querySelectorAll('.edited');
const galleryModal= document.querySelector('.gallery-modal');

// Appel à l'API pour obtenir les données des œuvres
fetch('http://localhost:5678/api/works')
    .then(response => response.json()) // Convertit la réponse en format JSON
    .then(data => {
        parcourirTableau(data); // Appelle la fonction pour afficher les données des œuvres
})

// Fonction pour parcourir les données des œuvres et les afficher
function parcourirTableau(data) {
    data.forEach(works => {

        const figureElement = document.createElement('figure'); // Crée un élément <figure>
        const imgElement = document.createElement('img'); // Crée un élément <img>
        imgElement.src = works.imageUrl; // Définit l'URL de l'image
        imgElement.alt = works.title; // Définit l'attribut alt de l'image

        const figcaptionElement = document.createElement('figcaption'); // Crée un élément <figcaption>
        figcaptionElement.textContent = works.title; // Définit le texte du <figcaption>

        figureElement.appendChild(imgElement); // Ajoute l'élément <img> à l'élément <figure>
        figureElement.appendChild(figcaptionElement); // Ajoute l'élément <figcaption> à l'élément <figure>

        figureElement.dataset.categoryId = works.categoryId; // Associe l'ID de catégorie à l'attribut data-categoryId de l'élément <figure>

        gallery.appendChild(figureElement); // Ajoute l'élément <figure> à la galerie
      
    });
}

// Appel à l'API pour obtenir les données des catégories
fetch('http://localhost:5678/api/categories')
    .then(response => response.json()) // Convertit la réponse en format JSON
    .then(data => {
        console.log(data); // Affiche les données des catégories dans la console
        FilterOptions(data); // Appelle la fonction pour créer les options de filtrage
});

// Fonction pour créer les options de filtrage
    function FilterOptions(categories) {
    const optionTous = document.createElement('button'); // Crée un bouton pour l'option "Tous"
    optionTous.value = 'tous'; // Définit la valeur du bouton
    optionTous.textContent = 'Tous'; // Définit le texte du bouton
    filterContainer.appendChild(optionTous); // Ajoute le bouton au conteneur de filtrage
    console.log(optionTous);

    optionTous.addEventListener('click', function () {
        allImages(optionTous.value); // Appelle la fonction pour afficher toutes les images
    });

    categories.forEach(category => {
        const optionElement = document.createElement('button'); // Crée un bouton pour chaque catégorie
        optionElement.value = category.id; // Définit la valeur du bouton en utilisant l'ID de la catégorie
        optionElement.textContent = category.name; // Définit le texte du bouton en utilisant le nom de la catégorie
        filterContainer.appendChild(optionElement); // Ajoute le bouton au conteneur de filtrage
        console.log(optionElement);

        optionElement.addEventListener('click', function () {
            filterImagesCategory(optionElement.value); // Appelle la fonction pour filtrer les images par catégorie
        });
    });
}

// Fonction pour afficher toutes les images ou filtrer par catégorie
function allImages(categoryId) {
    const allImages = Array.from(document.querySelectorAll('#gallery figure')); // Récupère toutes les images de la galerie
    allImages.forEach(image => {
        if (categoryId === 'tous') {
            image.style.display = 'block'; // Affiche l'image si la catégorie sélectionnée est "tous"
        } else {
            const imageCategory = image.dataset.categoryId;
            if (imageCategory === categoryId) {
                image.style.display = 'block'; // Affiche l'image si elle appartient à la catégorie sélectionnée
            } else {
                image.style.display = 'none'; // Masque l'image si elle n'appartient pas à la catégorie sélectionnée
            }
        }
    });
}

// Fonction pour filtrer les images par catégorie
function filterImagesCategory(categoryId) {
    const allImages = Array.from(document.querySelectorAll('#gallery figure')); // Récupère toutes les images de la galerie
    allImages.forEach(image => {
        const imageCategory = image.dataset.categoryId;
        if (imageCategory === categoryId || categoryId === 'tous') {
            image.style.display = 'block'; // Affiche l'image si elle appartient à la catégorie sélectionnée ou si la catégorie sélectionnée est "tous"
        } else {
            image.style.display = 'none'; // Masque l'image si elle n'appartient pas à la catégorie sélectionnée
        }
    });
}
const loginElement = document.getElementById('logout');

if (localStorage.getItem('token')) {
    loginElement.textContent = 'logout';
} else {
    loginElement.textContent = 'login';
};

loginElement.addEventListener('click', () => {
    if (localStorage.getItem('token')) {
        localStorage.removeItem('token');
        loginElement.textContent = 'Login';
    }
});

// EDITER
const editionDiv = document.querySelector('.edit_bannier');

if (localStorage.getItem('token')!=null) {
  edited.forEach (edit=> {
    edit.style.display=('flex');


  })
  document.querySelector('#filter-container').style.display='none';

} else {
    edited.forEach (edit => {
        edit.style.display=('none');})
  document.querySelector('#filter-container').style.display='flex';
  
}
function toggleModal(){
    document.querySelector(".modal-container").classList.toggle("active");
 
    
};


document.querySelectorAll(".modal-trigger").forEach(trigger => trigger.addEventListener("click", function(){

    toggleModal();
    fetch('http://localhost:5678/api/works')
    .then(response => response.json()) // Convertit la réponse en format JSON
    .then(data => {
        if(document.querySelector(".gallery-modal").firstElementChild==undefined){
            generategalerymodal(data); // Appelle la fonction pour afficher les données des œuvres
        }
      

    });
}))

function generategalerymodal(data) {
    data.forEach(works => {
        const btnDelete= document.createElement ('button');
        const figcaptionElement = document.createElement('figcaption'); // Crée un élément <figcaption>
        const figureElement = document.createElement('figure'); // Crée un élément <figure>
        const imgElement = document.createElement('img'); // Crée un élément <img>
        const deleteImg= document.createElement('img')


      
        imgElement.src = works.imageUrl; // Définit l'URL de l'image
        imgElement.alt = works.title; // Définit l'attribut alt de l'image

        
        figcaptionElement.innerHTML = 'éditer' // Définit le texte du <figcaption>

        btnDelete.classList.add("btn-delete");
        btnDelete.appendChild(deleteImg); //ajouter l'image dans le bouton 
         deleteImg.src="./assets/images/vector.png";



        figureElement.appendChild(imgElement); // Ajoute l'élément <img> à l'élément <figure>
        figureElement.appendChild(figcaptionElement); // Ajoute l'élément <figcaption> à l'élément <figure>
        figureElement.appendChild(btnDelete);




        figureElement.dataset.categoryId = works.categoryId; // Associe l'ID de catégorie à l'attribut data-categoryId de l'élément <figure>

        galleryModal.appendChild(figureElement); // Ajoute l'élément <figure> à la galerie


      
    });

}
