import React from 'react'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import LocalActivity from '@material-ui/icons/LocalActivity'
import LocalDining from '@material-ui/icons/LocalDining'
import AccountBalance from '@material-ui/icons/AccountBalance'
import DirectionsWalk from '@material-ui/icons/DirectionsWalk'

import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel';

import PreferencesStore from './PreferencesStore'
import PreferencesActions from './PreferencesActions'
import { toTitleCase } from '../../../Utils'

const icons = {
  sightseeing: <AccountBalance />,
  food: <LocalDining />,
  tours: <DirectionsWalk />,
  events: <LocalActivity />
}
class Preferences extends React.Component {
  constructor () {
    super()
    this.state = PreferencesStore.getState()
  }

  componentDidMount () {
    PreferencesStore.on('change', this.updateState)
  }

  componentWillUnmount () {
    PreferencesStore.removeListener('change', this.updateState)
  }

  updateState = () => this.setState(PreferencesStore.getState())

  getDrawerContent = () => {
    const { preferences } = this.state
    return (
      <List>
      {Object.entries(preferences).map(([key, value]) => (
        <div key={`${key} div`}>
          <ListItem key={`${key}/${value} item`}>
            <FormControlLabel
              control={
                <Switch
                  onChange={this.handleSwitchChange(key)}
                  checked={this.getCategoryChecked(key)}
                  value={key} />
              }
              label={toTitleCase(key)} />
              {icons[key]}
          </ListItem>
          <Divider />
          {Object.entries(value).map(([key, value]) => (
            <ListItem key={`${key} li`}>
              <FormControlLabel
                control={
                  <Switch
                    onChange={this.handleSwitchChange(key)}
                    checked={value}
                    value={key} />
                  }
                label={toTitleCase(key)} />
            </ListItem>
          ))}
          </div>
      ))}
      </List>
    )
  }

  getCategoryChecked = (category) => {
    const { preferences } = this.state
    return Object.values(preferences[category]).every(value =>(
      value === true
    ))
  }

  handleDrawerOpen = () => PreferencesActions.open()

  handleDrawerClose = () => PreferencesActions.close()

  handleSwitchChange = name => event => {
    const { preferences } = this.state
    if (Object.keys(preferences).includes(name)) {
      Object.entries(preferences[name]).forEach(([key, value]) => (
        PreferencesActions.change({[key]: event.target.checked})
      ))
    } else {
      PreferencesActions.change({[name]: event.target.checked})
    }
  }

  render () {
    const { open } = this.state
    return (
      <div className='root'>
        <Drawer
          variant='persistent'
          anchor='left'
          open={open} >
          <div>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          {this.getDrawerContent()}
        </Drawer>
      </div>
    )
  }
}

export default Preferences
