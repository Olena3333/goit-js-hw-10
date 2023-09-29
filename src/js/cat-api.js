const BASE_URL = 'https://api.thecatapi.com/v1';
const END_POINT = '/breeds';

const options = {
  headers: {
    'x-api-key':
      'live_5EvsygYt4Y69Hx6oMgbvK9WI21f9ZrKAaktliolpLK1A1U927Q8J4DhXoEIgj6pu',
  },
};

export function fetchBreeds() {
  const url = `${BASE_URL}${END_POINT}`;
  return fetch(url, options).then(res => {
    if (!res.ok) {
      throw new Error(res.status);
    }
    return res.json();
  });
}

export function fetchCatByBreed(breedId) {
  const url = `${BASE_URL}/images/search?breed_ids=${breedId}`;
  return fetch(url, options).then(res => {
    if (!res.ok) {
      throw new Error(res.status);
    }
    return res.json();
  });
}
