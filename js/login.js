import { BASE_URL } from "./config.js";
console.log("BASE_URL en login.js:", BASE_URL);

// ./js/login.js


// Cuenta predeterminada de admin
function setupDefaultAdminAccount() {
    const defaultAdmin = {
        name: 'adminKarina',
        password: 'adminpassword123.',
        repassword: 'adminpassword123.',
        role: 'admin'
    };

    let users = JSON.parse(localStorage.getItem('users')) || [];
    const adminExists = users.some(user => user.name === defaultAdmin.name);

    if (!adminExists) {
        users.push(defaultAdmin);
        localStorage.setItem('users', JSON.stringify(users));
        console.log('Cuenta de administrador "adminKarina" creada por defecto.');
    }

}
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM completamente cargado en login.js");
    console.log("Creada la cuenta admin");
    setupDefaultAdminAccount()
    const loginForm = document.querySelector('#login-form');
    loginForm.addEventListener('submit', (e)=>{
        e.preventDefault();
        const name = document.querySelector('#username-login').value;
        const password = document.querySelector('#password-login').value;

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const validarUsuario = users.find(user => user.name === name && user.password === password);
        if(!validarUsuario) {
            return alert ('Usuario y/o contraseña incorrectos');
        }

        localStorage.setItem('loggedInUser', JSON.stringify(validarUsuario));
        alert('Has ingresado correctamente tus credenciales.');

        if(validarUsuario.role === 'lector') {
            window.location.href = BASE_URL + 'inicio.html';
        } else if (validarUsuario.role === 'admin'){
            //window.location.href = 'admin.html';
            window.location.href = BASE_URL + 'admin.html';

        } 
    });

    const loginRegisterContainer = document.querySelector("#login-register-container");
    const registerContainer = document.querySelector("#register-container");
    const loginLink = document.querySelector("#login-link");

    console.log("Verificando existencia de elementos en login.js:");
    console.log(loginForm);
    console.log(loginLink);
    console.log(loginRegisterContainer);
    console.log(registerContainer);
    
    if (loginLink && registerContainer && loginRegisterContainer) {
        loginLink.addEventListener("click", () => {
            registerContainer.style.display = 'none';
            loginRegisterContainer.style.display = 'flex';
            if (loginForm) {
                loginForm.reset(); 
            }
        });
    }


});
