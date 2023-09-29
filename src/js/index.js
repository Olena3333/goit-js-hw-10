import axios from 'axios';

import { fetchBreeds, fetchCatByBreed } from './cat-api';

const selectEl = document.querySelector('.breed-select');
const loaderEl = document.querySelector('.loader');
const errorEl = document.querySelector('.error');
const divEl = document.querySelector('.cat-info');

loaderEl.classList.add('is-hidden');
errorEl.classList.add('is-hidden');

fetchBreeds()
  .then(data => {
    const markup = data
      .map(cat => {
        return `<option value="${cat.id}">${cat.name}</option>`;
      })
      .join('');
    selectEl.innerHTML = markup;
  })
  .catch(err => {
    console.log(err);
  });

function onChange() {
  const selectedCat = selectEl.value;
  console.log(selectedCat);
  fetchCatByBreed(selectedCat)
    .then(info => {
      renderPage(info);
    })
    .catch(err => {
      console.log(err);
    });
}

function renderPage(data) {
  const markup = `
    <img src="${data[0].url}" alt="cat" width = "800">
    <h2>${data[0].breeds[0].name}</h2>
    <p>${data[0].breeds[0].description}</p>
    <p>${data[0].breeds[0].temperament}</p>
    `;
  divEl.innerHTML = markup;
}
selectEl.addEventListener('change', onChange);
