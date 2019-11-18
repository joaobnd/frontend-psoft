window.onload = () => {
    let $container = document.querySelector('#container-list');
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
        
    // })
    // .catch(() => {
    //     window.location.href = 'index.html';
    // });
};

/**
 * Cria os elementos graficos que representam a campanha
 */
function createElements() {

}