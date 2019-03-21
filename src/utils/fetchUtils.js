/**
* Data loader with error handler and default apiUrl
* @param {String} url
* @returns {Promise}
*/

export function loadData(path) {
  const apiUrl = 'https://pokeapi.co/api/v2/';

  return fetch(apiUrl + path)
    .then(response => {
      if (response.status !== 200) {
        console.error(
          'Error response from server. Status Code: ' + response.status
        );
        return;
      }

      return response.json()
    })
    .catch(err => {
      console.error('Fetch Error:', err);
    });
}
