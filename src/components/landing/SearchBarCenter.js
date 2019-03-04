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
    this.state = { searchQuery: '' }
  }

  componentDidMount () {
    SearchAppBarStore.on('change', this.updateState)
  }

  componentWillUnmount () {
    SearchAppBarStore.removeListener('change', this.updateState)
  }

  updateState = () => {
    const { searchQuery } = SearchAppBarStore.getState()
    this.setState({ searchQuery }) // possible error
  }

  handleChange = event => SearchAppBarActions.searchbarChange(event.target.value)
  handleDateChange = date => SearchAppBarActions
  handleSubmit = event => SearchAppBarActions.signinDialogOpen()

  render () {
    const { classes } = this.props
    const { searchQuery } = this.state
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              value={this.state.birthday}
              onChange={this.handleDateChange}
              disableFuture
              label='Date of birth'
              openTo='year'
              fullWidth
              required
              format='dd/MM/yyyy'
              views={['year', 'month', 'day']}/>
          </MuiPickersUtilsProvider>
        {/*  <TextField
            id="date"
            label="Date of Trip"
            type="date"
            defaultValue="2018-03-01"
            className={classes.textField}
            InputLabelProps={{
            shrink: true,
            }}
          /> */}
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
