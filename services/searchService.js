const $search_btn = document.querySelector('#search-btn');
const $campaigns_div = document.querySelector('#container-list');

$search_btn.addEventListener('click', () => {
    checkFields();
});

function searchCampaign() {
    let $search_value = document.querySelector('#search-value').value;
    let $states = [];

    let $active = document.querySelector('#active-option');
    let $finished = document.querySelector('#finished-option');
    let $overdue = document.querySelector('#overdue-option');
    let $completed = document.querySelector('#completed-option');
    
    fetch('http://localhost:8080/v1/api/campaigns', {
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
            str: $search_value,
            status: $states
        })
    })
    .then(response => {
        
    })
    .then(data => {

    })
    .catch(error => {

    });
};

function checkFields() {
    let $active = document.querySelector('#active-option');
    let $finished = document.querySelector('#finished-option');
    let $overdue = document.querySelector('#overdue-option');
    let $completed = document.querySelector('#completed-option');

    if (!$active.checked && !$finished.checked && !$overdue.checked && !$completed.checked ) {
        event.preventDefault();
        alert('Selecione pelo menos uma opção de filtragem')
    } else {
        searchCampaign();
    }
};
