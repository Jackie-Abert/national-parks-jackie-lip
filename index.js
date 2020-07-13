'use strict';

// put your own value below!

const apiKey = '4T9c5ZHefudbc3qbGzj6z04fQulVPyOe10PBLF0U'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=4T9c5ZHefudbc3qbGzj6z04fQulVPyOe10PBLF0U';

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  // iterate through the items array
  for (let i = 0; i < responseJson.items.length; i++){
    // for each video object in the items 
    //array, add a list item to the results 
    //list with the video title, description,
    //and thumbnail
    $('#results-list').append(
      `<li><h3>${}</h3>
      <p>${}</p>
      <img src='${}'>
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};

function (query, maxResults=10) {
  const params = {
    key: apiKey,
    q: query,
    part: '',
    maxResults,
    type: ''
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url);
  
  
  //good to go
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}
//good to go
function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getYouTubeVideos(searchTerm, maxResults);
  });
}

$(watchForm);