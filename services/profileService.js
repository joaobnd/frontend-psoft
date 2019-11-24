let $logoutButton = document.querySelector("#logout-btn");

$logoutButton.addEventListener('click', () => {
    logout();
});

/**
 * Desloga o usuário do sistema.
 */
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    window.location.href = "index.html";
};
