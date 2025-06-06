import { BASE_URL } from "./config.js";


// ./js/admin.js

document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    // Básicamente esto hace que si no estás logeado o tu rol no es 'admin', te envía directamente al inicio.html impidiendote entrar en el admin.html
    if (!loggedInUser || loggedInUser.role !== 'admin') {
        window.location.href = BASE_URL + 'inicio.html';
    }
});
