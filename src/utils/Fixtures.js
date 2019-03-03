import ago from '../images/ago.jpg'
import band from '../images/pkew.jpg'
import northropfryehall from '../images/northropfryehall.jpg'
import cntower from '../images/cntower.jpg'
import bahen from '../images/bahen.jpg'
import ripleysaquarium from '../images/ripleysaquarium.jpg'
import steves from '../images/steves.jpg'
import hashimoto from '../images/hashimoto.jpg'

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
    address: '317 Dundas St West',
    opens: '0900',
    closes: '2000',
    price: 2,
    image: ago
  },
  {
    title: 'PKEW @Horseshoe Tavern',
    category: 'Events',
    subcategory: 'Other Events',
    address: '370 Queen St West',
    opens: '2000',
    closes: '0100',
    price: 1,
    image: band
  },
  {
    title: 'Bahen Centre for Information Technology',
    category: 'Colleges & Universities',
    subcategory: 'College Academic Buildings',
    address: '40 St George St',
    opens: '0000',
    closes: '0000',
    price: 0,
    image: bahen
  },
  {
    title: 'Northrop Frye',
    category: 'Colleges & Universities',
    subcategory: 'College Academic Buildings',
    address: 'Building 515, 73 Queens Park Crescent East',
    opens: '0000',
    closes: '0000',
    price: 0,
    image: northropfryehall
  },
  {
    title: 'CN Tower',
    category: 'Professional & Other Places',
    subcategory: 'Buildings',
    address: '301 Front St West',
    opens: '0900',
    closes: '2230',
    price: 3,
    image: cntower
  },
  {
    title: 'Ripleys Aquarium of Canada',
    category: 'Arts & Entertainment',
    subcategory: 'Aquariums',
    address: '288 Bremner Blvd',
    opens: '0900',
    closes: '2300',
    price: 3,
    image: ripleysaquarium
  },
  {
    title: 'Hashimoto Restaurant',
    category: 'Food',
    subcategory: 'Japanese Restaurants',
    address: '6 Garamond Ct',
    opens: '1800',
    closes: '2300',
    price: 5,
    image: hashimoto
  },
  {
    title: 'Steves Music Store',
    category: 'Shops & Services',
    subcategory: 'Music Stores',
    address: '415 Queen St West',
    opens: '1000',
    closes: '2100',
    price: 3,
    image: steves
  }
]

export { users, recommendations }
