'use strict';

// Fetch data
fetch('https://breakingbadapi.com/api/characters')
  .then((response) => response.json())
  .then((json) => {
    characters = json;
    renderAll(characters, contentResultsElement);
    numberOfSearches.innerHTML = `There are ${characters.length} results for your search`;
  });

const savedInFavorites = JSON.parse(localStorage.getItem('favoriteCharacters'));
if (savedInFavorites !== null) {
  favorites = savedInFavorites;
  renderFavorites(favorites, contentFavElement);
}

btnSearch.addEventListener('click', handleClick);

numberOfSearches.addEventListener('click', compareResult);

function compareResult() {
  let arrayPredefined = [2, 5, 9];

  for (const each of arrayPredefined) {
    if (each >= characters.length) {
      console.log('The number in the array is greater than the results');
    } else if (each <= characters.length) {
      console.log('The number in the array is smaller than the results');
    } else {
      console.log('The number of results is the same as the array');
    }
  }
}
