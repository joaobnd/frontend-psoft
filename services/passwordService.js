let $submit_button = document.querySelector('#submit-btn');

$submit_button.addEventListener('click', () => {
    sendRecoveryEmail();
});

function sendRecoveryEmail() {
    
    let $email = document.querySelector('#form-email').value;

    fetch('localhost:8080/v1/api/users/password/new', {
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify($email)
    })
    .then(response => {
        if(!response.ok) {
            if (response.status == 404) {
                alert('O e-mail inserido não está cadastrado.');
                throw new Error('Ocorreu um erro: ' + response.status);
            }
            alert('Ocorreu um erro.');
            window.location.href = 'forgot-password.html';
            throw new Error('Ocorreu um erro: ' + response.status);
        }
        return response.text();
    })
    .then(() => {
        alert("Em instantes você receberá um e-mail para recuperar sua senha!");
        window.location.href = 'login.html';
    });
};