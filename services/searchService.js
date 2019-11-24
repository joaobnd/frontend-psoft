const $search_btn = document.querySelector('#search-btn');
const $campaigns_div = document.querySelector('#container-list-campaigns');
let localCampaigns = [];

$search_btn.addEventListener('click', () => {
    let $search_value = document.querySelector('#search-value').value;
    event.preventDefault();

    if ($search_value == '' ) {
        alert('O campo não pode estar vazio!')
    } else {
        searchCampaigns($search_value);
    }
});


function searchCampaigns(search) {
    event.preventDefault();
    
    fetch('https://api-ajudepsoft.herokuapp.com/v1/api/campaigns/search/' + search, {
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
    .then(response => {
        if(!response.ok) {
            if(response.status == 404) {
                window.location.href = 'campaigns.html';
            } else if(response.status == 500) {
                window.location.href = 'index.html';
                logout();
                alert('Faça login novamente!');
            } else {
                window.location.href = 'index.html';
                logout();
                alert('Faça login novamente');
            }
        }
        response.json().then(data => {
            console.log(data)
            localCampaigns = data;
            renderCampaigns();
        });
    })
    .catch(() => {
        alert('Ocorreu um erro com o servidor!');
    });
};

function renderCampaigns() {
    $campaigns_div.innerHTML = '';

    if (localCampaigns.length == 0) {
        $campaigns_div.innerHTML = '<h3>Nenhuma campanha foi encontrada</h3>'
    }

    for (let i = 0; i < localCampaigns.length; i++) {
        $campaigns_div.innerHTML += 
        `<div class="campaign-unit">
            <a href="campaign.html#${localCampaigns[i].urlId}">
                <div class="campaign-unit-img-div">
                    <img src="../styles/img/logo.png" height="70px" alt="">
                </div>
                <div class="campaign-unit-data-div">
                    <span class="campaign-unit-name">${localCampaigns[i].name}</span>
                    
                    <div class="campaign-unit-owner-data">
                        <img src="../styles/img/profile.png" alt="profile logo" height="50px">
                        <p>${localCampaigns[i].owner.firstName + ' ' + localCampaigns[i].owner.firstName}</p>
                    </div>
                    <div class="campaign-unit-status">
                        <span>Status:</span>                       
                        <p>${localCampaigns[i].status} </p>
                    </div>
                </div>
            </a>
        </div>`;
    }
}

/**
 * 
 */
function filter() {
    let $campaign_filter = document.querySelector('#campaign-filter');

    let $active = document.querySelector('#active-option');
    let $finished = document.querySelector('#finished-option');
    let $overdue = document.querySelector('#overdue-option');
    let $completed = document.querySelector('#completed-option');

    event.preventDefault();


    if (!$active.checked && !$finished.checked && !$overdue.checked && !$completed.checked ) {
        event.preventDefault();
        alert('Selecione pelo menos uma opção de filtragem')
    } else {
        searchCampaigns();
    }
};

/**
 * Desloga o usuário do sistema.
 */
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    window.location.href = "index.html";
};