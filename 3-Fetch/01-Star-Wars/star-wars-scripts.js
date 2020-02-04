/*
var starWarsPeopleList = document.querySelector('ul');

fetch('https://swapi.co/api/people') 
.then(function(response) {   
  return response.json(); 
})
.then(function(json) {
  let people = json.results; 

  for(p of people) {
    let listItem = document.createElement('li'); 
    listItem.innerHTML = '<p>' + p.name + '</p>'; 
    starWarsPeopleList.appendChild(listItem);  
  }

});
*/

let starWarsPlanetList = document.getElementById('planets');

fetch('https://swapi.co/api/planets')
.then(function(response) {
    return response.json();
})
.then(function(json) {
    let planets=json.results;

    for (planet in planets) {
        let planetItem = document.createElement('li');
        planetItem.innerHTML = '<p>' + planet.name + '</p>';
        starWarsPlanetList.appendChild(planetItem);
    }
})
