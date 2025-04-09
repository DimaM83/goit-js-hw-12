import { doFetch } from './js/pixabay-api.js';

import { makeGallery } from './js/render-functions.js';

import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

function showToast({ title = 'Oops!', message = '', color = 'red' }) {
  iziToast.show({
    title,
    titleColor: 'white',
    message,
    messageColor: 'white',
    color,
    position: 'topCenter',
    timeout: 5000,
  });
}

const form = document.querySelector('.form');
const loader = document.querySelector('.loader-text');

const photoGallery = document.querySelector('.gallery');

const buttonMore = document.querySelector('.buttonMore');

const book = new SimpleLightbox('.card .place-for-image a', {
  captionsData: 'alt',
  captionDelay: 250,
});

form.addEventListener('submit', handleSearch);
buttonMore.addEventListener('click', searchMore);

let page = 1;
let searchWord;

async function handleSearch(event) {
  event.preventDefault();
  buttonMore.hidden = true;
  photoGallery.innerHTML = '';
  loader.hidden = false;

  searchWord = event.currentTarget.elements.inputSearch.value.trim();

  if (searchWord === '') {
    showToast({ message: 'No images found. Try another query.' });
    loader.hidden = true;
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

    if (photoGallery.children.length >= data.data.totalHits) {
      buttonMore.hidden = true;
      showToast({
        title: 'Info',
        message: "You've reached the end of search results.",
        color: 'blue',
      });
    }
  } catch (error) {
    buttonMore.hidden = true;

    showToast({ title: 'Error!', message: error.message });
  } finally {
    loader.hidden = true;
  }
}

async function searchMore() {
  buttonMore.hidden = true;

  loader.hidden = false;

  try {
    const data = await doFetch(searchWord, page);

    if (data.total === 0) {
      showToast({ message: 'No more images found.' });

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

    if (photoGallery.children.length >= data.data.totalHits) {
      buttonMore.hidden = true;
      showToast({
        title: 'Info',
        message: "You've reached the end of search results.",
        color: 'blue',
      });
    } else {
      buttonMore.hidden = false;
    }
  } catch (error) {
    buttonMore.hidden = true;

    showToast({ title: 'Error!', message: error.message });
  } finally {
    loader.hidden = true;
  }
}
