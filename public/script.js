// Create variables to easily be able eo create HTML elements using keyword 'new'
function UL(){ return document.createElement('UL')};
function LI(){ return document.createElement('LI')};
function H2(){ return document.createElement('H2')};
function H3(){ return document.createElement('H3')};
function P(){ return document.createElement('P')};
function A(){ return document.createElement('A')};
function IMG(){ return document.createElement('IMG')};
function BUTTON(){ return document.createElement('BUTTON')};
function FORM(){ return document.createElement('FORM')};
// create function to get values when 'favorite' link is clicked
function getMovieInfo(e){
  let node = e.target.parentNode.parentNode
  alert(e);
  let length = node.childNodes.length
  return {
    oid: node.childNodes[length - 1].innerHTML,
    name: node.childNodes[1].innerHTML,
    poster: node.firstChild.src,
    year: node.childNodes[2].innerHTML,
    type: node.childNodes[3].innerHTML
  }
  return {name: 'name', oid: 'ej13nn'}
}
function addToFavs (e){
  // let movie = getMovieInfo(e)
  // console.log('movie info -> '+getMovieInfo(e));
  var xhr = new XMLHttpRequest();
  xhr.open("POST", '/favorites', true);

  //Send the proper header information along with the request
  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.onreadystatechange = function() { // Call a function when the state changes.
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
          // Request finished. Do processing here.
          let movie = getMovieInfo();
      }
  }
  xhr.send(JSON.stringify(movie));
}
// Wait for window to load
window.onload = function(e){
  // create function to remove old search results on new query
  function removeOldSearchResults(){
    while (list.firstChild) {
      list.removeChild(list.firstChild)
    }
  };
  // Once window is loaded, declare DOM variables
  const movieListDiv = document.getElementById("movie-list-div");
  const list = document.getElementById("list");
  const searchDb = document.getElementById("search");
  const searchForm = document.getElementById("search");
  // Create dynamic url for API requests
  const dynamicUrl = () => {
    // Get value from search input box
    const searchQuery = document.getElementById("search-input").value;
    // Format the query for the movie API using encodeURIComponent
    let formattedQuery = encodeURIComponent(searchQuery);
    // Interpolate 'formattedQuery' into URL string for API call
    let url = `http://www.omdbapi.com/?s=${formattedQuery}&apikey=60534369`;
    return url;
  };
  const searchApi = async () => {
    if (list.firstChild) {
      await removeOldSearchResults();
    }
    // Create new XMLHttpRequest request object
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      // if xhr is not ready, abort
      if (xhr.readyState !== 4) return;

      if (xhr.status >= 200 && xhr.status < 300){
        // Successful XMLHttpRequest!! Assign the responseText to a variable
        let movies = JSON.parse(xhr.responseText).Search;
        // Iterate through returned movies
        movies.forEach(movie => {
          // Create new instances of needed HTML tags
          let newLI = new LI;
          let newH2 = new H2;
          let newH3 = new H3;
          let newP = new P;
          let oidP = new P;
          let newIMG = new IMG;
          let newFORM = new FORM;
          let newBUTTON = new BUTTON;
          // create new instances of HTML elements
          // in order to apply classnames and append
          newLI.appendChild(newIMG);
          newLI.appendChild(newH2);
          newLI.appendChild(newH3);
          newLI.appendChild(newP);
          newLI.appendChild(oidP);
          newLI.appendChild(newFORM);
          newFORM.appendChild(newBUTTON)
          // Adding list-item classes to be used in css and js
          newIMG.classList.add('movie-poster', 'hidden');
          newP.classList.add('movie-text', 'hidden');
          oidP.classList.add('movie-oid', 'hidden');
          newH2.classList.add('movie-header');
          newH3.classList.add('movie-year', 'hidden');
          newLI.classList.add('movie');
          newFORM.classList.add('favorite')
          // Programattically assigning values to list-item contents
          newIMG.src = `${movie.Poster}`;
          newH2.innerHTML = `${movie.Title}`;
          newH3.innerHTML = `${movie.Year}`;
          newP.innerHTML = `${movie.Type}`;
          oidP.innerHTML = `${movie.imdbID}`;
          // Creating action and method for forms
          // to add to favorites upon submission
          newFORM.action = '/favorites'
          newFORM.method = 'post'
          newBUTTON.type = 'submit'
          newBUTTON.innerHTML = 'favorite'
          // Append returned movies to list
          list.appendChild(newLI);
        });
        if (document.querySelectorAll('favorite')) {
          document.querySelectorAll('favorite').addEventListener('submit', addToFavs)
        };
        // Request failed
      };
    };
    // Assign HTTP "GET" method and pass url
    xhr.open("GET", dynamicUrl(), true);
    // send request
    xhr.send();
  };
  searchForm.addEventListener('submit', e => {
    // Prevent default behavior of form and execute the searchApi function
    e.preventDefault();
    searchApi();
  });
};
