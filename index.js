'use strict';

function displayResults(listOfRepos) {
  // if there are previous results, remove them
  console.log(listOfRepos);
  $('#results-list').empty();
  // iterate through the repos array
  for (let i = 0; i < listOfRepos.length; i++){


    $('#results-list').append(
      `<li><h3><a target="_blank" href="${listOfRepos[i].html_url}">${listOfRepos[i].name}</a></h3>
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};

function getRepos(user) {
 const searchURL = `https://api.github.com/users/${user}/repos`;
  fetch(searchURL)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
      $('#results').addClass('hidden');
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchUsers= $('#js-search-term').val();
    getRepos(searchUsers);
  });
}

$(watchForm);