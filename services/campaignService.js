// if (localStorage.getItem('token') == null || localStorage.getItem('token') == '') {
//     window.location.href = "login.html";
// };

let $campaign_name = document.querySelector('#campaign-name').value;
let $description = document.querySelector('#campaign-description').value;
let $campaign_goal = document.querySelector('#campaign-goal').value;
let $campaign_deadline_day = document.querySelector('#campaign-deadline-day').value;
let $campaign_deadline_month = document.querySelector('#campaign-deadline-month').value;
let $campaign_deadline_year = document.querySelector('#campaign-deadline-year').value;
let campaign_url = generateUrl();

let $submit_btn = document.querySelector('button');

$submit_btn.addEventListener('click', () => {
    generateUrl();
});

function generateUrl() {
    let url = document.querySelector('#campaign-name').value;

    url = url.toLowerCase();
    url = url.normalize('NFD').replace(/[\u0300-\u036f]/g, '')    
                              .replace(/([^\w]+|\s+)/g, '-')
                              .replace(/\-\-+/g, ' ')
                              .replace(/(^-+|-+$)/, '');
    alert(url);
}