let $submit_button = document.querySelector('button');

$submit_button.addEventListener('click', () => {
    checkFields();
});

/**
 * Confere se os campos estão devidamente preenchidos para poder submeter o login
 */
function checkFields() {
    let $email = document.querySelector('#login-email').value;
    let $password = document.querySelector('#login-password').value;

    event.preventDefault();

    if ($email == "" || $password == "") {
        alert('Todos os campos devem ser preenchidos!');
    } else {
        submitLogin();
    }
}

/**
 * Submete as informações para o servidor para realizar o processo de login do usuário no sistema.
 */
function submitLogin() {
    let $email = document.querySelector('#login-email').value;
    let $password = document.querySelector('#login-password').value;

    let user = {
        email: $email,
        password: $password
    };

    loadElements();

    fetch('http://localhost:8080/v1/api/login', {
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        if(!response.ok) {
            alert('Email ou senha incorretos');
            throw new Error('Email ou senha incorretos');
        }
        return response.json();
    })
    .then(data => {
        alert('Usuário logado com sucesso!');

        localStorage.setItem('token', data.token);
        localStorage.setItem('login', $email);
        window.location.href = 'index.html';
    })
    .catch(() => {
        alert("Ocorreu um erro com o servidor, tente novamente mais tarde");
        window.location.href = 'login.html';
    });
};

/**
 * Cria os elementos de carregamento na página.
 */
function loadElements() {
    let $loadingMsg = document.createElement('h3');
    $loadingMsg.innerHTML = 'Fazendo login...';
    $loadingMsg.style.textAlign = 'center';
    $loadingMsg.style.color = '#4a8fda';
    document.querySelector('#login-form-section').appendChild($loadingMsg);

    let $loadingGif = document.createElement('img');
    $loadingGif.src = '../styles/img/loading.gif'
    $loadingGif.style.height = '50px';
    $loadingGif.style.display = 'block';
    $loadingGif.style.margin = '0 auto';
    $loadingGif.style.marginTop = '10px';
    document.querySelector('#login-form-section').appendChild($loadingGif);
};

