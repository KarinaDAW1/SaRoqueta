import { BASE_URL } from "./config.js";


// ./js/admin.js

document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

    if (!loggedInUser || loggedInUser.role !== 'admin') {
        window.location.href = BASE_URL + 'inicio.html';
    }
});
