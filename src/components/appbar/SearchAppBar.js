import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { fade } from '@material-ui/core/styles/colorManipulator'
import { withStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import PublicOutlined from '@material-ui/icons/PublicOutlined'
import AccountBox from '@material-ui/icons/AccountBox'
import { Redirect } from 'react-router-dom'

import SearchAppBarStore from './SearchAppBarStore'
import PreferencesStore from '../userpage/preferences/PreferencesStore'
import AppStore from '../AppStore'
import SearchAppBarActions from './SearchAppBarActions'
import PreferencesActions from '../userpage/preferences/PreferencesActions'
import SignInButton from './SignInButton'
import CreateAccountButton from './CreateAccountButton'
import UserProfileButton from './UserProfileButton'
import AutoComplete from './AutoComplete'

const styles = theme => ({
  root: {
    width: '100%',
    zIndex: 1300
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    display: 'none',
    width: 185,
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  search: {
    position: 'relative',

    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
  },
  inputRoot: {
    color: 'inherit',
    width: '100%'
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    width: '100%',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: 185
  }
})

class SearchAppBar extends React.Component {
  constructor (props) {
    super(props)
    this.classes = props.classes
    this.state = Object.assign({}, AppStore.getState(), PreferencesStore.getState().open, SearchAppBarStore.getState())
  }

  componentDidMount () {
    SearchAppBarStore.on('change', this.updateState)
    PreferencesStore.on('change', this.updateState)
    AppStore.on('change', this.updateState)

  }

  componentWillUnmount () {
    SearchAppBarStore.removeListener('change', this.updateState)
    PreferencesStore.removeListener('change', this.updateState)
    AppStore.removeListener('change', this.updateState)
  }

  handleChange = event => {
    SearchAppBarActions.searchbarChange(event.target.value)
  }

  handleSubmit = event => {
    if ((event.keyCode && event.keyCode === 13) || event.type === 'click') {
      SearchAppBarActions.searchbarSearch(this.state.searchQuery)
    }
  }

  toggleDrawer = () => {
    const { open, loggedInState } = this.state
    loggedInState === 'loggedIn'&& (open ? PreferencesActions.close() : PreferencesActions.open())
  }

  updateState = () => {
    const { loggedInState, searchQuery, open, user} = Object.assign({}, AppStore.getState(), SearchAppBarStore.getState(), PreferencesStore.getState())
    this.setState({ loggedInState, searchQuery, open, user })
  }

  render () {
    const { classes, page } = this.props
    const { loggedInState, open, user, userProfile } = this.state
    const isLoggedIn = loggedInState === 'loggedIn'
    if (userProfile.open) return <Redirect to={`/${user.username}/profile`} push />
    return (
      <div className={classes.root}>
        <AppBar position='static'>
          <Toolbar>
            {isLoggedIn && page !== 'admin'?
              <IconButton
                onClick={this.toggleDrawer}
                className={classes.menuButton}
                color='inherit'>
                {open ? <ChevronLeftIcon /> : <MenuIcon />}
              </IconButton>
              : <IconButton
                className={classes.menuButton}
                color='inherit'>
                <PublicOutlined />
            </IconButton>}
            <Typography className={classes.title} variant='h6' color='inherit' noWrap>
              Trip Planner
            </Typography>
            {page !== 'admin' &&  page !== 'landing' ?
              <div className={classes.grow}>
                <AutoComplete page='userpage'/>
              </div>
              : <div className={classes.grow} />
            }
            <div className={classes.buttonContainer}>
              <div className={classes.grow} />
              {isLoggedIn
                ? <UserProfileButton />
                : <CreateAccountButton />}
              <div className={classes.grow} />
              <SignInButton />
            </div>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default withStyles(styles)(SearchAppBar)
