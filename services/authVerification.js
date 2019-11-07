/**
 * Exclui os botões de criar conta e login e cria o de perfil quando o usuário está logado
 */
function hideContent() {
    let login = document.querySelector("#login-btn");
    let register = document.querySelector("#register-btn");
    let profile = document.querySelector("profile-btn");

    // Usuário está logado
    if (localStorage.getItem("token") != null) {
        login.style.display = "none";
        register.style.display = "none";
        profile.style.display = "block";
    } else {
        login.style.display = "block"
        register.style.display = "block"
        profile.style.display = "none";
    }
};

hideContent();