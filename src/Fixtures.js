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
    fullName: 'Denny Wiseman',
    birthday: ''
  },
  {
    username: 'admin',
    privilege: privileges.admin,
    password: 'admin',
    fullName: 'Charlie Zhang',
    birthday: ''
  }
]

// For now, pricing will be from 1-3 dollar signs
const recommendations = [
  {
    title: 'Art Gallery of Ontario',
    category: 'Arts & Entertainment',
    subcategory: 'Art Galleries',
    address: '317 Dundas St W',
    opens: '0900',
    closes: '2000',
    price: 2,
    image: 'ago.jpg'
  },
  {
    title: 'PKEW @Horseshoe Tavern',
    category: 'Events',
    subcategory: 'Other Events',
    address: '370 Queen St W',
    opens: '2000',
    closes: '0100',
    price: 1,
    image: 'pkew.jpg'
  }
]

export { users, recommendations }
