import React from 'react'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import DateFnsUtils from '@date-io/date-fns'
import { DatePicker, MuiPickersUtilsProvider  } from 'material-ui-pickers'

import AutoComplete from '../appbar/AutoComplete'
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
    this.state = { travelDate: new Date(), searchQuery: '' }
  }

  componentDidMount () {
    SearchAppBarStore.on('change', this.updateState)
    this._isMounted = true

  }

  componentWillUnmount () {
    SearchAppBarStore.removeListener('change', this.updateState)
    this._isMounted = false
  }

  updateState = () => {
    const { travelDate, searchQuery } = SearchAppBarStore.getState()
    this._isMounted && this.setState({ travelDate, searchQuery })
  }

  handleDateChange = date => SearchAppBarActions.landingSearchbarDateChange(date)
  handleSubmit = event => SearchAppBarActions.signinDialogOpen()
  render () {
    const { classes } = this.props
    const { travelDate, searchQuery } = this.state

    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              value={travelDate}
              onChange={this.handleDateChange}
              disablePast
              label='Travel Date'
              openTo='year'
              fullWidth
              format='dd/MM/yyyy'
              views={['year', 'month', 'day']}/>
          </MuiPickersUtilsProvider>
        </div>
        <div className={classes.container}>
          <AutoComplete page='landing' searchQuery={searchQuery}/>
        </div>
        <div className={classes.container}>
          <Button variant="contained" color="primary" className={classes.button} onClick={this.handleSubmit}>
            Search
          </Button>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(SearchBarCenter)
