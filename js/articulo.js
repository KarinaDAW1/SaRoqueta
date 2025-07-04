import { BASE_URL } from "./config.js";

document.addEventListener('DOMContentLoaded', () => {

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));


  const NavetaTudors = document.querySelector(".img-articulo1");
  // Cercioramos que sea si es la imagen del articulo, entraremos al articulo al hacerle click.
  if (NavetaTudors) {
    NavetaTudors.addEventListener('click', () => {
      window.location.href = BASE_URL + 'articulo.html';
    });
  }

  // Array JSON con ID (Tengo 6 articulos pero solo uso 1) y su número de Likes.
  let articles = JSON.parse(localStorage.getItem("articles")) || [
    { id: 1, numLikes: 0 },
    { id: 2, numLikes: 0 },
    { id: 3, numLikes: 0 },
    { id: 4, numLikes: 0 },
    { id: 5, numLikes: 0 },
    { id: 6, numLikes: 0 },
  ];

  // Relación usuarios-artículos
  let usuario_article = JSON.parse(localStorage.getItem("usuario_article")) ||
    articles.map(article => ({ id_article: article.id, nom_usuari: [] }));

  // Guardar datos en localStorage
  function saveData() {
    localStorage.setItem("articles", JSON.stringify(articles));
    localStorage.setItem("usuario_article", JSON.stringify(usuario_article));
  }

  // like/dislike
  function toggleLike(articleId) {
    console.log("toggleLike ejecutado. Usuario logueado:", loggedInUser);

    // Si el usuario que no está logeado intenta dar like, no le dejará.
    if (!loggedInUser) {
      alert("Debes iniciar sesión para dar like.");
      return null;
    }

    // Hace la la comparación para filtrar. Si alguno de los dos no cumple, no encontrará el articulo.
    const relacion = usuario_article.find(a => a.id_article === articleId);
    const articulo = articles.find(a => a.id === articleId);
  
    if (!relacion || !articulo) {
      alert("No se ha encontrado el artículo");
      return null;
    }

    const userIndex = relacion.nom_usuari.indexOf(loggedInUser.name);


    // Se encarga de añadir o retirar los likes y se asegura de que nunca pase de 0 hacia abajo.
    if (userIndex !== -1) {

      relacion.nom_usuari.splice(userIndex, 1);
      articulo.numLikes = Math.max(0, articulo.numLikes - 1);
      saveData();
      return false;
    } else {

      relacion.nom_usuari.push(loggedInUser.name);
      articulo.numLikes++;
      saveData();
      return true;
    }
  }

  const likeButtons = document.querySelectorAll("button[data-id]");

  // Recorre los botones y los actualiza.
  likeButtons.forEach(button => {
    const icon = button.querySelector("i");
    const countSpan = button.querySelector(".like-count");
    const articleId = parseInt(button.dataset.id);

    // Mostrar número actual de likes
    const articulo = articles.find(a => a.id === articleId);
    if (articulo && countSpan) {
      countSpan.textContent = articulo.numLikes;
    }

    // Si el usuario ya dio like, mostrar el icono lleno
    if (loggedInUser) {
      const relacion = usuario_article.find(a => a.id_article === articleId);
      if (relacion && relacion.nom_usuari.includes(loggedInUser.name)) {
        icon.classList.remove("bi-heart");
        icon.classList.add("bi-heart-fill");
      }
    }

    button.addEventListener("click", () => {
      const result = toggleLike(articleId);
      const articulo = articles.find(a => a.id === articleId);
      if (!articulo) return;

      // Cambiar icono
      if (result === true) {
        icon.classList.remove("bi-heart");
        icon.classList.add("bi-heart-fill");
      } else if (result === false) {
        icon.classList.remove("bi-heart-fill");
        icon.classList.add("bi-heart");
      }

      // Actualizar número de likes
      if (countSpan) {
        countSpan.textContent = articulo.numLikes;
      }
    });
  });
});

