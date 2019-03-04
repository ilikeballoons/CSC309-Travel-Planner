import React from 'react'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import DateFnsUtils from '@date-io/date-fns'
import { DatePicker, MuiPickersUtilsProvider  } from 'material-ui-pickers';


import MyAutoComplete from './AutoComplete'
import SearchAppBarActions from '../appbar/SearchAppBarActions'
import SearchAppBarStore from '../appbar/SearchAppBarStore'

const styles = theme => ({
  root : {
    width: '100%'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  }
})

class SearchBarCenter extends React.Component {
  constructor (props) {
    super(props)
    this.state = { searchQuery: '', travelDate: new Date() }

  }

  componentDidMount () {
    SearchAppBarStore.on('change', this.updateState)
  }

  componentWillUnmount () {
    SearchAppBarStore.removeListener('change', this.updateState)
  }

  updateState = () => {
    const { searchQuery, travelDate } = SearchAppBarStore.getState()
    this.setState({ searchQuery, travelDate }) // possible error
  }

  handleChange = event => SearchAppBarActions.searchbarChange(event.target.value)
  handleDateChange = date => SearchAppBarActions.landingSearchbarDateChange(date)
  handleSubmit = event => SearchAppBarActions.signinDialogOpen()
  render () {
    const { classes } = this.props
    const { searchQuery, travelDate } = this.state

    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              value={travelDate}
              onChange={this.handleDateChange}
              disableFuture
              label='Travel Dates'
              openTo='year'
              fullWidth
              format='dd/MM/yyyy'
              views={['year', 'month', 'day']}/>
          </MuiPickersUtilsProvider>
        </div>
        <div className={classes.container}>
          <MyAutoComplete />
        </div>
        <div className={classes.container}>
          <Button variant="contained" color="primary" className={classes.button} onClick={(e) => this.handleSubmit(e)}>
            Search
          </Button>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(SearchBarCenter)
