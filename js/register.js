import { BASE_URL } from "./config.js";

// ./js/register.js
console.log("register.js cargado correctamente");
window.addEventListener("DOMContentLoaded", () => {
    console.log("DOM completamente cargado.");
    /* Referencias a elementos del DOM */

    /* Comprovando que se ha iniciado bien o que existe */
    console.log(document.querySelector("#register-link"));
    console.log(document.querySelector("#login-register-container"));
    console.log(document.querySelector("#register-container"));
    
    const loginRegisterContainer = document.querySelector("#login-register-container");
    const registerContainer = document.querySelector("#register-container");
    const registerLink = document.querySelector("#register-link");
    const loginLink = document.querySelector("#login-link");

    

    /* Inputs del registro */
    const userNameInput = document.querySelector("#username-register");
    const eventUsername = document.querySelector("#eventUsername");
    const emailInput = document.querySelector("#email-register");
    const passwordInput = document.querySelector("#password-register");
    const confirmPasswordInput = document.querySelector("#re-password-register");
    const adminCheckbox = document.querySelector("#admin-checkbox");
    const iconoMatch = document.getElementById("password-match-icon");
    const showPassword = document.getElementById("showPassword");

    /* Variables para requisitos de cumplimiento del registro */
    const May = document.querySelector("#req-mayus");
    const Min = document.querySelector("#req-minus");
    const Sig = document.querySelector("#req-signo");
    const Long = document.querySelector("#req-long");
    const RequerimentPassList = document.getElementById("password-requirements");

    /* Parte visual login/register */
    const formRegister = document.querySelector("#register-form");
    const confirmOverlay = document.querySelector("#overlay");
    const btnRegister = document.querySelector("#btnRegister");

    if (registerLink) {
        registerLink.addEventListener("click", () => {
            if (loginRegisterContainer) loginRegisterContainer.style.display = 'none';
            if (registerContainer) registerContainer.style.display = 'flex';
            if (RequerimentPassList) RequerimentPassList.style.display = 'block'; 
            formRegister.reset();
            toggleSubmitButton();
        });
    }

    if (loginLink) {
        loginLink.addEventListener("click", () => {
            if (registerContainer) registerContainer.style.display = 'none';
            if (loginRegisterContainer) loginRegisterContainer.style.display = 'flex';
            /* Ocultar requisitos de contraseña al volver al login */
            if (RequerimentPassList) RequerimentPassList.style.display = 'none'; 
            formRegister.reset(); 
            toggleSubmitButton(); // Deshabilitando el bototon registro
        });
    }

    if (userNameInput && eventUsername) {
        userNameInput.addEventListener("input", () => {
            const nameLength = userNameInput.value.length;
            if (nameLength === 0) {
                eventUsername.style.display = "none";
            } else if (nameLength < 8) {
                eventUsername.style.display = "flex";
                eventUsername.style.color = "red";
            } else {
                eventUsername.style.display = "none";
            }
            toggleSubmitButton();
        });
    }

    if (passwordInput && May && Min && Sig && Long && RequerimentPassList) {
        passwordInput.addEventListener("input", () => {
            const password = passwordInput.value;

            const PassMayus = /[A-Z]/.test(password);
            const PassMinus = /[a-z]/.test(password);
            const PassSigno = /[\W_]/.test(password);
            const PassLongitud = password.length >= 8;

            RequerimentPassList.style.display = password.length === 0 ? "none" : "block";

            May.style.color = PassMayus ? "green" : "red";
            Min.style.color = PassMinus ? "green" : "red";
            Sig.style.color = PassSigno ? "green" : "red";
            Long.style.color = PassLongitud ? "green" : "red";
            
            validateRePassword();
            toggleSubmitButton();
        });
    }

    if (showPassword && passwordInput && confirmPasswordInput) {
        showPassword.addEventListener("change", () => {
            const type = showPassword.checked ? "text" : "password";
            passwordInput.type = type;
            confirmPasswordInput.type = type;
        });
    }

    function validateRePassword() {
        if (passwordInput && confirmPasswordInput && iconoMatch) {
            if (passwordInput.value === confirmPasswordInput.value && confirmPasswordInput.value.length > 0) {
                iconoMatch.style.display = "inline";
            } else {
                iconoMatch.style.display = "none";
            }
            toggleSubmitButton();
        }
    }

    if (passwordInput) {
        passwordInput.addEventListener("input", validateRePassword);
    }

    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener("input", validateRePassword);
    }

    if (passwordInput) {
        passwordInput.addEventListener('copy', (e) => e.preventDefault());
        passwordInput.addEventListener('paste', (e) => e.preventDefault());
        passwordInput.addEventListener('cut', (e) => e.preventDefault());
    }
    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('copy', (e) => e.preventDefault());
        confirmPasswordInput.addEventListener('paste', (e) => e.preventDefault());
        confirmPasswordInput.addEventListener('cut', (e) => e.preventDefault());
    }

    function validateForm() {
        if (!userNameInput || !emailInput || !passwordInput || !confirmPasswordInput) {
            return false;
        }

        const usernameValid = userNameInput.value.length >= 8;
        const password = passwordInput.value;
        const email = emailInput.value;
        const emailValid = /\S+@\S+\.\S+/.test(email);
        const mayus = /[A-Z]/.test(password);
        const minus = /[a-z]/.test(password);
        const signo = /[\W_]/.test(password);
        const longitud = password.length >= 8;
        const passwordsMatch = password === confirmPasswordInput.value && confirmPasswordInput.value.length > 0;
        return usernameValid && mayus && minus && signo && longitud && passwordsMatch && emailValid && email.length > 0;
    }

    function toggleSubmitButton() {
        if (btnRegister) {
            btnRegister.disabled = !validateForm();
        }
    }

    if (btnRegister) {
        btnRegister.disabled = true;
    }

    if (userNameInput) userNameInput.addEventListener("input", toggleSubmitButton);
    if (passwordInput) passwordInput.addEventListener("input", toggleSubmitButton);
    if (confirmPasswordInput) confirmPasswordInput.addEventListener("input", toggleSubmitButton);
    if (emailInput) emailInput.addEventListener("input", toggleSubmitButton);
    
    if (formRegister) {
        formRegister.addEventListener("submit", (e) => {
            e.preventDefault();

            // Obtener los valores de los campos
            const name = userNameInput.value;
            const email = emailInput.value;
            const password = passwordInput.value;
            const repassword = confirmPasswordInput.value;

            // Cargar usuarios existentes de localStorage
            let Users = JSON.parse(localStorage.getItem('users')) || [];

            // Verificar si el email o nombre de usuario ya están registrados
            const UserRegisteredEmail = Users.find(user => user.email === email);
            const UserRegisteredName = Users.find(user => user.name === name);

            if(UserRegisteredEmail) {
                alert('El email ya está registrado. Por favor, usa otro email o inicia sesión.');
                return;
            }

            if(UserRegisteredName) {
                alert('El nombre de usuario ya está registrado. Por favor, elige otro nombre.');
                return;
            }
            
            // Si no hay duplicados y todo es válido, añadir el nuevo usuario
            const role = (adminCheckbox && adminCheckbox.checked) ? 'admin' : 'lector';

            Users.push({
                name: name,
                email: email,
                password: password,
                repassword: repassword,
                role: role,
            });

            localStorage.setItem('users', JSON.stringify(Users));
            
            if (confirmOverlay) {
                confirmOverlay.style.display = "flex";
            }
            // Después de unos segundos, ocultar el overlay y volver a la pantalla de login
            setTimeout(() => {
                if (confirmOverlay) {
                    confirmOverlay.style.display = "none";
                }
                // Ocultar el formulario de registro y mostrar el de login
                if (registerContainer) {
                    registerContainer.style.display = "none";
                    loginRegisterContainer.style.display = "flex";
                }
                
                // Limpiar el formulario de registro para el siguiente uso
                formRegister.reset();
                toggleSubmitButton();

            }, 3000); // 3 segs
        });
    }
});
