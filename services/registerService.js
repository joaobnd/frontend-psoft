if (localStorage.getItem('token') == null || localStorage.getItem('token') == '') {
    window.location.href = "login.html";
};

const $submit_btn = document.querySelector('button');

$submit_btn.addEventListener('click', () => {
    checkFields();
});

function checkFields() {
    let $name = document.querySelector('#campaign-name').value;
    let $description = document.querySelector('#campaign-description').value;
    let $goal = document.querySelector('#campaign-goal').value;
    let $deadline_day = document.querySelector('#campaign-deadline-day').value;
    let $deadline_month = document.querySelector('#campaign-deadline-month').value;
    let $deadline_year = document.querySelector('#campaign-deadline-year').value;
    
    event.preventDefault();

    if ($name == "" || $description == "" || $goal == "" || $deadline_day == "" || $deadline_month == "" || $deadline_year == "") {
        alert('Todos os campos devem ser preenchidos!');
    } else {
        submitCampaign();
    };
};

function submitCampaign() {
    let $name = document.querySelector('#campaign-name').value;
    let $description = document.querySelector('#campaign-description').value;
    let $goal = document.querySelector('#campaign-goal').value;
    let $deadline_day = document.querySelector('#campaign-deadline-day').value;
    let $deadline_month = document.querySelector('#campaign-deadline-month').value;
    let $deadline_year = document.querySelector('#campaign-deadline-year').value;
    let userToken = localStorage.getItem('token');

    let data = {
        id: 1651,
        name: $name,
        urlId: generateUrl(),
        description: $description,
        deadLine: $deadline_year + '-' + getMonthNumber($deadline_month) + '-' + $deadline_day,
        status: 'Ativa',
        goal: $goal
    };

    fetch('http://localhost:8080/v1/api/campaigns', {
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': 'Bearer ' + userToken
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if(!response.ok) {
            let msg = '';
            if(response.status == 403) {
                msg = 'Por favor, faça login para poder prosseguir!';
                window.location.href = 'login.html';
                throw new Error('Não foi possível completar o cadastro: ' + msg);
            } else if(response.status == 401) {
                msg = 'Você não tem permissão para realizar o cadastro!';
                window.location.href = 'login.html';
                throw new Error('Não foi possível completar o cadastro: ' + msg);
            } else if(response.status == 400) {
                msg = 'A data de encerramento deve ser no futuro';
                throw new Error('Não foi possível completar o cadastro: ' + msg);
            } 
            else {
                throw new Error('Não foi possível completar o cadastro: ' + msg);
            }
        }
        return response.text();
    })
    .then(() => {
        alert('Campanha cadastrada com sucesso!');
        location.href = 'campaigns.html'
    })
    .catch(error => {
        alert(error.message);
    })
};

function generateUrl() {
    let url = document.querySelector('#campaign-name').value;

    url = url.toLowerCase();
    url = url.normalize('NFD').replace(/[\u0300-\u036f]/g, '')    
                              .replace(/([^\w]+|\s+)/g, '-')
                              .replace(/\-\-+/g, ' ')
                              .replace(/(^-+|-+$)/, '');
    return url;
};

function getMonthNumber(month) {
    if (month === 'Janeiro') {
        return '01';
    } else if (month === 'Fevereiro') {
        return '02';
    } else if (month === 'Março') {
        return '03';
    } else if (month === 'Abril') {
        return '04';
    } else if (month === 'Maio') {
        return '05';
    } else if (month === 'Junho') {
        return '06';
    } else if (month === 'Julho') {
        return '07';
    } else if (month === 'Agosto') {
        return '08';
    } else if (month === 'Setembro') {
        return '09';
    } else if (month === 'Outubro') {
        return '10';
    } else if (month === 'Novembro') {
        return '11';
    } else {
        return '12';
    };
};