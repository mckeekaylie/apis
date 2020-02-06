/* API DATA
  -This section is telling the browser where to find the API data
*/

const baseURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json'; //Declaring the base URL - the required API endpoint for the NYT data
const key = '1goEQVK0fGfkvN6jlRSbdtZEbpu4v7W6'; //Declaring the API key that informs NYT who is using their api. This is required to access it.
let url; //used to make a dynamic search URL

/* REFERENCES TO DOM ELEMENTS
  - The following variable declarations grab selectors from the HTML document and assign them to a variable that will be used to 
  manipulate the document in later steps.
*/

//SEARCH FORM
const searchTerm = document.querySelector('.search');
const startDate = document.querySelector('.start-date');
const endDate = document.querySelector('.end-date');
const searchForm = document.querySelector('form');
const submitBtn = document.querySelector('.submit');

//RESULTS NAVIGATION
const nextBtn = document.querySelector('.next');
const previousBtn = document.querySelector('.prev');

//RESULTS SECTION
const section = document.querySelector('section');
const nav = document.querySelector('nav');

/*
  NAV STYLING
  - Setting the display of the nav and setting the page number to 0.
*/

nav.style.display = 'none';

let pageNumber = 0;
let displayNav = false;

/*
  EVENT LISTENERS
  - Event listeners are declared on the form submit button and on the pagination buttons.
  These tell the browser what to do when these buttons are pressed
*/

//when the submit button is pressed, run the fetchResults method
searchForm.addEventListener('submit', fetchResults); 

//when the nextBtn is clicked, run the nextPage method
nextBtn.addEventListener('click', nextPage); 

//when the previousBtn is clicked, run the previousPage method
previousBtn.addEventListener('click', previousPage); 

/* FETCH RESULTS
  - This is where we tell the browser what to do to get data from the API and what to do with the data after it is fetched.
*/

function fetchResults(e) { //the fetchResults function is declared and an event handling function (e) is passed in. This allows us to interact with the event.
    e.preventDefault(); //prevent default prevents the form from doing the default action of a form: submitting data (a POST request)
    
    /* Assemble the full URL; creating a versatile query string with our key, 
    the page number that corresponds to the results array, and our specific value */
    url = baseURL + '?api-key=' + key + '&page=' + pageNumber + '&q=' + searchTerm.value;

    /* FORM VALIDATION
    - Dates are not required in this form. These if statements tell the browser what to do IF dates are entered.
    */

    if(startDate.value !== '') { //if the startDate value isn't blank
        url += '&begin_date=' + startDate.value; //add the date value to the URL string
    };

    if(endDate.value !== ''){ //if the endDate value isn't blank
        url += '&end_date=' + endDate.value; //add the endDate value to the URL string
    };
    
    //we are sending a request for information from the url (the API)
    fetch(url).then(function(result) {
        return result.json(); //A promise containing a result object is created (our response). Fetch gets the network resource, which may take awhile to resolve.
        //The response will be convertedinto a json object by returning the result.json function.
        }).then(function(json){  //the json object created is used in this second promise that sends the information received to the displayResults function
            displayResults(json);
        });
}

/*
  DISPLAY RESULTS
  - Now that the data has been fetched, this section tells the browser what to do with that data
*/

function displayResults(json) { //the displayResults function is declared and the json created in the fetch is passed in as a param
    //this while loop clears out existing articles before new ones are added
    while (section.firstChild) {
        section.removeChild(section.firstChild);
    }

    let articles = json.response.docs; //declaring the articles variable that stores the json response in it
  
    // This if statement tells the browser to only display 10 articles per page if the submitted search returns more than 10 articles
    if(articles.length === 10) { 
        nav.style.display = 'block'; //shows the nav display if 10 items are in the array
      } else {
        nav.style.display = 'none'; //hides the nav display if less than 10 items are in the array
      } 
    //This if statement tells the browser what to do if no results are found when a search is submitted
    if(articles.length === 0) {
        let para = document.createElement('p'); //a p tag is created
        para.textContent = 'No results returned.' //This string is appended to the p tag created above
        section.appendChild(para); //the newly created p tag is appended to the DOM
    } else { //this code block runs if the results are greater than 0
        for(let i = 0; i < articles.length; i++) { //this loop will run until there are no more results to display
            //The following variables create nodes in the DOM that allow us to show the data
            let article = document.createElement('article'); //an article variable is added that creates an article element
            let heading = document.createElement('h2'); //a heading variable is added that creates a h2 element
            let link = document.createElement('a');  //a link variable is added that creates an a element
            let img = document.createElement('img');  //an img variable is added that creates an image element
            let para1 = document.createElement('p');  //a para1 variable is added that creates a p element
            let para2 = document.createElement('p');  //a para2 variable is added that creates a p element
            let clearfix = document.createElement('div'); //a clearfix variable is added that creates a div element

            //This sets the variable current to hold the data of the current article as we iterate
            let current = articles[i];
            console.log(current);

            link.href = current.web_url; //grabs the hyperlink for the current article out of the json result. This will set the value for the link.href each time we iterate.
            link.textContent = current.headline.main; //changes the link text content to equal the current article's headline
            para1.textContent = current.snippet; //changes the para1 text content to equal the current article's snippet
            para2.textContent = 'Keywords: '; //changes the para2 text content to equal the specified string
      
          //This nested for loop iterates over the current object, specifically the keywords array
            for(let j = 0; j < current.keywords.length; j++) {
              let span = document.createElement('span'); //as we iterate, a span is created for each keyword 
              span.textContent += current.keywords[j].value + ' '; //The textContent for each <span> will be the value found inside the keywords array inside the JSON object.  
              para2.appendChild(span); //each span is appended to the para2 node
            }
      
          //this if statement checks the json for data, specifically the multimedia property
            if(current.multimedia.length > 0) { //if the current article has anything under multimedia, this block will run
              //The html src value of the first item in the multimedia array (current.multimedia[0]) is concatenated to the nytimes.com url
              img.src = 'http://www.nytimes.com/' + current.multimedia[0].url;
              //the alt is set to the headline of the article
              img.alt = current.headline.main;
            }
      
            clearfix.setAttribute('class','clearfix'); //The setAttribute method is used to target our clearfix class.
      
            /* appendChild is called on the article, heading and section elements.
            - This creates a child node on that element. 
            - Heading, link, img, para1, para2, clearfix, and article are passed into the appendChild method. 
            - This means that the elements passed in will be inside the article, heading or section elements.
            */

            article.appendChild(heading);    //heading is added as a child of article
            heading.appendChild(link);       //link is added as a child of heading
            article.appendChild(img);        //img is added as a child of article
            article.appendChild(para1);      //para1 is added as a child of article
            article.appendChild(para2);      //para2 is added as a child of article
            article.appendChild(clearfix);   //clearfix is added as a child of article
            section.appendChild(article);    //article is added as a child of section
          }
        }
      };

/* PAGINATION 
  - The following two functions tell the browser what to do when the pagination buttons are pressed.
*/

function nextPage(e){ //the nextPage function is declared and the event handler is passed into it
    pageNumber++; //when the page number increases,
    fetchResults(e); //fire off the fetchResults function
}; //5
                      
function previousPage(e){ //the previousPage function is declared and the event handler is passed into it
    if(pageNumber > 0) { //if the page number is greater than 0,
        pageNumber--; //decrease the page number
    } else { //else, return the present results
        return;
    }
    fetchResults(e); //fire off the fetchResults function
};


  
