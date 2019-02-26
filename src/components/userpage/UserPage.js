import React from 'react'
import Preferences from './preferences/Preferences'
import Recommendations from './Recommendations'
import Itinerary from './Itinerary'

export default class UserPage extends React.Component {
  render () {
    return (
      <div className='userpage'>
        <Preferences />
        <Recommendations />
        <Itinerary />
      </div>
    )
  }
}
