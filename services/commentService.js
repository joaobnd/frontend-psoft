import getCampaign from './campaignService.js';
let $hash = location.hash.split('#')[1];

function renderComments(data) {
    let $container = document.querySelector('#comments-container');

    $container.innerHTML = '';

    for (let i = 0; i < data.comments.length; i++) {
        if (data.comments[i].isDeleted == false) {
            $container.innerHTML += 
            `<div class="comment-unit" id="comment-unit-${data.comments[i].id}">
                <a class="comment-profile" href="user.html#${data.comments[i].user.email}">
                    <p class="comment-username">${data.comments[i].user.firstName + ' ' + data.comments[i].user.lastName}</p>
                </a>
                <p class="comment-time">${data.comments[i].date.substring(8) + '/' + data.comments[i].date.substring(5, 7) + '/' + data.comments[i].date.substring(0, 4)}</p>
                <a class="comment-delete" id="${data.comments[i].id}">X</a>
                <p class="comment-area">${data.comments[i].text}</p>
                <button class="reply-btn" id="reply-${data.comments[i].id}">Responder</button>
                <button class="comment-reply" id="replies-${data.comments[i].id}">Mostrar respostas ▼</button>
                <div class="comment-replies" id="comment-replies-${data.comments[i].id}">
            `
            for (let j = 0; j < data.comments[i].replies.length; j++) {
                if (data.comments[i].replies[j].isDeleted == false) {
                    document.querySelector('#comment-replies-' + data.comments[i].id).innerHTML +=
                    `<div class="reply-unit">
                        <a class="reply-profile" href="user.html#${data.comments[i].replies[j].user.email}">
                            <p class="reply-username">${data.comments[i].replies[j].user.firstName + ' ' + data.comments[i].replies[j].user.lastName}</p>
                        </a>
                        <p class="reply-time">${data.comments[i].replies[j].date.substring(8) + '/' + data.comments[i].replies[j].date.substring(5, 7) + '/' + data.comments[i].replies[j].date.substring(0, 4)}</p>
                        <a class="comment-delete" id="${data.comments[i].replies[j].id}">X</a>
                        <p class="reply-area">${data.comments[i].replies[j].text}</p>
                    </div>` 
                }
            }
            document.querySelector('#comment-unit-' + data.comments[i].id).innerHTML +=
            `
                <div class="form-reply" id="form-reply-${data.comments[i].id}">
                    <input id="reply-value-${data.comments[i].id}" class="reply-value" placeholder="Digite sua resposta">
                    <button id="reply-send-btn-${data.comments[i].id}" class="reply-send-btn">Enviar</button>
                </div>
            </div>`;
        }
        $container.innerHTML += `</div>`;
    }
}

let $comment_btn = document.querySelector('#send-comment');

$comment_btn.addEventListener('click', () => {
    let $comment = document.querySelector('#comment-area').value;
    submitComment($comment);
})

function submitComment(newComment) {
    event.preventDefault();
    fetch('https://api-ajudepsoft.herokuapp.com/v1/api/campaigns/' + $hash + '/comment', {
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: newComment
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

window.addEventListener('click', listen)

function listen(e) {
    
    if (e.target.className == 'comment-delete') {
        deleteComment(e.target.id)
    } else if (e.target.className == 'comment-reply') {
        showReplies(e.target.id);
    } else if (e.target.className == 'reply-btn') {
        showReplyForm(e.target.id);
    } else if (e.target.className == 'reply-send-btn') {
        addReply(e.target.id);
    }
}

function showReplies(id) {
    let $replies = document.querySelector('#comment-replies-' + id.split('-')[1]);
    let $reply = document.querySelector('#replies-' + id.split('-')[1]);

    if ($replies.style.display == 'none') {
        $replies.style.display = 'block';
        $reply.innerHTML = 'Ocultar respostas ▲'

    } else {
        $replies.style.display = 'none';
        $reply.innerHTML = 'Mostrar respostas ▼'
    }
}

function deleteComment(idComment) {

    event.preventDefault();

    fetch('https://api-ajudepsoft.herokuapp.com/v1/api/campaigns/' + $hash + '/comment', {
        method: 'PUT',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: idComment
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
        alert('Você não é o dono desse comentário');
    })
}

function showReplyForm(id) {
    let $form_reply = document.querySelector('#form-reply-' + id.split('-')[1]);

    if ($form_reply.style.display == 'none') {
        $form_reply.style.display = 'block';
    } else {
        $form_reply.style.display = 'none'; 
    }
}

function addReply(id) {
    let $reply_value = document.querySelector('#reply-value-' + id.split('-')[3]).value;

    event.preventDefault();

    fetch('https://api-ajudepsoft.herokuapp.com/v1/api/campaigns/' + $hash + '/comment/' + id.split('-')[3], {
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: $reply_value
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
        alert('Ocorreu um erro!');
    })
}

export default renderComments;