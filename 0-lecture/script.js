/*
    - API stands for Application Programming Interface 
    - in basic terms, APIs allows applications to communicate with one another
    - the API is not the database or the server, it is the code that allows us access points to the server
    - those access points come in the form of an endpoint, which direct us to different sets of data that we can access
    
    ASYNCHRONOUS PROGRAMMING
    - generally code is read and implemented line-by-line, which is known as synchronous programming
    - asynchronous programming allows code to run while we're waiting for a response from an API

    - the fetch() method is built into the browser window
    - the fetch() method is asynchronous 
    - the fetch() method starts the process of fetching a resource from a network, and will return a promise
        - a promise represents a value that is initially unknown when the promise is created
            a promise is always 1 of 3 states:
                1. pending //initial, neither fulfilled or rejected
                2. fulfilled //the operation completed successfully
                3. rejected //the operation failed
        - in the case of a fetch request, a promise will resolve into a Response object that represents the response of the request made
*/

const baseURL = 'https://api.spacexdata.com/v3';
/*
const searchForm = document.querySelector('form');
const spaceShips = document.querySelector('ul');

searchForm.addEventListener('submit', fetchSpace)

function fetchSpace(event) {
    event.preventDefault();

    fetch(`${baseURL}/rockets`)
        .then(response => response.json())
        .then(json => displayRockets(json))
}

function displayRockets(data){
    //console.log('this is in our displayRockets function', data);
    data.forEach(rocket => {
        let rocketName = document.createElement('li');
        rocketName.innerText = rocket.rocket_name;
        spaceShips.appendChild(rocketName);
    })
}
*/
//challenge
const searchForm = document.querySelector('form');
const dispShipName = document.querySelector('ul');

searchForm.addEventListener('submit', fetchSpace)

function fetchSpace(event) {
    event.preventDefault();

    fetch(`${baseURL}/ships`)
        .then(response => response.json())
        .then(json => displayShips(json))
}

function displayShips(json){
    json.forEach(ship => {
        let shipName = document.createElement('li');
        shipName.innerText = ship.ship_name;
        dispShipName.appendChild(shipName);
    })
}

