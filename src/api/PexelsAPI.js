
import curated001 from './data/curated_001.json';

const API_KEY = '563492ad6f91700001000001225f5ac4ebaf4dac8fd3481d7755beae';


function curatePhotosAPI(page) {
  const perPage = 80;
  const url = `https://api.pexels.com/v1/curated?page=${page}&per_page=${perPage}`;

  return fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': API_KEY,
    },
  }).then(response => {
    return response.json();
  }).then(result => result);
}

function localData() {
  return new Promise((res, rej) => {
    res(curated001);
  });
}

export function getCuratedPhotos() {
  return localData();
}

export function getCuratePhotosForPage(page) {
  return curatePhotosAPI(page);
}