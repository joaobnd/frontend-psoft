/**
 * Cadastra um usuario no sistema
 */
function registerUser() {
    let $fname = document.getElementById("register-first-name").value;
    let $lname = document.getElementById("register-last-name").value;
    let $email = document.getElementById("register-email").value;
    let $credicard = document.getElementById("register-credicard").value;
    let $password = document.getElementById("register-password").value;

    let data = {
        fname: $fname,
        lname: $lname,
        email: $email,
        credicard: $credicard,
        password: $password
    };

    
};

function confirmPassword() {
    let $password = document.getElementById("register-password").value;
    let $password_confirm = document.getElementById("register-password-confirm").value;

    if ($password != $password_confirm) {
        alert("As senhas devem coincidir!");
    } else {
        registerUser();
    }
};