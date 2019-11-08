let $submit_button = document.querySelector('#submit-btn');

$submit_button.addEventListener('click', () => {
    let $email = document.querySelector('#form-email').value;
    event.preventDefault();

    sendRecoveryEmail($email);
});

function sendRecoveryEmail(email) {
    
    fetch('http://localhost:8080/v1/api/users/password/new', {
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(email)
    })
    .then(response => {
        if(!response.ok) {
            if (response.status == 404) {
                alert("O e-mail inserido não está cadastrado.");
                throw new Error('Ocorreu um erro: ' + response.status);
            } else {
                alert('Ocorreu um erro: ' + response.status);
                window.location.href = 'forgot-password.html';
                throw new Error('Ocorreu um erro: ' + response.status);
            }
        }
        return response.text();
    })
    .then(() => {
        alert('Em instantes você receberá um e-mail com um link para recuperar sua senha!');
        window.location.href = '../index.html';
    })
};