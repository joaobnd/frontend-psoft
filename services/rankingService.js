window.onload = () => {
    getActiveCampaigns();
}

function getActiveCampaigns() {

    fetch('https://api-ajudepsoft.herokuapp.com/v1/api/campaigns/actives', {
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json; charset=utf-8'
        }
    })
    .then(response => {
        if(!response.ok) {
            throw new Error('Ocorreu um erro');
        }
        response.json().then(data => {
            console.log(data);
        });
    })
    .catch(error => {
        error.message();
    });
}