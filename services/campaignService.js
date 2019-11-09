// if (localStorage.getItem('token') == null || localStorage.getItem('token') == '') {
//     window.location.href = "login.html";
// };

let $campaign_goal = document.querySelector('#campaign-goal');

$campaign_goal.addEventListener('keyup', () => {
    formatarMoeda();
});

function formatToCurrency() {
    var element = document.getElementById('campaign-goal').value;

}