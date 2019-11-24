if (localStorage.getItem('token') == null || localStorage.getItem('token') == '') {
    window.location.href = "login.html";
};

window.onload = () => {
    getProfile();
}

function getProfile() {
    let user_email = localStorage.getItem('email');

    fetch('https://api-ajudepsoft.herokuapp.com/v1/api/users/' + user_email, {
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json; charset=utf-8'
        }
    })
    .then(response => {
        if(response.status == 404) {
            window.location.href = 'campaigns.html';
            throw new Error('not found')
        } else if(response.status == 500) {
            window.location.href = 'index.html';
            logout();
            alert('Faça login novamente!');
        }
        response.json().then(data => {
            renderProfile(data);
            console.log(data);
        });
    })
    .catch(error => {
        alert(error.message);
    });
}

function renderProfile(user) {
    let $profile_fname = document.querySelector('#profile-fname');
    let $profile_lname = document.querySelector('#profile-lname');
    let $profile_email = document.querySelector('#profile-email');

    $profile_fname.value = user.firstName;
    $profile_lname.value = user.lastName;
    $profile_email.value = user.email;
}

let $logoutButton = document.querySelector("#logout-btn");

$logoutButton.addEventListener('click', () => {
    logout();
});

/**
 * Desloga o usuário do sistema.
 */
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    window.location.href = "index.html";
};
