import React from 'react'
import '../../css/userpage/UserPage.css'

import Preferences from './preferences/Preferences'
import Recommendations from './Recommendations'
import Itinerary from './itinerary/Itinerary'
import SearchAppBar from '../landing/SearchAppBar'

export default class UserPage extends React.Component {
  render () {
    return (
      <div className='userpage'>
        <SearchAppBar />
        <div>
          <Preferences />
          <Recommendations />
          <Itinerary />
        </div>
      </div>
    )
  }
}
