if (localStorage.getItem('token') == null || localStorage.getItem('token') == '') {
    window.location.href = "login.html";
};

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

/**
 * Realiza uma requisição para retornas todas as campanhas com uma determinada substring
 */
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
 * Filtra de acordo com as opções do usuário
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

/**
 * Renderiza as campanhas filtradas
 */
function renderCampaigns() {
    $campaigns_div.innerHTML = '';

    if (campaignsToShow.length == 0) {
        $campaigns_div.innerHTML = '<h3>Nenhuma campanha foi encontrada</h3>'
    } else {
        $campaigns_div.innerHTML = '<h3 style="color: #4a8fda">Resultados</h3>'
    }

    for (let i = 0; i < campaignsToShow.length; i++) {
        $campaigns_div.innerHTML += 
        `<div class="campaign-unit">
            <a href="campaign.html#${campaignsToShow[i].urlId}">
                <div class="campaign-unit-img-div">
                    <img src="../styles/img/logo.png" alt="">
                </div>
                <div class="campaign-unit-data-div">
                    <div class="campaign-unit-name-div">
                        <p class="campaign-unit-name">${campaignsToShow[i].name}</p>
                    </div>
                    <div class="campaign-unit-owner-data">
                        <img src="../styles/img/profile2.png" alt="profile logo" height="40px">
                        <br>
                        <p>${campaignsToShow[i].owner.firstName + " " + campaignsToShow[i].owner.lastName}</p>
                    </div>
                    <div class="campaign-unit-goal">                     
                        <p class="campaign-goal-value">Meta: R$${campaignsToShow[i].goal},00</p>
                        <br>
                        <p class="campaign-achieved-value">Arrecadado: R$${getCurrentValue(campaignsToShow[i].donations)},00</p>
                    </div>
                    <div class="campaign-unit-deadline">
                        <span>Encerra em</span>    
                        <br>                   
                        <p class="campaign-deadline-value">${campaignsToShow[i].deadLine.substring(8) + '/' 
                                                           + campaignsToShow[i].deadLine.substring(5, 7) + '/' 
                                                           + campaignsToShow[i].deadLine.substring(0, 4)}</p>
                    </div>
                    <div class="campaign-unit-likes">
                        <span>Curtidas</span>                       
                        <p class="campaign-likes-value">${campaignsToShow[i].likes.length}</p>
                    </div>
                </div>
            </a>
        </div>`
        ;
    }
}

/**
 * Retorna o valor total arrecadado da campanha.
 */
function getCurrentValue(donations) {
    let sum = 0;

    for (let i = 0; i < donations.length; i++) {
        sum += donations[i].value;
    }
    return sum;
}

/**
 * Desloga o usuário do sistema.
 */
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    window.location.href = "index.html";
};
