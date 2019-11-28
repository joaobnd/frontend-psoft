import getCampaign from './campaignService.js';

let $hash = location.hash.split('#')[1];

/**
 * Renderiza na tela os likes da campanha
 */
function renderLikes(data) {
    let likesList = data.likes;

    let $likesCount = document.querySelector('#likes-count');
    let $likeBtn = document.querySelector('#like-btn');
    let $likeBtnHover = document.querySelector('#like-btn-hover');
    $likesCount.innerHTML = likesList.length;

    $likeBtn.style.display = 'inline';
    $likeBtnHover.style.display = 'none';

    for (let i = 0; i < likesList.length; i++) {
        if (likesList[i].email == localStorage.getItem('email')) {
            $likeBtn.style.display = 'none';
            $likeBtnHover.style.display = 'inline';
        }
    }
}

/**
 * Renderiza na tela os dislikes da campanha
 */
function renderDislikes(data) {
    let dislikesList = data.dislikes;

    let $dislikesCount = document.querySelector('#dislikes-count');
    let $dislikeBtn = document.querySelector('#dislike-btn');
    let $dislikeBtnHover = document.querySelector('#dislike-btn-hover');
    $dislikesCount.innerHTML = dislikesList.length;

    $dislikeBtn.style.display = 'inline';
    $dislikeBtnHover.style.display = 'none';

    for (let i = 0; i < dislikesList.length; i++) {
        if (dislikesList[i].email == localStorage.getItem('email')) {
            $dislikeBtn.style.display = 'none';
            $dislikeBtnHover.style.display = 'inline';
        }
    }
}

let $likeBtn = document.querySelector('#like-btn');
let $likeBtnHover = document.querySelector('#like-btn-hover');
let $dislikeBtn = document.querySelector('#dislike-btn');
let $dislikeBtnHover = document.querySelector('#dislike-btn-hover');

$likeBtn.addEventListener('click', () => {
    addLike();
});
$likeBtnHover.addEventListener('click', () => {
    addLike();
});

$dislikeBtn.addEventListener('click', () => {
    addDislike();
});
$dislikeBtnHover.addEventListener('click', () => {
    addDislike();
});

/**
 * Realiza uma requisição ao backend para dar um like em uma campanha
 */
function addLike() {
    fetch('https://api-ajudepsoft.herokuapp.com/v1/api/campaigns/' + $hash + '/like', {
        method: 'PUT',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
    .then(response => {
        if(!response.ok) {
            throw new Error('Erro');
        }
        response.json().then(() => {
            getCampaign();
        });
    })
    .catch(() => {
        alert('Ocorreu um erro com o servidor! Faça login novamente!');
        logout();
        window.location.href = 'index.html';
    })
}

/**
 * Realiza uma requisição ao backend para dar um dislike em uma campanha
 */
function addDislike() {
    fetch('https://api-ajudepsoft.herokuapp.com/v1/api/campaigns/' + $hash + '/dislike', {
        method: 'PUT',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
    .then(response => {
        if(!response.ok) {
            throw new Error('Erro');
        }
        response.json().then(() => {
            getCampaign();
        });
    })
    .catch(() => {
        alert('Ocorreu um erro com o servidor! Faça login novamente!');
        logout();
        window.location.href = 'index.html';
    })
}

/**
 * Desloga o usuário do sistema.
 */
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    window.location.href = "index.html";
};

export { renderLikes, renderDislikes };