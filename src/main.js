import { doFetch } from './js/pixabay-api.js';

import { makeGallery } from './js/render-functions.js';

import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form-search');
const loader = document.querySelector('.loader');
loader.style.borderColor = 'white';
loader.style.borderBottomColor = 'transparent';
const photoGallery = document.querySelector('.images-place');

const buttonMore = document.querySelector('.buttonMore');

const book = new SimpleLightbox('.card .place-for-image a', {
  captionsData: 'alt',
  captionDelay: 250,
});

form.addEventListener('submit', handleSearch);
buttonMore.addEventListener('click', searchMore);

let page = 1;
let pageLimit;
let searchWord;

async function handleSearch(event) {
  event.preventDefault();
  buttonMore.hidden = true;
  photoGallery.innerHTML = '';
  loader.style.borderColor = 'black';
  loader.style.borderBottomColor = 'transparent';

  searchWord = event.currentTarget.elements.inputSearch.value.trim();

  if (searchWord === '') {
    iziToast.show({
      title: 'Oops!',
      titleColor: 'white',
      message: 'Please enter a valid search query!',
      messageColor: 'white',
      color: 'red',
      position: 'topCenter',
      timeout: 5000,
    });
    return;
  }

  page = 1;

  try {
    const data = await doFetch(searchWord, page);

    if (data.total === 0) {
      iziToast.show({
        title: 'Oops!',
        titleColor: 'white',
        message: 'No images found. Try another query.',
        messageColor: 'white',
        color: 'red',
        position: 'topCenter',
        timeout: 5000,
      });
      return;
    }

    buttonMore.hidden = false;
    photoGallery.insertAdjacentHTML('beforeend', makeGallery(data.data));
    book.refresh();
    event.target.reset();
    page += 1;
    pageLimit = Math.floor(data.data.totalHits / 15);

    if (page === pageLimit) {
      iziToast.show({
        titleColor: 'white',
        message: `You've reached the end of search results.`,
        messageColor: 'white',
        color: 'blue',
        position: 'topCenter',
        timeout: 5000,
      });
      buttonMore.hidden = true;
    }
  } catch (error) {
    buttonMore.hidden = true;
    iziToast.show({
      title: 'Error!',
      titleColor: 'white',
      message: error.message,
      messageColor: 'white',
      color: 'red',
      position: 'topCenter',
      timeout: 5000,
    });
  } finally {
    loader.style.borderColor = 'white';
    loader.style.borderBottomColor = 'transparent';
  }
}

async function searchMore() {
  buttonMore.hidden = true;
  loader.style.borderColor = 'black';
  loader.style.borderBottomColor = 'transparent';

  try {
    const data = await doFetch(searchWord, page);

    if (data.total === 0) {
      iziToast.show({
        title: 'Oops!',
        titleColor: 'white',
        message: 'No more images found.',
        messageColor: 'white',
        color: 'red',
        position: 'topCenter',
        timeout: 5000,
      });
      return;
    }

    photoGallery.insertAdjacentHTML('beforeend', makeGallery(data.data));
    book.refresh();
    page += 1;

    const { height: cardHeight } =
      photoGallery.firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    if (page > pageLimit) {
      iziToast.show({
        titleColor: 'white',
        message: `You've reached the end of search results.`,
        messageColor: 'white',
        color: 'blue',
        position: 'topCenter',
        timeout: 5000,
      });
      buttonMore.hidden = true;
    } else {
      buttonMore.hidden = false;
    }
  } catch (error) {
    buttonMore.hidden = true;
    iziToast.show({
      title: 'Error!',
      titleColor: 'white',
      message: error.message,
      messageColor: 'white',
      color: 'red',
      position: 'topCenter',
      timeout: 5000,
    });
  } finally {
    loader.style.borderColor = 'white';
    loader.style.borderBottomColor = 'transparent';
  }
}
