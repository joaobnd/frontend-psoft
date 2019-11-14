let $submit_button = document.querySelector('button');

$submit_button.addEventListener('click', () => {
    checkFields();
});

function checkFields() {
    let $password = document.querySelector('#new-password').value;
    let $password_confirm = document.querySelector('#new-password-confirm').value;

    event.preventDefault();

    if ($password != $password_confirm) {
        alert('As senhas devem coincidir.');
    } else {
        checkToken($password);
    }
};

function checkToken(password) {
    var url = window.location.href;
    var token = url.split('?')[1].split('=')[1];

    changePassword(token,password);
};

function changePassword(token, newPassword) {
    loadElements();
    
    let link = 'http://localhost:8080/v1/api/users/password?token=' + token;

    fetch(link, {
        method: 'PUT',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: newPassword
    })
    .then(response => {
        let msg = "";

        if (!response.ok) {
            if (response.status == 403) {
                msg = 'Este link expirou, solicite outro!';
            } else {
                msg = 'Ocorreu um erro.';
            }
            window.location.href = 'forgot-password.html';
            alert("Não foi possível completar a requisição: " + msg);
        }
        return response.text();
    })
    .then(() => {
        alert('Senha alterada com sucesso!');
        window.location.href = 'login.html';
    })
    .catch(() => {
        alert(token);
        alert('Ocorreu um erro com o servidor, tente novamente mais tarde!');
        
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