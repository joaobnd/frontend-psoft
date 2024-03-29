let $submit_button = document.querySelector('button');

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
    } else if ($password.length < 8) {
        alert('A senha deve conter pelo menos 8 caracteres.')
    } else if ($password != $password_confirm) {
        alert('As senhas devem coincidir.');
    } else {
        checkToken($password);
    }
};

/**
 * Pega o token da url 
 */
function checkToken(password) {
    var url = window.location.href;
    var token = url.split('?')[1].split('=')[1];

    changePassword(token,password);
};

/**
 * Realiza uma requisição para alterar a senha do usuário 
 */
function changePassword(token, newPassword) {
    loadElements();
    
    let link = 'https://api-ajudepsoft.herokuapp.com/v1/api/users/password?token=' + token;

    fetch(link, {
        method: 'PUT',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: newPassword
    })
    .then(response => {
        if (!response.ok) {
            window.location.href = 'forgot-password.html';
            alert("Este link expirou, solicite outro!");
        }
        return response.text();
    })
    .then(() => {
        alert('Senha alterada com sucesso!');
        window.location.href = 'login.html';
    })
    .catch(() => {
        alert('Ocorreu um erro com o servidor, tente novamente mais tarde!');
    });
};

/**
 * Carrega elementos gráficos na tela
 */
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