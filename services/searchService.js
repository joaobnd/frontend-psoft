const $search_btn = document.querySelector('#search-btn');
const $campaigns_div = document.querySelector('#container-list');

$search_btn.addEventListener('click', () => {
    let $search_value = document.querySelector('#search-value').value;

    if ($search_value == '' ) {
        alert('O campo não pode estar vazio!')
    } else {
        searchCampaigns($search_value);
    }
});


function searchCampaigns(search) {
    let $campaign_filter = document.querySelector('#campaign-filter');
    
    
};

/**
 * 
 */
// function filter() {
//     let $active = document.querySelector('#active-option');
//     let $finished = document.querySelector('#finished-option');
//     let $overdue = document.querySelector('#overdue-option');
//     let $completed = document.querySelector('#completed-option');

//     event.preventDefault();
    


//     if (!$active.checked && !$finished.checked && !$overdue.checked && !$completed.checked ) {
//         event.preventDefault();
//         alert('Selecione pelo menos uma opção de filtragem')
//     } else {
//         searchCampaigns();
//     }
// };

/**
 * Desloga o usuário do sistema.
 */
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    window.location.href = "index.html";
};