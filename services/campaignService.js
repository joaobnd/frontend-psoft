window.onload = () => {
    let $hash = location.hash.split('#')[1];

    if ($hash == '' || $hash == null) {
        window.location.href = 'index.html';
    }

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
            window.location.href = 'index.html';
        } else if(response.status == 500) {
            window.location.href = 'index.html';
            alert('Você precisa fazer login para acessar essa página')
        }
        response.json().then(data => {
            renderElements(data);
        });
    })
    .catch(error => {
        window.location.href = 'index.html';
    });
};

/**
 * Cria os elementos graficos que representam a campanha
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

    $title.innerHTML = data.name;
    $goal.innerHTML = data.goal + ',00';
    $fname.innerHTML = data.owner.firstName;
    $lname.innerHTML = data.owner.lastName;
    $deadline.innerHTML = data.deadLine;
    $status.innerHTML = data.status;
    $description.innerHTML = data.description;
    
}