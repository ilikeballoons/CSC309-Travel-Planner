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
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Switch from '@material-ui/core/Switch'

import PreferencesStore from './PreferencesStore'
import PreferencesActions from './PreferencesActions'
import { toTitleCase } from '../../../utils/Utils'
import Icons from '../../../utils/Icons'

const styles = theme => ({
  drawerPaper: {
    position: 'absolute',
    top: 64
  },
  nested: {
   paddingLeft: theme.spacing.unit * 4
 },
 noMargin: {
   marginRight: 0
 },
 margin: {
   marginRight: 16
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
    const { classes } = this.props
    return (
      <List>
      {Object.entries(preferences).map(([key, value]) => (
        <div key={`${key} div`}>
          <ListItem key={`${key}/${value} item`}>
            <ListItemIcon>
              <IconButton onClick={() => this.handleToggleClick(key)}>
                {this.state.toggled[key] ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </ListItemIcon>
            <ListItemIcon className={classes.noMargin}>
              {Icons[key]}
            </ListItemIcon>
            <ListItemText className={classes.margin} primary={toTitleCase(key)} />
            <ListItemSecondaryAction>
              <Switch
                onChange={this.handleSwitchChange(key)}
                checked={this.getCategoryChecked(key)}
                value={key} />
            </ListItemSecondaryAction>
          </ListItem>
          <Collapse in={this.state.toggled[key]}  timeout='auto' unmountOnExit>
            <List component='div' className={classes.nested}>
              {Object.entries(value).map(([key, value]) => (
                <ListItem key={`${key} li`} >
                  <ListItemText className={classes.margin} primary={toTitleCase(key)} />
                  <ListItemSecondaryAction>
                    <Switch
                      onChange={this.handleSwitchChange(key)}
                      checked={value}
                      value={key} />
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Collapse>
          <Divider />
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
    const { classes } = this.props
    return (
      <Drawer
        variant='persistent'
        anchor='left'
        className={classes.root}
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}>
        {this.getDrawerContent()}
      </Drawer>
    )
  }
}

export default withStyles(styles)(Preferences)
