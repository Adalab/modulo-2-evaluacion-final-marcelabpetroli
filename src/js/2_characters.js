'use strict';

function handleClick(event) {
  event.preventDefault();
  const inputValue = searchInputElement.value;
  contentResultsElement.innerHTML = '';

  const filteredCharacters = characters.filter((eachCharacter) => eachCharacter.name.toLowerCase().includes(inputValue.toLowerCase()));

  renderAll(filteredCharacters, contentResultsElement);
}

function renderAll(characArray, container) {
  characArray.forEach((element) => {
    const characterInFavoritesIndex = favorites.findIndex((character) => character.char_id === element.char_id);

    let classFavorite = '';
    if (characterInFavoritesIndex === -1) {
      classFavorite = '';
    } else {
      classFavorite = 'selected';
    }
    const article = renderTemplate(element, classFavorite);
    const listElement = document.createElement('li');
    listElement.setAttribute('class', 'list-element');
    listElement.appendChild(article);
    container.appendChild(listElement);
  });
}

function renderFavorites(characArray, container) {
  const resetFavoritesBtn = document.createElement('button');
  const textResetButton = document.createTextNode('Reset All');
  resetFavoritesBtn.appendChild(textResetButton);
  resetFavoritesBtn.setAttribute('class', 'reset-favorites-btn');
  container.appendChild(resetFavoritesBtn);

  resetFavoritesBtn.addEventListener('click', resetFavorites);

  characArray.forEach((element) => {
    const characterInFavoritesIndex = favorites.findIndex((character) => character.char_id === element.char_id);

    let classFavorite = '';
    if (characterInFavoritesIndex === -1) {
      classFavorite = '';
    } else {
      classFavorite = 'selected';
    }
    const article = renderTemplate(element, classFavorite);
    const listElement = document.createElement('li');
    const deleteButton = document.createElement('button');
    const deleteIcon = document.createElement('i');

    listElement.setAttribute('class', 'list-element');
    deleteButton.setAttribute('class', 'delete-btn');
    deleteIcon.setAttribute('class', 'fa-solid fa-trash-can');
    deleteButton.appendChild(deleteIcon);
    article.appendChild(deleteButton);
    listElement.appendChild(article);

    container.appendChild(listElement);
  });
}

function renderTemplate(element, classFav) {
  const articleElement = document.createElement('article');
  const imageContainer = document.createElement('div');
  const imageElement = document.createElement('img');
  const nameElement = document.createElement('h3');
  const statusElement = document.createElement('p');
  const occupationElement = document.createElement('p');

  const title = document.createTextNode(element.name);
  const status = document.createTextNode(element.status);
  const occupationElText = document.createTextNode(element.occupation);

  articleElement.setAttribute('class', `js_characters article-character ${classFav}`);
  articleElement.setAttribute('id', element.char_id);
  statusElement.setAttribute('class', 'status');

  imageContainer.setAttribute('class', 'image-container');
  imageElement.setAttribute('src', element.img);
  imageElement.setAttribute('alt', element.name);
  imageElement.setAttribute('title', element.name);
  imageElement.setAttribute('class', 'image-characters');

  nameElement.appendChild(title);
  statusElement.appendChild(status);
  occupationElement.appendChild(occupationElText);
  imageContainer.appendChild(imageElement);
  articleElement.appendChild(imageContainer);
  articleElement.appendChild(nameElement);
  articleElement.appendChild(statusElement);
  articleElement.appendChild(occupationElement);

  articleElement.addEventListener('click', handleClickCharacter);
  return articleElement;
}

function handleClickCharacter(event) {
  event.currentTarget.classList.toggle('selected');

  const selectedCharacter = characters.find((character) => character.char_id === parseInt(event.currentTarget.id));

  const characterInFavoritesIndex = favorites.findIndex((character) => character.char_id === parseInt(event.currentTarget.id));

  if (characterInFavoritesIndex === -1) {
    favorites.push(selectedCharacter);
    localStorage.setItem('favoriteCharacters', JSON.stringify(favorites));
  } else {
    favorites.splice(characterInFavoritesIndex, 1);
    localStorage.setItem('favoriteCharacters', JSON.stringify(favorites));
  }

  contentResultsElement.innerHTML = '';
  renderAll(characters, contentResultsElement);

  contentFavElement.innerHTML = '';
  renderFavorites(favorites, contentFavElement);
}
