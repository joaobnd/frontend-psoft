let $hash = location.hash.split('#')[1];

if (localStorage.getItem('token') == null || localStorage.getItem('token') == '') {
    window.location.href = "login.html";
};

window.onload = () => {
    getUser();
    getUserCampaigns();
    getUserDonateCampaigns();
};

function getUser() {

    if ($hash == '' || $hash == null) {
        window.location.href = 'index.html';
    };

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
            console.log(data);
            renderUser(data);
        });
    })
    .catch(() => {
        alert('Ocorreu um erro com o servidor!');
        logout();
        window.location.href = 'index.html';
    });
}

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
            console.log(data);
            renderUserCampaigns(data);
        });
    })
    .catch(() => {
        alert('Ocorreu um erro com o servidor!');
        logout();
        window.location.href = 'index.html';
    });
}

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
            console.log(data);
            renderUserDonateCampaigns(data);
        });
    })
    .catch(() => {
        alert('Ocorreu um erro com o servidor!');
        logout();
        window.location.href = 'index.html';
    });
}

function renderUser(user) {
    let $profile_name = document.querySelector('#user-profile-name');
    let $profile_email = document.querySelector('#user-profile-email');

    $profile_name.innerHTML = user.firstName + ' ' + user.lastName;
    $profile_email.innerHTML = user.email;
}

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
}

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