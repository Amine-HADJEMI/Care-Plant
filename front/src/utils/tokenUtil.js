export const setToken = (token) => {
  // Logique pour stocker le token dans le client (par exemple, cookies, stockage local, etc.)
  // Assurez-vous d'adapter cette fonction en fonction de votre environnement et de votre méthode de stockage préférée
  // Exemple avec le stockage local :
  sessionStorage.setItem("token", token);
};
