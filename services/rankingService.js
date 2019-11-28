window.onload = () => {
    getActiveCampaigns();
}

let $filter = document.querySelector('#filter-options');

$filter.addEventListener('click', () => {
    getActiveCampaigns();
})

/**
 * Retorna todas as campanhas ativas para filtrar
 */
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
            filterCampaigns(data); 
        });
    })
    .catch(error => {
        error.message;
    });
}

/**
 * Realiza uma filtragem de acordo com a opção escolhida pelo usuario na pagina principal 
 */
function filterCampaigns(data) {
    let $filter_options = document.querySelector('#filter-options');
    let i, j, current;

    if ($filter_options.value == 'A') {
        for (i = 1; i < data.length; i++) {
            current = data[i];
            j = i;

            while((j > 0) && ((data[j - 1].goal - getCurrentValue(data[j - 1].donations)) > current.goal - getCurrentValue(current.donations))) {
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
                > ((current.deadLine.substring(0, 4)) + (current.deadLine.substring(5, 7)) + (current.deadLine.substring(8))))) {
                data[j] = data[j - 1];
                j = j - 1;
            }
            data[j] = current;
        }
    } else {
        for (i = 1; i < data.length; i++) {
            current = data[i];
            j = i;

            while((j > 0) && ((data[j - 1].likes.length < current.likes.length))) {
                data[j] = data[j - 1];
                j = j - 1;       
            }
            data[j] = current;
        }
    }
    renderCampaigns(data);
}

/**
 * Renderiza as campanhas filtradas na página 
 */
function renderCampaigns(array) {
    let $container = document.querySelector('#campaigns-ranking');
    $container.innerHTML = '';
    let count = 0;

    for (let i = 0; i < array.length; i++) {
        if ((array[i].goal - getCurrentValue(array[i].donations)) > 0) {
            $container.innerHTML += 
            `<div class="campaign-unit">
                <a href="campaign.html#${array[i].urlId}">
                    <div class="campaign-unit-img-div">
                        <img src="../styles/img/logo.png" alt="">
                    </div>
                    <div class="campaign-unit-data-div">
                        <p class="campaign-unit-name">${array[i].name}</p>
                        
                        <div class="campaign-unit-owner-data">
                            <img src="../styles/img/profile2.png" alt="profile logo" height="40px">
                            <p>${array[i].owner.firstName + " " + array[i].owner.lastName}</p>
                        </div>
                        <div class="campaign-unit-goal">                     
                            <p class="campaign-goal-value">Meta: R$${array[i].goal},00</p>
                            <p class="campaign-achieved-value">Arrecadado: R$${getCurrentValue(array[i].donations)},00</p>
                        </div>
                        <div class="campaign-unit-deadline">
                            <span>Encerra em</span>                       
                            <p class="campaign-deadline-value">${array[i].deadLine.substring(8) + '/' 
                                                               + array[i].deadLine.substring(5, 7) + '/' 
                                                               + array[i].deadLine.substring(0, 4)}</p>
                        </div>
                        <div class="campaign-unit-likes">
                            <span>Curtidas</span>                       
                            <p class="campaign-likes-value">${array[i].likes.length}</p>
                        </div>
                    </div>
                </a>
            </div>`
            count ++;
        }
        if (count == 5) {
            break;
        }
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
