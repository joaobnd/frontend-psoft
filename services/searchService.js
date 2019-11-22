const $search_btn = document.querySelector('#search-btn');
const $campaigns_div = document.querySelector('#container-list');

$search_btn.addEventListener('click', () => {
    checkFields();
});

function searchCampaign(states) {
    let $search_value = document.querySelector('#search-value').value;
    
    fetch('https://api-ajudepsoft.herokuapp.com/v1/api/campaigns', {
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
            str: $search_value,
            status: states
        })
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
        });
    })
    .catch(error => {
        alert('Ocorreu um erro com o servidor!');
        window.location.href = 'index.html';
    });
};

function checkFields() {
    event.preventDefault();
    let states = [];

    let $active = document.querySelector('#active-option');
    let $finished = document.querySelector('#finished-option');
    let $overdue = document.querySelector('#overdue-option');
    let $completed = document.querySelector('#completed-option');

    if (!$active.checked && !$finished.checked && !$overdue.checked && !$completed.checked ) {
        event.preventDefault();
        alert('Selecione pelo menos uma opção de filtragem')
    } else {
        if ($active.checked) {
            states.push('Ativa');
        }
        if ($finished.checked) {
            states.push('Encerrada');
        }
        if ($overdue.checked) {
            states.push('Vencida');
        }
        if ($completed.checked) {
            states.push('Concluida');
        }
        searchCampaign(states);
    }
};
