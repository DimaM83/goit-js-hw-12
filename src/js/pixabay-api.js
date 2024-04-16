import axios from 'axios';

export async function doFetch(aim, page) {
  const API_KEY = '16991331-df0a6792d36af314f174a3b15';
  const url = 'https://pixabay.com/api/';

  const response = await axios({
    url,
    params: {
      key: API_KEY,
      q: aim,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 15,
      page,
    },
  });
  return response;
}
