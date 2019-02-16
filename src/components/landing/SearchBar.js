import React from 'react'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'
import IconButton from '@material-ui/core/IconButton'
import '../../css/landing/SearchBar.css'

export default class SearchBar extends React.Component {
  render () {
    return (
      <Paper className='searchBar'>
        <IconButton className='searchBarIconButton'>
          <SearchIcon />
        </IconButton>
        <InputBase className='searchBarInput' placeholder='City, province, country e.g. Toronto, ON, Canada' />
      </Paper>
    )
  }
}
