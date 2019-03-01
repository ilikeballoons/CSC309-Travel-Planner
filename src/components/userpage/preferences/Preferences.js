import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import IconButton from '@material-ui/core/IconButton'
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import Drawer from '@material-ui/core/Drawer'
import Collapse from '@material-ui/core/Collapse'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel';

import PreferencesStore from './PreferencesStore'
import PreferencesActions from './PreferencesActions'
import { toTitleCase } from '../../../Utils'
import Icons from '../../../Icons'

const styles = theme => ({
  drawerPaper: {
    zIndex: '1 !important'
  }
})

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
          <Divider />
          <ListItem key={`${key}/${value} item`}>
            <ListItemIcon>
              <IconButton onClick={() => this.handleToggleClick(key)}>
                {this.state.toggled[key] ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </ListItemIcon>
            <FormControlLabel
              control={
                <Switch
                  onChange={this.handleSwitchChange(key)}
                  checked={this.getCategoryChecked(key)}
                  value={key} />
              }
              label={toTitleCase(key)} />
            {Icons[key]}
          </ListItem>
          <Collapse in={this.state.toggled[key]}  timeout='auto' unmountOnExit>
            <List component='div' disablePadding>
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
            </List>
          </Collapse>
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

  handleToggleClick = key => PreferencesActions.toggleCategory(key)

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
      <div>
        <Drawer
          variant='persistent'
          anchor='left'
          open={open}
          classes={{
            paper: 'drawerPaper'
          }}>
          {this.getDrawerContent()}
        </Drawer>
      </div>
    )
  }
}

export default withStyles(styles)(Preferences)
