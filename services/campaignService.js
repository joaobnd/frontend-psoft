window.onload = () => {
    let $hash = location.hash.split('#')[1];

    // if ($hash == '' || $hash == null) {
    //     window.location.href = 'index.html';
    // }

    // fetch('http://localhost:8080/v1/api/campaigns?url=' + $hash, {
    //     method: 'GET',
    //     headers: {
    //         'Access-Control-Allow-Origin': '*',
    //         'Content-Type': 'application/json; charset=utf-8',
    //         'Authorization': 'Bearer ' + localStorage.getItem('token')
    //     }
    // })
    // .then(response => {
    //     if(!response.ok) {
    //         window.location.href = 'index.html';
    //     }
    //     return response.text();
    // })
    // .then(data => {
    //     renderElements(data);
    // })
    // .catch(() => {
    //     window.location.href = 'index.html';
    //     alert(error.message);
    // });
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

    $title.innerHTML = data.title;
    $goal.innerHTML = data.goal;
    $fname.innerHTML = data.owner.firstName;
    $lname.innerHTML = data.owner.lastName;
    $deadline.innerHTML = data.deadLine;
    $status.innerHTML = data.status;
    $description.innerHTML = data.description;
    
}