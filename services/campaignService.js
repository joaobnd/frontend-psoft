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
            alert('Faça login novamente!')
        }
        response.json().then(data => {
            renderElements(data);
            showWidget(data);
            console.log(data);
        });
    })
    .catch(() => {
        window.location.href = 'index.html';
        alert('Ocorreu um erro com o servidor!');
    });
};

let $finish_campaign_btn = document.querySelector('#finish-campaign-btn');

$finish_campaign_btn.addEventListener('click' ,() => {
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
        alert('Ocorreu um erro com o servidor!')
    });
};

/**
 * 
 */
function updateDeadline() {
    let $hash = location.hash.split('#')[1];

    fetch('http://localhost:8080/v1/api/campaigns/deadline/' + $hash, {
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
        alert('Ocorreu um erro com o servidor!')
    });
}