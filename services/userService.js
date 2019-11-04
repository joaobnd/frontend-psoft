let $submit_button = document.querySelector('button');

$submit_button.addEventListener('click', () => {
    checkPassword();
});

function checkPassword() {
    event.preventDefault();
    let $register_password = document.querySelector('#register-password').value;
    let $register_password_confirm = document.querySelector('#register-password-confirm').value;

    if ($register_password != $register_password_confirm) {
        alert('As senhas devem coincidir.');
    } else {
        registerUser();
    }
};

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

    fetch('http://localhost:8080/v1/api/users', {
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': 'http://localhost:8000/',
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        if(!response.ok) {
            throw new Error('Não foi possível completar o cadastro');
        }
        return response.text();
    })
    .then(() => {
        alert('Usuário cadastrado com sucesso!');
        window.location.href = '../index.html';
    })
    .catch(error => {
        alert(error.message);
    });
};