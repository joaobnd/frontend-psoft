let $submit_button = document.querySelector('button');

$submit_button.addEventListener('click', () => {
    checkFields();
});

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

function submitLogin() {
    let $email = document.querySelector('#login-email').value;
    let $password = document.querySelector('#login-password').value;

    let user = {
        email: $email,
        password: $password
    };

    loadElements();

    
}

function loadElements() {
    let $loadingMsg = document.createElement('h3');
    $loadingMsg.innerHTML = 'Aguarde um momento.';
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
}