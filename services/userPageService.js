let $hash = location.hash.split('#')[1];
let $search_user_campaigns = document.querySelector('#search-user-campaign');
let $search_user_donate_campaigns = document.querySelector('#search-user-donate-campaign');

let localData = [];
let localDataDonate = [];

if (localStorage.getItem('token') == null || localStorage.getItem('token') == '') {
    window.location.href = "login.html";
};

window.onload = () => {
    getUser();
    getUserCampaigns();
    getUserDonateCampaigns();
};

/**
 * Realiza uma requisição para retornar um usuário a partir do email
 */
function getUser() {
    fetch('https://api-ajudepsoft.herokuapp.com/v1/api/users/' + $hash, {
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json; charset=utf-8'
        }
    })
    .then(response => {
        if(response.status == 404) {
            window.location.href = 'campaigns.html';
        } else if(response.status == 500) {
            window.location.href = 'index.html';
            logout();
            alert('Faça login novamente!');
        }
        response.json().then(data => {
            renderUser(data);
        });
    })
    .catch(() => {
        alert('Ocorreu um erro, faça login novamente!');
        logout();
        window.location.href = 'index.html';
    });
}

/**
 * Realiza uma requisição para retornar todas as campanhas do usuário
 */
function getUserCampaigns() {
    fetch('https://api-ajudepsoft.herokuapp.com/v1/api/campaigns/' + $hash + '/campaign', {
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json; charset=utf-8'
        }
    })
    .then(response => {
        if(response.status == 404) {
            window.location.href = 'campaigns.html';
        } else if(response.status == 500) {
            window.location.href = 'index.html';
            logout();
            alert('Faça login novamente!');
        }
        response.json().then(data => {
            filterUserCampaigns(data);
            localData = data;
        });
    })
}

/**
 * Realiza uma requisição para retornar todas as campanhas que o usuário realizou alguma doação
 */
function getUserDonateCampaigns() {
    fetch('https://api-ajudepsoft.herokuapp.com/v1/api/campaigns/' + $hash + '/donations', {
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json; charset=utf-8'
        }
    })
    .then(response => {
        if(response.status == 404) {
            window.location.href = 'campaigns.html';
        } else if(response.status == 500) {
            window.location.href = 'index.html';
            logout();
            alert('Faça login novamente!');
        }
        response.json().then(data => {
            filterUserDonateCampaigns(data);
            localDataDonate = data;
        });
    })
}

$search_user_campaigns.addEventListener('input', () => {
    filterUserCampaigns(localData);
});

$search_user_donate_campaigns.addEventListener('input', () => {
    filterUserDonateCampaigns(localDataDonate);
});

/**
 * Filtra as campanhas do usuário
 */
function filterUserCampaigns(array) {
    
    let $search = document.querySelector('#search-user-campaign').value;
    let tempArray = [];

    if ($search == '' || $search == null) {
        renderUserCampaigns(array);
    } else {
        for (let i = 0; i< array.length; i++) {
            if (array[i].name.toUpperCase().includes($search.toUpperCase())) {
                tempArray.push(array[i]);
            } else if (array[i].description.toUpperCase().includes($search.toUpperCase())) {
                tempArray.push(array[i]);
            }
        }
        renderUserCampaigns(tempArray);
    }
}

/**
 * Filtra as campanhas que o usuário realizou alguma doação
 */
function filterUserDonateCampaigns(array) {
    
    let $search = document.querySelector('#search-user-donate-campaign').value;
    let tempArray = [];

    if ($search == '' || $search == null) {
        renderUserDonateCampaigns(array);
    } else {
        for (let i = 0; i< array.length; i++) {
            if (array[i].name.toUpperCase().includes($search.toUpperCase())) {
                tempArray.push(array[i]);
            } else if (array[i].description.toUpperCase().includes($search.toUpperCase())) {
                tempArray.push(array[i]);
            }
        }
        renderUserDonateCampaigns(tempArray);
    }
}

/**
 * Renderiza as informações do usuário na página 
 */
function renderUser(user) {
    let $profile_name = document.querySelector('#user-profile-name');
    let $profile_email = document.querySelector('#user-profile-email');

    $profile_name.innerHTML = user.firstName + ' ' + user.lastName;
    $profile_email.innerHTML = user.email;
}

/**
 * Renderiza as campanhas do usuário na página 
 */
function renderUserCampaigns(array) {
    let $user_campaigns = document.querySelector('#user-campaigns');
    $user_campaigns.innerHTML = '';

    for (let i = 0; i < array.length; i++) {
        $user_campaigns.innerHTML += 
        `<div class="campaign-unit">
            <a href="campaign.html#${array[i].urlId}">
                <div class="campaign-unit-img-div">
                    <img src="../styles/img/logo.png" alt="">
                </div>
                <div class="campaign-unit-data-div">
                    <div class="campaign-unit-name-div">
                        <p class="campaign-unit-name">${array[i].name}</p>
                    </div>
                    <div class="campaign-unit-goal">                     
                        <p class="campaign-goal-value">Meta: R$${array[i].goal},00</p>
                        <br>
                        <p class="campaign-achieved-value">Arrecadado: R$${getCurrentValue(array[i].donations)},00</p>
                    </div>
                    <div class="campaign-unit-deadline">
                        <span>Encerra em</span>    
                        <br>                   
                        <p class="campaign-deadline-value">${array[i].deadLine.substring(8) + '/' 
                                                        + array[i].deadLine.substring(5, 7) + '/' 
                                                        + array[i].deadLine.substring(0, 4)}</p>
                    </div>
                    <div class="campaign-unit-description">                       
                        <p class="campaign-description">${array[i].description}</p>
                    </div>
                </div>
            </a>
        </div>`
    }

    if (array.length == 0) {
        $user_campaigns.innerHTML += 
        `<h3>Nenhum resultado encontrado.</h3>`
    }
}

/**
 * Renderiza as campanhas que o usuário realizou alguma doação
 */
function renderUserDonateCampaigns(array) {
    let $user_donate_campaigns = document.querySelector('#user-donate-campaigns');
    $user_donate_campaigns.innerHTML = '';

    for (let i = 0; i < array.length; i++) {
        $user_donate_campaigns.innerHTML += 
        `<div class="campaign-unit">
            <a href="campaign.html#${array[i].urlId}">
                <div class="campaign-unit-img-div">
                    <img src="../styles/img/logo.png" alt="">
                </div>
                <div class="campaign-unit-data-div">
                    <div class="campaign-unit-name-div">
                        <p class="campaign-unit-name">${array[i].name}</p>
                    </div>
                    <div class="campaign-unit-goal">                     
                        <p class="campaign-goal-value">Meta: R$${array[i].goal},00</p>
                        <br>
                        <p class="campaign-achieved-value">Arrecadado: R$${getCurrentValue(array[i].donations)},00</p>
                    </div>
                    <div class="campaign-unit-deadline">
                        <span>Encerra em</span>    
                        <br>                   
                        <p class="campaign-deadline-value">${array[i].deadLine.substring(8) + '/' 
                                                        + array[i].deadLine.substring(5, 7) + '/' 
                                                        + array[i].deadLine.substring(0, 4)}</p>
                    </div>
                    <div class="campaign-unit-description">                       
                        <p class="campaign-description">${array[i].description}</p>
                    </div>
                </div>
            </a>
        </div>`
    }
    if (array.length == 0) {
        $user_donate_campaigns.innerHTML += 
        `<h3>Nenhum resultado encontrado.</h3>`
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