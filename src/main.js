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
  searchWord = event.currentTarget.elements.inputSearch.value;
  page = 1;

  doFetch(searchWord, page)
    .then(data => {
      if (data.total == 0) {
        iziToast.show({
          title: 'Ops.',
          titleColor: 'white',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          messageColor: 'white',
          color: 'red',
          position: 'topCenter',
          timeout: '5000',
        });
        return;
      } else {
        buttonMore.hidden = false;
        photoGallery.insertAdjacentHTML('beforeend', makeGallery(data.data));
        book.refresh();
        event.target.reset();
        page = page + 1;
        pageLimit = Math.floor(data.data.totalHits / 15);

        if (page == pageLimit) {
          iziToast.show({
            titleColor: 'white',
            message: `We're sorry, but you've reached the end of search results.!`,
            messageColor: 'white',
            color: 'blue',
            position: 'topCenter',
            timeout: '5000',
          });
          buttonMore.hidden = true;
        }
      }
    })
    .catch(error => {
      iziToast.show({
        title: 'Ops.',
        titleColor: 'white',
        message: error,
        messageColor: 'white',
        color: 'red',
        position: 'topCenter',
        timeout: '5000',
      });
    })
    .finally(() => {
      loader.style.borderColor = 'white';
      loader.style.borderBottomColor = 'transparent';
    });
}

async function searchMore(event) {
  buttonMore.hidden = true;
  loader.style.borderColor = 'black';
  loader.style.borderBottomColor = 'transparent';

  doFetch(searchWord, page)
    .then(data => {
      console.log(data.data);

      if (data.total == 0) {
        iziToast.show({
          title: 'Ops.',
          titleColor: 'white',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          messageColor: 'white',
          color: 'red',
          position: 'topCenter',
          timeout: '5000',
        });
        return;
      } else {
        buttonMore.hidden = false;
        photoGallery.insertAdjacentHTML('beforeend', makeGallery(data.data));
        book.refresh();
        page = page + 1;
        if (page > pageLimit) {
          iziToast.show({
            titleColor: 'white',
            message: `We're sorry, but you've reached the end of search results.!`,
            messageColor: 'white',
            color: 'blue',
            position: 'topCenter',
            timeout: '5000',
          });
          buttonMore.hidden = true;
        }
      }
    })
    .catch(error => {
      iziToast.show({
        title: 'Ops.',
        titleColor: 'white',
        message: error,
        messageColor: 'white',
        color: 'red',
        position: 'topCenter',
        timeout: '5000',
      });
    })
    .finally(() => {
      loader.style.borderColor = 'white';
      loader.style.borderBottomColor = 'transparent';
    });
}
