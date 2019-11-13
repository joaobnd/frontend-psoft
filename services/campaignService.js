// if (localStorage.getItem('token') == null || localStorage.getItem('token') == '') {
//     window.location.href = "login.html";
// };

let $submit_btn = document.querySelector('button');

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

    if ($name == "" || $description == "" || $goal == "" || $deadline_day == "" || $deadline_month == "" || $deadline_year == "") {
        alert('Todos os campos devem ser preenchidos!');
    } else {
        submitCampaign();
    }
}

function submitCampaign() {
    let $name = document.querySelector('#campaign-name').value;
    let $description = document.querySelector('#campaign-description').value;
    let $goal = document.querySelector('#campaign-goal').value;
    let $deadline_day = document.querySelector('#campaign-deadline-day').value;
    let $deadline_month = document.querySelector('#campaign-deadline-month').value;
    let $deadline_year = document.querySelector('#campaign-deadline-year').value;
    
    let data = {
        name: $name,
        urlId: generateUrl(),
        description: $description,
        deadLine: $deadline_year + '-' + getMonthNumber($deadline_month) + '-' + $deadline_day,
        status: 'Ativa',
        goal: $goal
    };
}

function generateUrl() {
    let url = document.querySelector('#campaign-name').value;

    url = url.toLowerCase();
    url = url.normalize('NFD').replace(/[\u0300-\u036f]/g, '')    
                              .replace(/([^\w]+|\s+)/g, '-')
                              .replace(/\-\-+/g, ' ')
                              .replace(/(^-+|-+$)/, '');
    return url;
}

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
    }
}