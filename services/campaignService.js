import renderComments from './commentService.js';
import { renderLikes, renderDislikes } from './likeService.js';

window.onload = () => {
    getCampaign();
};

function getCampaign() {
    let $hash = location.hash.split('#')[1];

    if ($hash == '' || $hash == null) {
        window.location.href = 'index.html';
    };

    fetch('https://api-ajudepsoft.herokuapp.com/v1/api/campaigns/' + $hash, {
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
            renderComments(data);
            renderLikes(data);
            renderDislikes(data);
            showWidget(data);
            console.log(data);
        });
    })
    .catch(() => {
        window.location.href = 'index.html';
        alert('Ocorreu um erro com o servidor!');
    });
};

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
    } else if (data.status == 'Concluida') {
        $status.style.backgroundColor = '#1daa30';
        $status.style.color = '#F8F8F8';
    }
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
 * Mostra o widget de alteração das informações da campanha caso o usuário logado seja o dono dela e se a campanha não está encerrada.
 */
function showWidget(data) {
    let $manage_btn = document.querySelector('#manage-container');

    if (data.owner.email == localStorage.getItem('email') && data.status != 'Encerrada' && data.status != 'Vencida') {
        $manage_btn.style.display = 'block';
    };
};

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

export default getCampaign;