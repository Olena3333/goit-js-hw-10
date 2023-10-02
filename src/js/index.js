import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';

const selectEl = document.querySelector('.breed-select');
const loaderEl = document.querySelector('.loader');
const errorEl = document.querySelector('.error');
const divEl = document.querySelector('.cat-info');

//

fetchBreeds()
  .then(data => {
    const markup = data
      .map(cat => {
        return `<option value="${cat.id}">${cat.name}</option>`;
      })
      .join('');
    selectEl.innerHTML = markup;
    selectEl.classList.remove('is-hidden');
    new SlimSelect({
      select: '.breed-select',
    });
  })
  .catch(err => {
    errorEl.classList.remove('is-hidden');
    console.log(err);
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
  })
  .finally(() => {
    loaderEl.classList.add('is-hidden');
  });

function onChange() {
  loaderEl.classList.remove('is-hidden');
  errorEl.classList.add('is-hidden');
  const selectedCat = selectEl.value;

  fetchCatByBreed(selectedCat)
    .then(info => {
      renderPage(info);
    })
    .catch(err => {
      errorEl.classList.remove('is-hidden');
      console.log(err);
    })
    .finally(() => {
      loaderEl.classList.add('is-hidden');
    });
}

function renderPage(data) {
  loaderEl.classList.add('is-hidden');
  const markup = `
    <h2>${data[0].breeds[0].name}</h2>
    <img src="${data[0].url}" alt="cat" width = "800">
    <p>${data[0].breeds[0].description}</p>
    <p>${data[0].breeds[0].temperament}</p>
    `;
  divEl.innerHTML = markup;
}
selectEl.addEventListener('change', onChange);
