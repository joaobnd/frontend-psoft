const $search_btn = document.querySelector('#search-btn');
let $campaign_filter = document.querySelector('#campaign-filter');

let $active = document.querySelector('#active-option');
let $finished = document.querySelector('#finished-option');
let $overdue = document.querySelector('#overdue-option');
let $completed = document.querySelector('#completed-option');

const $campaigns_div = document.querySelector('#container-list-campaigns');
let localCampaigns = [];
let campaignsToShow = [];

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
            filter();
        });
    })
    .catch(() => {
        alert('Ocorreu um erro com o servidor!');
    });
};

$active.addEventListener('click', () => {
    filter();
})

$finished.addEventListener('click', () => {
    filter();
})

$overdue.addEventListener('click', () => {
    filter();
})

$completed.addEventListener('click', () => {
    filter();
})

/**
 * 
 */
function filter() {
    campaignsToShow = [];
    $campaign_filter.style.display = 'block';

    for (let i = 0; i < localCampaigns.length; i++) {
        if($active.checked) {
            if(localCampaigns[i].status == 'Ativa') {
                campaignsToShow.push(localCampaigns[i]);
            }
        } 
        if($finished.checked) {
            if(localCampaigns[i].status == 'Encerrada') {
                campaignsToShow.push(localCampaigns[i]);
            }
        } 
        if($overdue.checked) {
            if(localCampaigns[i].status == 'Vencida') {
                campaignsToShow.push(localCampaigns[i]);
            }
        } 
        if($completed.checked) {
            if(localCampaigns[i].status == 'Concluida') {
                campaignsToShow.push(localCampaigns[i]);
            }
        }
    }
    renderCampaigns();
};


function renderCampaigns() {
    $campaigns_div.innerHTML = '';

    if (campaignsToShow.length == 0) {
        $campaigns_div.innerHTML = '<h3>Nenhuma campanha foi encontrada</h3>'
    }

    for (let i = 0; i < campaignsToShow.length; i++) {
        $campaigns_div.innerHTML += 
        `<div class="campaign-unit">
            <a href="campaign.html#${campaignsToShow[i].urlId}">
                <div class="campaign-unit-img-div">
                    <img src="../styles/img/logo.png" height="70px" alt="">
                </div>
                <div class="campaign-unit-data-div">
                    <span class="campaign-unit-name">${campaignsToShow[i].name}</span>
                    
                    <div class="campaign-unit-owner-data">
                        <img src="../styles/img/profile.png" alt="profile logo" height="50px">
                        <p>${campaignsToShow[i].owner.firstName + ' ' + campaignsToShow[i].owner.lastName}</p>
                    </div>
                    <div class="campaign-unit-status">
                        <span>Status:</span>                       
                        <p>${campaignsToShow[i].status} </p>
                    </div>
                </div>
            </a>
        </div>`;
    }
}

/**
 * Desloga o usuário do sistema.
 */
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    window.location.href = "index.html";
};