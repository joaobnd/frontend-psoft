import getCampaign from './campaignService.js';
let $hash = location.hash.split('#')[1];

let $comment_btn = document.querySelector('#send-comment');

$comment_btn.addEventListener('click', () => {
    let $comment = document.querySelector('#comment-area').value;
    submitComment($comment);
})


function submitComment(comment) {
    fetch('https://api-ajudepsoft.herokuapp.com/v1/api/campaigns/'+ $hash + '/comment', {
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(comment)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Não foi possivel postar o comentário!");
        }
        return response.text();
    })
    .then(() => {
        getCampaign();
    })
    .catch(error => {
        alert(error.message);
    });
};

function renderComments(data) {
    let comments = data.comments;

    console.log(comments);
}

export default renderComments;