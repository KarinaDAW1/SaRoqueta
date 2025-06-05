import { BASE_URL } from "./config.js";

// ./js/articulo.js

document.addEventListener('DOMContentLoaded', () => {

  const NavetaTudors = document.querySelector(".img-articulo1");
  NavetaTudors.addEventListener('click', ()=>{
    window.location.href =  BASE_URL + 'articulo.html';
    //window.location.href = 'articulo.html';
  });



  let articles = JSON.parse(localStorage.getItem("articles")) || [
    { id: 1, numLikes: 0 },
    { id: 2, numLikes: 0 },
    { id: 3, numLikes: 0 },
    { id: 4, numLikes: 0 },
    { id: 5, numLikes: 0 },
    { id: 6, numLikes: 0 },
  ];

  let usuario_article = JSON.parse(localStorage.getItem("usuario_article")) || 
    articles.map(article => ({ id_article: article.id, nom_usuari: [] }));

  function saveData() {
    localStorage.setItem("articles", JSON.stringify(articles));
    localStorage.setItem("usuario_article", JSON.stringify(usuario_article));
  }

  function toggleLike(articleId) {
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    if (!loggedInUser) {
      alert("Debes iniciar sesión para dar like.");
      return null;
    }

    const relacion = usuario_article.find(a => a.id_article === articleId);
    const articulo = articles.find(a => a.id === articleId);
    if (!relacion || !articulo) {
      alert("No se ha encontrado el articulo");
      return null;
    }

    const userIndex = relacion.nom_usuari.indexOf(loggedInUser.name);

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

  likeButtons.forEach(button => {
    const icon = button.querySelector("i");
    const countSpan = button.querySelector(".like-count");
    const articleId = parseInt(button.dataset.id);

    // Mostrar número de likes al cargar
    const articulo = articles.find(a => a.id === articleId);
    if (articulo && countSpan) {
      countSpan.textContent = articulo.numLikes;
    }

    // Icono lleno si el usuario ya dio like
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
      const relacion = usuario_article.find(a => a.id_article === articleId);
      if (relacion && relacion.nom_usuari.includes(loggedInUser.name)) {
        icon.classList.remove("bi-heart");
        icon.classList.add("bi-heart-fill");
      }
    }

    button.addEventListener("click", function () {
      const result = toggleLike(articleId);
      const articulo = articles.find(a => a.id === articleId);
      if (!articulo) return;

      // Actualizar icono
      if (result === true) {
        icon.classList.remove("bi-heart");
        icon.classList.add("bi-heart-fill");
      } else if (result === false) {
        icon.classList.remove("bi-heart-fill");
        icon.classList.add("bi-heart");
      }

      // Actualizar contador visual
      if (countSpan) {
        countSpan.textContent = articulo.numLikes;
      }
    });
  });
});
