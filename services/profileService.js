if (localStorage.getItem('token') == null || localStorage.getItem('token') == '') {
    window.location.href = "login.html";
};

window.onload = () => {
    getProfile();
}

/**
 * Realiza uma requisição para pegar os dados de um usuário
 */
function getProfile() {
    let user_email = localStorage.getItem('email');

    fetch('https://api-ajudepsoft.herokuapp.com/v1/api/users/' + user_email, {
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json; charset=utf-8'
        }
    })
    .then(response => {
        if(response.status == 404) {
            window.location.href = 'campaigns.html';
            throw new Error('not found')
        } else if(response.status == 500) {
            window.location.href = 'index.html';
            logout();
            alert('Faça login novamente!');
        }
        response.json().then(data => {
            renderProfile(data);
            console.log(data);
        });
    })
    .catch(error => {
        logout();
        alert(error.message);
    });
}

/**
 * Renderiza os dados do usuário na tela 
 */
function renderProfile(user) {
    let $profile_fname = document.querySelector('#profile-fname');
    let $profile_lname = document.querySelector('#profile-lname');
    let $profile_email = document.querySelector('#profile-email');

    $profile_fname.innerHTML = user.firstName;
    $profile_lname.innerHTML = user.lastName;
    $profile_email.innerHTML = user.email;
}

let $submit_button = document.querySelector('#new-password-button');

$submit_button.addEventListener('click', () => {
    checkFields();
});

/**
 * Garante que os campos estão devidamente preenchidos
 */
function checkFields() {
    let $password = document.querySelector('#new-password').value;
    let $password_confirm = document.querySelector('#new-password-confirm').value;

    event.preventDefault();

    if($password == '' || $password_confirm == '') {
        alert('Os campos precisam ser preenchidos.');
    } else if($password.length < 8) {
        alert('A senha deve conter pelo menos 8 dígitos.')
    }
    else if ($password != $password_confirm) {
        alert('As senhas devem coincidir.');
    } 
    else {
        changePassword($password);
    }
};

/**
 * Realiza uma requisição para alterar a senha de um usuário já logado
 */
function changePassword(newPassword) {
    let link = 'https://api-ajudepsoft.herokuapp.com/v1/api/users/' + localStorage.getItem('email') + '/password';

    fetch(link, {
        method: 'PUT',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: newPassword
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Ocorreu um erro");
        }
        return response.text();
    })
    .then(() => {
        alert('Senha alterada com sucesso!');
        document.location.reload(true);
    })
    .catch(error => {
        error.message;
    });
};

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
