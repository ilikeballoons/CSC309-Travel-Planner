import React from 'react'

import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import LocalActivity from '@material-ui/icons/LocalActivity'
import LocalDining from '@material-ui/icons/LocalDining'
import AccountBalance from '@material-ui/icons/AccountBalance'
import Palette from '@material-ui/icons/Palette'
import Brightness3 from '@material-ui/icons/Brightness3'
import NaturePeople from '@material-ui/icons/NaturePeople'
import Home from '@material-ui/icons/Home'
import Map from '@material-ui/icons/Map'
import Business from '@material-ui/icons/Business'
import ShoppingCart from '@material-ui/icons/ShoppingCart'
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import Drawer from '@material-ui/core/Drawer'
import Collapse from '@material-ui/core/Collapse'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel';

import PreferencesStore from './PreferencesStore'
import PreferencesActions from './PreferencesActions'
import { toTitleCase } from '../../../Utils'

const icons = {
  'Arts & Entertainment': <Palette />,
  'Colleges & Universities': <AccountBalance />,
  'Events': <LocalActivity />,
  'Food': <LocalDining />,
  'Nightlife Spots': <Brightness3 />,
  'Outdoors & Recreation': <NaturePeople />,
  'Professional & Other Places': <Business />,
  'Residences': <Home />,
  'Shops & Services': <ShoppingCart />,
  'Travel & Transport': <Map />
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
              {icons[key]}
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

  handleDrawerOpen = () => PreferencesActions.open()

  handleDrawerClose = () => PreferencesActions.close()

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
      <div className='root'>
        <IconButton onClick={this.handleDrawerOpen}>
          Open Preferences {/* this button looks awful but i'll leave it for now, delete this line if necessary*/}
          <ChevronRightIcon />
        </IconButton>
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