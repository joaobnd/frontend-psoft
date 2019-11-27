window.onload = () => {
    getActiveCampaigns();
}

let $filter = document.querySelector('#filter-options');

$filter.addEventListener('click', () => {
    getActiveCampaigns();
})

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
        error.message;
    });
}

function filterCampaigns(data) {
    let $filter_options = document.querySelector('#filter-options');
    let i, j, current;

    if ($filter_options.value == 'A') {
        for (i = 1; i < data.length; i++) {
            current = data[i];

            j = i;

            while((j > 0) && ((data[j - 1].goal - getCurrentValue(data[j - 1].donations)) > current.goal - getCurrentValue(data[i].donations))) {
                data[j] = data[j - 1];
                j = j - 1;       
            }
            data[j] = current;
        }
    } else if ($filter_options.value == 'B') {
        for (i = 1; i < data.length; i++) {
            current = data[i];

            j = i;

            while((j > 0) && (((data[j - 1].deadLine.substring(0, 4)) + (data[j - 1].deadLine.substring(5, 7)) + (data[j - 1].deadLine.substring(8)))
                > ((data[i].deadLine.substring(0, 4)) + (data[i].deadLine.substring(5, 7)) + (data[i].deadLine.substring(8))))) {
                data[j] = data[j - 1];
                j = j - 1;
            }
            data[j] = current;
        }
    } else {
        for (i = 1; i < data.length; i++) {
            current = data[i];

            j = i;

            while((j > 0) && ((data[j - 1].goal - getCurrentValue(data[j - 1].donations)) > current.goal - getCurrentValue(data[i].donations))) {
                data[j] = data[j - 1];
                j = j - 1;       
            }
            data[j] = current;
        }
    }

    renderCampaigns(data);
}

function renderCampaigns(array) {
    let $container = document.querySelector('#campaigns-ranking');
    $container.innerHTML = '';
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
                    <div class="campaign-unit-deadline">
                        <span>Encerra em:</span>                       
                        <p class="campaign-deadline-value">${array[i].deadLine}</p>
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
