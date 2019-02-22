/* Global utils library for functions used all around the program */

// Returns the index in array of the object with attribute === value
export function findWithAttribute (array, attribute, value) {
  for (let i = 0; i < array.length; i++) {
    if (array[i][attribute] === value) return i
  }
}
