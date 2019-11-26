window.onload = () => {
    getActiveCampaigns();
}

function getActiveCampaigns() {

    fetch('https://api-ajudepsoft.herokuapp.com/v1/api/campaigns/actives', {
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json; charset=utf-8'
        }
    })
    .then(response => {
        if(!response.ok) {
            throw new Error('Ocorreu um erro');
        }
        response.json().then(data => {
            console.log(data);
            filterCampaigns(data);
        });
    })
    .catch(error => {
        error.message();
    });
}

function filterCampaigns(data) {
    let $filter_options = document.querySelector('#filter-options');
    let ranking = data;
    let minIndex, temp;

    if ($filter_options.value == 'A') {
        for (let i = 0; i < ranking.length; i++) {
            minIndex = i;

            for (let j = i + 1; j < ranking.length; j++) {
                if (ranking[j].goal - getCurrentValue(ranking[j].donations) 
                    < ranking[minIndex].goal - getCurrentValue(ranking[minIndex].donations)) {
                        minIndex = j;
                } 

                if (minIndex != i) {
                    temp = ranking[i];
                    ranking[i] = ranking[minIndex];
                    ranking[minIndex] = temp;
                }
            }
        }
    } 
    renderCampaigns(ranking);
}

function renderCampaigns(array) {
    let $container = document.querySelector('#campaigns-ranking');
    let i = 0;

    while (i < 5) {
        $container.innerHTML += 
        `<div class="campaign-unit">
            <a href="campaign.html#${array[i].urlId}">
                <div class="campaign-unit-img-div">
                    <img src="../styles/img/logo.png" alt="">
                </div>
                <div class="campaign-unit-data-div">
                    <span class="campaign-unit-name">${array[i].name}</span>
                    
                    <div class="campaign-unit-owner-data">
                        <img src="../styles/img/profile.png" alt="profile logo" height="50px">
                        <p>${array[i].owner.firstName + ' ' + array[i].owner.lastName}</p>
                    </div>
                    <div class="campaign-unit-goal">
                        <span>Meta:</span>                       
                        <p class="campaign-goal-value">R$${array[i].goal},00</p>
                        <span>Arrecadado:</span>
                        <p class="campaign-achieved-value">R$${getCurrentValue(array[i].donations)},00</p>
                    </div>
                </div>
            </a>
        </div>`

        i++;
    }
}

/**
 * Retorna o valor total arrecadado da campanha.
 */
function getCurrentValue(donations) {
    let sum = 0;

    for (let i = 0; i < donations.length; i++) {
        sum += donations[i].value;
    };
    return sum;
}
