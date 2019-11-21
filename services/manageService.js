let $update_description_btn = document.querySelector('#update-description-btn');
let $update_goal_btn = document.querySelector('#update-goal-btn');
let $update_deadline_btn = document.querySelector('#update-deadline-btn');
let $finish_campaign_btn = document.querySelector('#finish-campaign-btn');

/**
 * Chama a função de alterar a descrição ao clicar no botão.
 */
$update_description_btn.addEventListener('click', () => {
    let r = confirm("Tem certeza que deseja alterar a descrição?");

    if (r == true) {
        updateDescription();
    };
});

/**
 * Chama a função de alterar a meta de arrecadação ao clicar no botão.
 */
$update_goal_btn.addEventListener('click', () => {
    let r = confirm("Tem certeza que deseja alterar a meta?");

    if (r == true) {
        updateGoal();
    };
});

/**
 * Chama a função de alterar a deadline ao clicar no botão.
 */
$update_deadline_btn.addEventListener('click', () => {
    let r = confirm("Tem certeza que deseja alterar a deadline?");

    if (r == true) {
        updateDeadline();
    };
});

/**
 * Chama a função de encerrar campanha ao clicar no botão.
 */
$finish_campaign_btn.addEventListener('click', () => {
    let r = confirm("Tem certeza que deseja finalizar a campanha?");

    if (r == true) {
        finishCampaign();
    };
});

/**
 * Realiza uma requisição para alterar a descrição da campanha
 */
function updateDescription() {
    let $update_description = document.querySelector('#campaign-update-description').innerHTML;
    alert('DESCRIPTION - OK')
};

/**
 * Realiza uma requisição para alterar a meta de arrecadação da campanha
 */
function updateGoal() {
    let $hash = location.hash.split('#')[1];
    let $update_goal = document.querySelector('#campaign-update-goal').value;

    fetch('http://localhost:8080/v1/api/campaigns/goal/' + $hash, {
        method: 'PUT',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify($update_goal)
    })
    .then(response => {
        if(!response.ok) {
            let msg = '';

            if(response.status == 403) {
                window.location.href = 'index.html';
                logout();
                msg = 'Faça login novamente!';
                throw new Error('Não foi possível concluir: ' + msg);
            } else if(response.status == 401) {
                window.location.href = 'index.html';
                logout();
                msg = 'Faça login novamente!';
                throw new Error('Não foi possível concluir: ' + msg);
            }  else {
                msg = 'Ocorreu um erro com o servidor.'
                throw new Error('Não foi possível concluir: ' + msg);
            };
        };

        if(response.status == 400) {
            throw new Error('Não foi possível concluir: Dado inconsistente');
        };

        if(response.status == 500) {
            window.location.href = 'index.html';
            alert('Faça login novamente!');
            logout();
            throw new Error('Faça login novamente!');
        };
        return response.text();
    })
    .then(() => {
        alert('Meta alterada com sucesso!');
        document.location.reload(true);
    })
    .catch(error => {
        alert(error.message);
    });
};

/**
 * Realiza uma requisição para alterar a deadline da campanha
 */
function updateDeadline() {
    let $hash = location.hash.split('#')[1];
    let $update_day = document.querySelector('#campaign-deadline-day').value;
    let $update_month = document.querySelector('#campaign-deadline-month').value;
    let $update_year = document.querySelector('#campaign-deadline-year').value;
    let newDate = $update_year + '-' + getMonthNumber($update_month) + '-' + $update_day;

    fetch('http://localhost:8080/v1/api/campaigns/deadline/' + $hash, {
        method: 'PUT',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(newDate)
    })
    .then(response => {
        if(!response.ok) {
            let msg = '';

            if(response.status == 403) {
                window.location.href = 'index.html';
                logout();
                msg = 'Faça login novamente!';
                throw new Error('Não foi possível concluir: ' + msg);
            } else if(response.status == 401) {
                window.location.href = 'index.html';
                logout();
                msg = 'Faça login novamente!';
                throw new Error('Não foi possível concluir: ' + msg);
            }  else {
                msg = 'Faça login novamente!'
                logout();
                throw new Error('Não foi possível concluir: ' + msg);
            };
        };

        if(response.status == 400) {
            throw new Error('Não foi possível concluir: Dado inconsistente');
        };

        if(response.status == 500) {
            window.location.href = 'index.html';
            alert('Faça login novamente!');
            logout();
            throw new Error('Faça login novamente!');
        };
        return response.text();
    })
    .then(() => {
        alert('Deadline alterada com sucesso!');
        document.location.reload(true);
    })
    .catch(error => {
        alert(error.message);
    });
};

/**
 * Realiza uma requisição ao servidor para encerrar uma campanha.
 */
function finishCampaign() {
    let $hash = location.hash.split('#')[1];

    fetch('http://localhost:8080/v1/api/campaigns/' + $hash, {
        method: 'PUT',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
    .then(response => {
        if(response.status == 404) {
            window.location.href = 'campaigns.html';
        } else if(response.status == 401) {
            alert('Você não está autorizado a fazer isso!')
        } else if(response.status == 403) {
            window.location.href = 'index.html';
            logout();
            alert('Faça login novamente!');
        } else if(response.status == 500) {
            window.location.href = 'index.html';
            logout();
            alert('Faça login novamente!')
        }
        response.json().then(() => {
            alert('Campanha encerrada com sucesso!');
            window.location.reload(true);
        });
    })
    .catch(() => {
        window.location.href = 'index.html';
        console.log('finishCampaign error');
        alert('Ocorreu um erro com o servidor!');
    });
};

/**
 * Retorna o número do mês de acordo com o nome.
 */
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