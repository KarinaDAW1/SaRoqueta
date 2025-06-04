const BASE_URL = window.location.hostname === "127.0.0.1" ? "" : "/SaRoqueta/";

// ./js/admin.js

document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

    if (!loggedInUser || loggedInUser.role !== 'admin') {
        window.location.href = BASE_URL + 'inicio.html';
    }
});