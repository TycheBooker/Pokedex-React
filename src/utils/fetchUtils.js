/**
* Data loader with error handler
* @param {String} url
* @returns {Promise}
*/

export function loadData(path) {
  return fetch(path)
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
