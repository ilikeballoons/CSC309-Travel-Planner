/* Global utils library for functions used all around the program */

// Returns the index in array of the object with attribute === value
function findWithAttribute (array, attribute, value) {
  for (let i = 0; i < array.length; i++) {
    if (array[i][attribute] === value) return i
  }
}
// Converts a string to title case (first letter capital)
function toTitleCase (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const foursquare = {
  client_id: 'GWDIYONQJRVOUVASBYK0PIVV3CTKQRKS0YZFKDLRFC0IMWYJ',
  client_secret: 'QE33JSW5PAOPEYN53WQMX1IMOUPMF3SOSYAXWMIAT0MKGCKG'
}

export { findWithAttribute, toTitleCase, foursquare }
