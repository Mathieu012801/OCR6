
// Récupération des éléments DOM
const gallery = document.getElementById('gallery'); // Élément DOM de la galerie d'images
const filterContainer = document.getElementById('filter-container'); // Élément DOM du conteneur de filtrage
const edited= document.querySelectorAll('.edited');
const galleryModal= document.querySelector('.gallery-modal');
let tokenValue = sessionStorage.token;

// Appel à l'API pour obtenir les données des œuvres
fetch('http://localhost:5678/api/works')
    .then(response => response.json()) // Convertit la réponse en format JSON
    .then(data => {
        clearGallery(); // Vide les galeries existantes
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
    optionTous.classList.add('filter-button','active');
    filterContainer.appendChild(optionTous); // Ajoute le bouton au conteneur de filtrage
    console.log(optionTous);

    optionTous.addEventListener('click', function () {
        allImages(optionTous.value); // Appelle la fonction pour afficher toutes les images
        setActiveButton(optionTous);
      

    });

    categories.forEach(category => {
        const optionElement = document.createElement('button'); // Crée un bouton pour chaque catégorie
        optionElement.value = category.id; // Définit la valeur du bouton en utilisant l'ID de la catégorie
        optionElement.textContent = category.name; // Définit le texte du bouton en utilisant le nom de la catégorie
        optionElement.classList.add('filter-button');
        filterContainer.appendChild(optionElement); // Ajoute le bouton au conteneur de filtrage
        console.log(optionElement);

        optionElement.addEventListener('click', function () {
            filterImagesCategory(optionElement.value); // Appelle la fonction pour filtrer les images par catégorie
            setActiveButton(optionElement);
      
        });
    });
}
function setActiveButton(button){
    const buttons = document.querySelectorAll('.filter-button');
    buttons.forEach(btn => {
        if(btn === button){
            btn.classList.add('active'); 
            
        }
        else{
            btn.classList.remove('active')
        }
    })
};

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

if (sessionStorage.getItem('token')) {
    loginElement.textContent = 'logout';
} else {
    loginElement.textContent = 'login';
};

loginElement.addEventListener('click', () => {
    if (sessionStorage.getItem('token')) {
        sessionStorage.removeItem('token');
        loginElement.textContent = 'Login';
    }
});

// EDITER
const editionDiv = document.querySelector('.edit_bannier');

if (sessionStorage.getItem('token')!=null) {
  edited.forEach (edit=> {
    edit.style.display=('flex');


  })
  document.querySelector('#filter-container').style.display='none';

} else {
    edited.forEach (edit => {
        edit.style.display=('none');})
  document.querySelector('#filter-container').style.display='flex';
  
}
 async function toggleModal() {
    document.querySelector('.modal-container').classList.toggle('active');
     await backToFirstModal();
  
    if (document.querySelector('.arrowback') !== null) {
      document.querySelector('.arrowback').remove();
    }
  }
  


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
        const btnDelete = document.createElement('button');
        const figcaptionElement = document.createElement('figcaption');
        const figureElement = document.createElement('figure');
        const imgElement = document.createElement('img');
        const deleteImg = document.createElement('img');

        imgElement.src = works.imageUrl;
        imgElement.alt = works.title;

        figcaptionElement.innerHTML = 'éditer';

        btnDelete.classList.add("btn-delete");
        btnDelete.appendChild(deleteImg);
        deleteImg.src = "./assets/images/vector.png";

        figureElement.appendChild(imgElement);
        figureElement.appendChild(figcaptionElement);
        figureElement.appendChild(btnDelete);

        figureElement.dataset.categoryId = works.categoryId;

        galleryModal.appendChild(figureElement);

        btnDelete.addEventListener('click', function () {
            deleteWork(works.id)
        });
    });

    
}
const deleteWork = async (id) => {
    console.log(id);
    const response = await fetch(`http://localhost:5678/api/works/${id}`, {
      method: 'DELETE',
      headers: {
        accept: "*/*",
        'Authorization': `Bearer ${tokenValue}`
      }
    });
    if (response.ok) {
      console.log('Supprimé');
      clearGallery();
      await fetch('http://localhost:5678/api/works')
      .then(response => response.json()) // Convertit la réponse en format JSON
      .then(data => {
          if(document.querySelector(".gallery-modal").firstElementChild==undefined){
              generategalerymodal(data); // Appelle la fonction pour afficher les données des œuvres
              parcourirTableau(data);
          }
        else if(response.status === "401"){
            window.location.assign("login.html");
        }
        
  
      });
    
   

      // Supprimer la figure du DOM une fois la suppression effectuée
      const figureElement = document.querySelector(`#gallery figure[data-id="${id}"]`);
      if (figureElement) {
        figureElement.remove();
      }
    } else {
      console.error(`HTTP error! Status: ${response.status}`);
    }
  };
  
// fonction pour vider les galeries existantes
function clearGallery() {
    gallery.innerHTML = '';
    galleryModal.innerHTML = '';
  }

   async function generateAddModal(){
    const modal= document.querySelector(".modal");
    const arrowBack= document.createElement("button");
    const imgArrowBack= document.createElement("img");
    const galleryModal=document.querySelector(".gallery-modal");
    const addPics=document.querySelector(".add-pics");
    const deleteA = document.querySelector(".delete-a");
    imgArrowBack.src="./assets/images/Arrow_Back.png";
    imgArrowBack.classList.add("arrowback-img");
    arrowBack.classList.add("arrowback");
    arrowBack.appendChild(imgArrowBack);
    arrowBack.addEventListener('click', backToFirstModal);
    modal.appendChild(arrowBack);
    document.querySelector(".modal-title").innerHTML="Ajout photo";
    galleryModal.style.border="none";
    galleryModal.style.padding="0";
    galleryModal.style.width="auto";
    galleryModal.innerHTML="";
    addPics.style.display="none";
    deleteA.style.display="none";
     await generateForm()
  

    
  }
  async function generateForm(){
    const galleryModal=document.querySelector(".gallery-modal");
    await fetch('http://localhost:5678/api/categories')
    .then(response => response.json()) // Convertit la réponse en format JSON
    .then(data =>{
        galleryModal.innerHTML=`<form class="modal-add">
        <label for="file-input" class="file-input">
            <i class="fa-solid fa-image"></i>
            <h4>+ Ajouter photo</h4>
            <p class="format">jpg, png : 4mo max</p>
        </label>
        <input type="file" id="file-input" accept=".jpg, .png" class="file-project" required>
        
        <label for="title_work-input">Titre</label>
        <input type="text" id="title_work-input" class="title-project" required>
        <label for="category_work-input">Catégorie</label>
            <select class="category-project" required>
            <option value='default' selected></option>`
            +
            data.map((cat)=>
            `<option value = '${cat.id}'> ${cat.name}</option>`).join("")
            + 
            `</select>
            <span></span>
            <input type="submit" class="send-pics" value="valider" disabled>
            </form>`
            
          })
          document.querySelector(".send-pics").addEventListener("click",function(e){
            e.preventDefault();
            workAdd();
           
   });
   document.querySelector('#file-input').addEventListener('input', function(e){
     e.preventDefault();
     previewLabel();
    
   });
   document.querySelector(".modal-add").addEventListener("input", BtnValidateOk);


  
    };
document.querySelector(".add-pics").addEventListener("click", function(e){
    e.preventDefault();
    generateAddModal();

})

//fonction qui va permettre de regenerer la première modal 
 async function backToFirstModal() {
    if (document.querySelector('.arrowback') !== null) {
        document.querySelector('.arrowback').remove();
      }
    galleryModal.innerHTML = '';
    document.querySelector('.delete-a').style.display = 'block';
    document.querySelector('.add-pics').setAttribute('value', 'Ajouter une photo');
    document.querySelector('.add-pics').style.display = 'inline-block';
    galleryModal.style.padding = '0px 0px 47px';
    galleryModal.style.borderBottom = '1px solid #B3B3B3';
    galleryModal.style.width = '420px';
    document.querySelector('.modal-title').innerHTML="Galerie photo";

    await  fetch('http://localhost:5678/api/works')
    .then(response => response.json()) // Convertit la réponse en format JSON
    .then(data => {
        if(document.querySelector(".gallery-modal").firstElementChild==undefined){
            generategalerymodal(data); // Appelle la fonction pour afficher les données des œuvres
        }
      

    });


  };
  
async function workAdd(){
    var titleWork= document.getElementById("title_work-input").value;
    var categoryWork=document.querySelector(".category-project").value;
    var imageWork = document.getElementById("file-input").files[0];
    var formData= new FormData();
    formData.append('image', imageWork);
    formData.append('category', categoryWork);
    formData.append('title', titleWork);

    
        const response = await fetch ('http://localhost:5678/api/works',{
            method : 'POST', 
            headers : {
                'Authorization' : `Bearer ${tokenValue}`
            }, 
            body : formData

        })
        if(response.ok){
          
            await fetch('http://localhost:5678/api/works',)
            .then(response => response.json()) // Convertit la réponse en format JSON
            .then(data => {
                clearGallery(); // Vide les galeries existantes
                backToFirstModal();
                parcourirTableau(data); // Appelle la fonction pour afficher les données des œuvres
              
        })

        }
        

    } 

    
// Fonction preview

function previewLabel() {
    const preview = document.createElement("img");
    const fileInput = document.querySelector("#file-input");
    const filePreviewElement = document.querySelector(".file-input");
    const file = fileInput.files[0];

    if (file.type === "image/png" || file.type === "image/jpg" || file.type === "image/jpeg") {

        preview.classList.add(".preview-image");
        preview.src = URL.createObjectURL(file);
        filePreviewElement.innerHTML = "";
        filePreviewElement.appendChild(preview);
        preview.style.width = "129px";
        preview.style.height = "100%";
        // effacer ou cacher un message d'erreur
    } else {
        fileInput.value = null;
        // afficher ou écrire un message d'erreur
    }
};

function BtnValidateOk() {
    const fileInput = document.querySelector("#file-input");
    const title = document.querySelector(".title-project").value;
    const cat = document.querySelector(".category-project").value;
    const sendPicsElement = document.querySelector(".send-pics");

    if (fileInput.value && title !== "" && cat !== "default") {
        sendPicsElement.classList.remove("disabled");
        sendPicsElement.classList.add("enabled");
        sendPicsElement.removeAttribute("disabled");
    } else {
        sendPicsElement.classList.add("disabled");
        sendPicsElement.classList.remove("enabled");
        sendPicsElement.setAttribute("disabled", true);
    }
};

  