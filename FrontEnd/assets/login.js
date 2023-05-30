//  d'événement au bouton de connexion lorsque le clic se produit
document.getElementById('btnConnexion').addEventListener('click', function(event) {
  event.preventDefault(); // Empêche le comportement par défaut du formulaire

  // Récupère les valeurs des champs d'email et de mot de passe
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Crée un objet avec les données de connexion
  const loginData = {
      email: email,
      password: password
  };

  // Effectue une requête POST asynchrone vers l'API de connexion
  fetch('http://localhost:5678/api/users/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json' // Définit le type de contenu de la requête comme JSON
      },
      body: JSON.stringify(loginData) // Convertit les données de connexion en  JSON
  })
  .then(response => response.json()) // Récupère la réponse et la convertit en JSON
  .then(data => {
      // Vérifie si la réponse contient un identifiant d'utilisateur et un token 
      if (data.userId && data.token) {
          const token = data.token;

          // Stocke le token dans le stockage local du navigateur
          localStorage.setItem('token', token);

          // Redirige vers la page d'accueil
          window.location.href = './index.html';
      } else {
          // Affiche une alerte en cas de réponse invalide
          alert('Erreur de connexion : Réponse invalide');
      }
  })
  .catch(error => {
      // Affiche une erreur en cas d'échec de la requête
      console.error('Erreur lors de la requête de login:', error);
  });
});

if (localStorage.getItem("token")!=null){
    window.location.assign("index.html");
};