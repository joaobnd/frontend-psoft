let $hash = location.hash.split('#')[1];
let $contributeBtn = document.querySelector('#contribute-button');
let $contributeCloseBtn = document.querySelector('#closeContributionBtn');
let $contributeArea = document.querySelector('#contribute-area');
let $title = document.querySelector('#campaign-title-contributing');

let $sendBtn = document.querySelector('#send-value-btn');

$contributeBtn.addEventListener('click', openContribution);
$contributeCloseBtn.addEventListener('click', closeContribution);
window.addEventListener('click', clickOutside);

$sendBtn.addEventListener('click', () => {
    donateValue();
});

function openContribution() {
    $contributeArea.style.display = 'block';
}

function closeContribution() {
    $contributeArea.style.display = 'none';
}

function clickOutside(e) {
    if (e.target == $contributeArea) {
        $contributeArea.style.display = 'none';
    };
};

/**
 * Faz uma requisição ao backend para realizar uma doação para uma determinada campanha
 */
function donateValue() {
    let $value = document.querySelector('#contributing-value').value;
    let $current_value = document.querySelector('#current-value').innerHTML;
    let temp = $current_value.substr(0, $current_value.length - 3);

    event.preventDefault();

    fetch('https://api-ajudepsoft.herokuapp.com/v1/api/campaigns/' + $hash +'/donation', {
        method: 'PUT',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: $value
    })
    .then(response => {
        if(!response.ok) {
            if(response.status == 403) {
                logout();
                window.location.href = 'login.html';
                throw new Error('Faça login novamente!');
            } else if(response.status == 401) {
                logout();
                window.location.href = 'login.html';
                throw new Error('Faça login novamente!');
            } else if(response.status == 400) {
                throw new Error('Não foi possível concluir: Dado inconsistente');
            } else if(response.status == 500) {
                logout();
                window.location.href = 'login.html';
                throw new Error('Faça login novamente!');
            } else {
                throw new Error(response.status)
            }
        }
        response.json().then(data => {
            alert('Valor doado com sucesso!');

            if (temp < data.goal && getTotalValue(data.donations) > data.goal) {
                alert('Parabéns, sua doação fez a campanha atingir a meta!')
            }
            document.location.reload(true);
        });
    })
    .catch(error => {
        alert('Ocorreu um erro, tente novamente!');
        document.location.reload(true);
    });
};

/**
 * Retorna a soma de todas as doações 
 */
function getTotalValue(donations) {
    let sum = 0;

    for (let i = 0; i < donations.length; i++) {
        sum += donations[i].value;
    };
    return sum;
}