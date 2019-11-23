import getCampaign from './campaignService.js';

let $hash = location.hash.split('#')[1];

let $comment_btn = document.querySelector('#send-comment');

$comment_btn.addEventListener('click', () => {
    let $comment = document.querySelector('#comment-area').value;
    submitComment($comment);
})


function submitComment(comment) {
    
};

function renderComments(data) {
    let comments = data.comments;

    console.log(comments);
}

export default renderComments;