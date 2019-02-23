import React from 'react'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel';

import PreferencesStore from './PreferencesStore'
import PreferencesActions from './PreferencesActions'
import { toTitleCase } from '../../../Utils'

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
            <ListItemText primary={toTitleCase(key)} />
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

  handleDrawerOpen = () => PreferencesActions.open()

  handleDrawerClose = () => PreferencesActions.close()

  handleSwitchChange = name => event => PreferencesActions.change({[name]: event.target.checked})

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
