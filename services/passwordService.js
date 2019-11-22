let $submit_button = document.querySelector('#submit-btn');

$submit_button.addEventListener('click', () => {
    let $email = document.querySelector('#form-email').value;
    event.preventDefault();

    if ($email == '') {
        alert('O campo de e-mail não pode estar vazio.');
    } else {
        sendRecoveryEmail($email);
    }
});

function sendRecoveryEmail(email) {
    loadElements();

    fetch('https://api-ajudepsoft.herokuapp.com/v1/api/users/password', {
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: email
    })
    .then(response => {
        let msg = "";

        if (!response.ok) {
            if (response.status == 404) {
                msg = 'O e-mail inserido não está cadastrado.';
            } else {
                msg = 'Ocorreu um erro.';
            }
            window.location.href = 'forgot-password.html';
            alert("Não foi possível completar a requisição: " + msg);
        }
        return response.text();
    })
    .then(() => {
        alert('Em instantes você receberá um e-mail com um link para recuperar sua senha!');
        window.location.href = 'index.html';
    })
    .catch(() => {
        alert('Ocorreu um erro com o servidor, tente novamente mais tarde!');
        window.location.href = 'forgot-password.html';
    });
};

function loadElements() {
    let $loadingMsg = document.createElement('h3');
    $loadingMsg.innerHTML = 'Aguarde um momento';
    $loadingMsg.style.textAlign = 'center';
    $loadingMsg.style.color = '#4a8fda';
    document.querySelector('#container-login').appendChild($loadingMsg);

    let $loadingGif = document.createElement('img');
    $loadingGif.src = '../styles/img/loading.gif'
    $loadingGif.style.height = '50px';
    $loadingGif.style.display = 'block';
    $loadingGif.style.margin = '0 auto';
    $loadingGif.style.marginTop = '10px';
    document.querySelector('#container-login').appendChild($loadingGif);
};