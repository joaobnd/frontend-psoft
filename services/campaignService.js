let localData;

window.onload = () => {
    let $hash = location.hash.split('#')[1];

    if ($hash == '' || $hash == null) {
        window.location.href = 'index.html';
    };

    fetch('http://localhost:8080/v1/api/campaigns/' + $hash, {
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
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
            renderElements(data);
            showWidget(data);
            localData = data;
            console.log(data);
        });
    })
    .catch(() => {
        window.location.href = 'index.html';
        alert('Ocorreu um erro com o servidor!');
    });
};

let $finish_campaign_btn = document.querySelector('#finish-campaign-btn');
let $update_btn = document.querySelector('#update-data-btn');

/**
 * Chama as funções para alterar as informações inseridas
 */
$update_btn.addEventListener('click', () => {
    let $update_description = document.querySelector('#campaign-update-description').innerHTML;
    let $update_goal = document.querySelector('#campaign-update-goal').value;
    let $update_day = document.querySelector('#campaign-deadline-day').value;
    let $update_month = document.querySelector('#campaign-deadline-month').value;
    let $update_year = document.querySelector('#campaign-deadline-year').value;
    let newDate = $update_year + '-' + getMonthNumber($update_month) + '-' + $update_day;

    let r = confirm("Tem certeza que deseja alterar os dados?");

    if (r == true) {
        if ($update_description != localData.description) {
            updateDescription($update_description);
        };
        if ($update_goal != localData.goal) {
            updateGoal($update_goal);
        };
        if (newDate != localData.deadLine) {
            updateDeadline(newDate);
        };
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
 * Renderiza as informações da campanha nos objetos HTML.
 */
function renderElements(data) {
    let $title = document.querySelector('#campaign-title');
    let $goal = document.querySelector('#goal');
    let $fname = document.querySelector('#owner-fname');
    let $lname = document.querySelector('#owner-lname');
    let $deadline = document.querySelector('#campaign-deadline');
    let $status = document.querySelector('#campaign-status');
    let $description = document.querySelector('#campaign-description');
    let $percent = document.querySelector('#percent-value');
    let $current_value = document.querySelector('#current-value');
    let $update_description = document.querySelector('#campaign-update-description');
    let $update_goal = document.querySelector('#campaign-update-goal');
    let $update_day = document.querySelector('#campaign-deadline-day');
    let $update_month = document.querySelector('#campaign-deadline-month');
    let $update_year = document.querySelector('#campaign-deadline-year');

    $title.innerHTML = data.name;
    $current_value.innerHTML = getCurrentValue(data.donations) + ',00';
    $goal.innerHTML = data.goal + ',00';
    $fname.innerHTML = data.owner.firstName;
    $lname.innerHTML = data.owner.lastName;
    $status.innerHTML = data.status;
    $description.innerHTML = data.description;
    let str = data.deadLine;
    $deadline.innerHTML = str.substring(8) + '/' + str.substring(5, 7) + '/' + str.substring(0, 4);
    $percent.innerHTML = getCampaignPercent(data.donations, data.goal);

    $update_description.innerHTML = data.description;
    $update_goal.value = data.goal;
    $update_day.value = data.deadLine.substring(8);
    $update_month.value = getMonthName(data.deadLine.substring(5, 7));
    $update_year.value = data.deadLine.substring(0, 4);

    if (data.status == 'Encerrada') {
        $status.style.backgroundColor = '#b62d2d';
        $status.style.color = '#F8F8F8';
    };
};

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

/**
 * Retorna o percentual que a campanha possui em relação a meta de arrecadação.
 */
function getCampaignPercent(donations, goal) {
    let sum = 0;
    let percent;

    for (let i = 0; i < donations.length; i++) {
        sum += donations[i].value;
    };
    percent = (sum * 100) / goal;

    return parseFloat(percent.toFixed(2)) + '%';
};

/**
 * Mostra o widget de alteração das informações da campanha caso o usuário logado seja o dono dela e se a campanha não está encerrada.
 */
function showWidget(data) {
    let $manage_btn = document.querySelector('#manage-container');

    if (data.owner.email == localStorage.getItem('email') && data.status != 'Encerrada') {
        $manage_btn.style.display = 'block';
    };
};

/**
 * Desloga o usuário do sistema.
 */
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    window.location.href = "index.html";
};

/**
 * Realiza uma requisição para alterar a descrição da campanha
 */
function updateDescription(newDescription) {
    
};

/**
 * Realiza uma requisição para alterar a meta de arrecadação da campanha
 */
function updateGoal(newGoal) {
    
};

/**
 * Realiza uma requisição para alterar a deadline da campanha
 */
function updateDeadline(newDate) {
    let $hash = location.hash.split('#')[1];

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
                alert('Faça login novamente!');
                throw new Error('Não foi possível concluir: ' + msg);
            } else if(response.status == 401) {
                window.location.href = 'index.html';
                logout();
                alert('Faça login novamente!');
                throw new Error('Não foi possível concluir: ' + msg);
            }  else {
                msg = 'Ocorreu um erro com o servidor.'
                alert('Não foi possível concluir: ' + msg);
                throw new Error('Não foi possível concluir: ' + msg);
            };
        };

        if(response.status == 400) {
            alert('Não foi possível concluir: ' + 'Dado inconsistente');
            throw new Error('Não foi possível concluir: ' + 'Dado inconsistente');
        }

        if(response.status == 500) {
            window.location.href = 'index.html';
            alert('Faça login novamente!');
            logout();
            throw new Error('Faça login novamente!');
        }
        return response.text();
    })
    .then(data => {
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
 * Retorna o nome do mês de acordo com o número.
 */
function getMonthName(month) {
    if (month === '01') {
        return 'Janeiro';
    } else if (month === '02') {
        return 'Fevereiro';
    } else if (month === '03') {
        return 'Março';
    } else if (month === '04') {
        return 'Abril';
    } else if (month === '05') {
        return 'Maio';
    } else if (month === '06') {
        return 'Junho';
    } else if (month === '07') {
        return 'Julho';
    } else if (month === '08') {
        return 'Agosto';
    } else if (month === '09') {
        return 'Setembro';
    } else if (month === '10') {
        return 'Outubro';
    } else if (month === '11') {
        return 'Novembro';
    } else {
        return 'Dezembro';
    };
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