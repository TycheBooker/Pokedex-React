/**
* Capitalizes string
* @param {string} string
* @returns {string}
*/

export function capitalize (string) {
  if (typeof string !== 'string') return ''
  return string.charAt(0).toUpperCase() + string.slice(1)
}

/**
* Toggles (adds/removes) an item in a set
* @param {Set} list
* @param {any} item
* @returns {Set}
*/

export function toggleInSet (list, item) {
  if (list.has(item)) {
    list.delete(item);
  } else {
    list.add(item);
  }
  return list;
}
