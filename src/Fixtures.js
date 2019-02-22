// this is a js file containing all of the hardcoded data which will come from the server in phase 2
const privileges = {
  admin: 1,
  user: 0
}

const users = [
  {
    username: 'user',
    privilege: privileges.user,
    password: 'user',
    fullName: 'Denny Wiseman'
  },
  {
    username: 'admin',
    privilege: privileges.admin,
    password: 'admin',
    fullName: 'Charlie Zhang'
  }
]

export default users
