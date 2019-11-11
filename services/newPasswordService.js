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
        alert('OK');
    }
};