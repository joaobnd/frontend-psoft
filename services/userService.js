let $submit_button = document.querySelector('button');

$submit_button.addEventListener('click', () => {
    checkFields();
});

/**
 * Checa se os campos estão preenchidos devidamente
 */
function checkFields() {
    let $fname = document.querySelector('#register-first-name').value;
    let $lname = document.querySelector('#register-last-name').value;
    let $email = document.querySelector('#register-email').value;
    let $creditcard = document.querySelector('#register-creditcard').value;
    let $password = document.querySelector('#register-password').value;
    let $password_confirm = document.querySelector('#register-password-confirm').value;

    event.preventDefault();

    if ($fname == "" || $lname == "" || $email == "" || $creditcard == "" || $password == "" || $password_confirm == "") {
        alert('Todos os campos devem ser preenchidos!');
    } else if ($password.length < 8) {
        alert('A senha deve conter pelo menos 8 caracteres.')
    } else if ($password != $password_confirm) {
        alert('As senhas devem coincidir.');
    } else {
        registerUser();
    }
};

/**
 * Realiza uma requisição para cadastrar um usuário no sistema
 */
function registerUser() {
    let $fname = document.querySelector('#register-first-name').value;
    let $lname = document.querySelector('#register-last-name').value;
    let $email = document.querySelector('#register-email').value;
    let $creditcard = document.querySelector('#register-creditcard').value;
    let $password = document.querySelector('#register-password').value;

    let user = {
    	email: $email,
        firstName: $fname,
        lastName: $lname,
        credCard: $creditcard,
        password: $password
    };

    loadElements();
    
    fetch('https://api-ajudepsoft.herokuapp.com/v1/api/users', {
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        if(!response.ok) {
            if(response.status == 409) {
                alert('O usuário com o seguinte e-mail já está cadastrado!');
                window.location.href = 'register.html';
                throw new Error('Não foi possível completar o cadastro: ' + response.status);
            } else {
                alert('Não foi possível completar o cadastro: ' + response.status);
                window.location.href = 'register.html';
                throw new Error('Não foi possível completar o cadastro: ' + response.status);
            }
        }
        return response.text();
    })
    .then(() => {
        alert('Usuário cadastrado com sucesso!');
        window.location.href = 'index.html';
    })
};

/**
 * Carrega elementos gráficos na página
 */
function loadElements() {
    let $loadingMsg = document.createElement('h3');
    $loadingMsg.innerHTML = 'Aguarde um momento';
    $loadingMsg.style.textAlign = 'center';
    $loadingMsg.style.color = '#4a8fda';
    document.querySelector('#register-form-section').appendChild($loadingMsg);

    let $loadingGif = document.createElement('img');
    $loadingGif.src = '../styles/img/loading.gif'
    $loadingGif.style.height = '50px';
    $loadingGif.style.display = 'block';
    $loadingGif.style.margin = '0 auto';
    $loadingGif.style.marginTop = '10px';
    document.querySelector('#register-form-section').appendChild($loadingGif);
};
