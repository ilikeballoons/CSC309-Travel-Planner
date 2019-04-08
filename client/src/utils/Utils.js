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
  // client_id: 'PJ0VL1ZUL2THICUNZE4HEC5R1WN5UATZGFKFTVD1KXQRT0BZ',
  // client_secret: 'VGCF3ZIC2UVIHDRVMI5EWYMKGHWNTTIE4GDBDT2KQDASRBMQ'
}

const LoginStates = {
  noInput: 'noInput',
  usernameNotFound: 'usernameNotFound',
  incorrectPassword: 'incorrectPassword',
  loggedIn: 'loggedIn'
}

const profilePictures = {
  prefix: 'https://i.imgur.com/',
  links: [
    'uIZEE5b',
    '3MhRlC6',
    'JECLlly',
    '4z4y4Nn',
    'P4pK1j2',
    'WCfhEOP',
    'dlORaRy',
    'eNh4WVM',
    'qH9eRc2',
    'EK0lBUp',
    'TZjY6im',
    'Vz2QtkD',
    'Jy3jf6U',
    'nPWXfwP',
    'XNN8Gv2'
  ]
}

export { findWithAttribute, toTitleCase, foursquare, profilePictures, LoginStates }
