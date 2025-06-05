import { BASE_URL } from "./config.js";

// ./js/menu.js


document.addEventListener('DOMContentLoaded', () => {
    /* Referencias a elementos del menú responsivo */
    const navMenu = document.querySelector("#nav");
    const btnOpen = document.querySelector("#abrir");
    const btnClose = document.querySelector("#cerrar");

    /* Referencias a los elementos de los enlaces del menú */
    const menuItemInicio = document.querySelector("#menu-inicio");
    const menuItemHistory = document.querySelector("#menu-history");
    const menuItemLogin = document.querySelector("#menu-login");
    const adminLink = document.querySelector("#adminLink");

    const logoutBtn = document.getElementById("logoutButtonNav");
    const loggedInInfo = document.querySelector("#loggedInInfo");
    const adminLinkContainer = document.querySelector("#adminLinkContainer");

    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    /* Funcionalidad del menú abrir/cerrar */
    if (btnOpen) {
        btnOpen.addEventListener("click", () => {
            navMenu?.classList.add("visible");
        });
    }

    if (btnClose) {
        btnClose.addEventListener("click", () => {
            navMenu?.classList.remove("visible");
        });
    }

    /* Navegación por el menú */
    if (menuItemInicio) {
        menuItemInicio.addEventListener("click", () => {
            //window.location.href = "inicio.html";
            window.location.href = BASE_URL + "inicio.html";
        });
    }

    if (menuItemHistory) {
        menuItemHistory.addEventListener("click", () => {
            //window.location.href = "articulo.html";
            window.location.href = BASE_URL + "articulo.html";
        });
    }

    if (menuItemLogin) {
        menuItemLogin.addEventListener("click", () => {
            //window.location.href = "login.html";
            window.location.href = BASE_URL + "login.html";
        });
    }

    if (adminLink) {
        adminLink.addEventListener("click", () => {
            //window.location.href = "admin.html";
            window.location.href = BASE_URL + "admin.html";
        });
    }

    /* Botón de cerrar sesión */
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            sessionStorage.removeItem("loggedInUser");

            // Ocultar menú de sesión y mostrar login
            if (loggedInInfo) loggedInInfo.style.display = "none";
            if (adminLinkContainer) adminLinkContainer.style.display = "none";
            if (menuItemLogin) menuItemLogin.style.display = "block";
            if (logoutBtn) logoutBtn.style.display = "none";

            //window.location.href = "inicio.html";
            window.location.href = BASE_URL + "inicio.html";
        });
    }

    /* Proteger página admin */
    if (!loggedInUser || loggedInUser.role !== 'admin') {
        if (window.location.pathname.includes("/admin.html")) {
            //window.location.href = "inicio.html";
            window.location.href = BASE_URL + "inicio.html";
        }
    }

    /* Mostrar elementos según el rol */
    if (loggedInUser) {
        if (loggedInUser.role === 'admin') {
            if (adminLinkContainer) {
                adminLinkContainer.style.display = 'block';
            }
            if (loggedInInfo){
                loggedInInfo.style.display = "block";
            }
            if (logoutBtn) {
                logoutBtn.style.display = "block";
            }
            if (menuItemLogin) {
                menuItemLogin.style.display = "none";
            }
        } else if (loggedInUser.role === 'lector') {
            if (adminLinkContainer) {
                adminLinkContainer.style.display = 'none';
            }
            if (loggedInInfo) {
                loggedInInfo.style.display = "block";
            }
            if (logoutBtn) {
                logoutBtn.style.display = "block";
            }
            if (menuItemLogin) {
                menuItemLogin.style.display = "none";
            } 
        }
    } else {
        if (adminLinkContainer) {
            adminLinkContainer.style.display = 'none';
        }
        if (loggedInInfo) {
            loggedInInfo.style.display = "none";
        }
        if (logoutBtn) {
            logoutBtn.style.display = "none";
        }
        if (menuItemLogin) {
            menuItemLogin.style.display = "block";
        }
    }

    /* Expiración de sesión tras 2 minutos */
    if (loggedInUser && (loggedInUser.role === 'admin' || loggedInUser.role === 'lector')) {
        setTimeout(() => {
            localStorage.removeItem('loggedInUser');
            alert("Tu sesión ha expirado. Debes volver a iniciar sesión.");
            //window.location.href = "inicio.html";
            window.location.href = BASE_URL + "inicio.html";
        }, 120000); // 2 minutos
    }
});
