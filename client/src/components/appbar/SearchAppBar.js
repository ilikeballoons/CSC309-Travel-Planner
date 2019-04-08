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
import { Redirect } from 'react-router-dom'

import SearchAppBarStore from './SearchAppBarStore'
import PreferencesStore from '../userpage/preferences/PreferencesStore'
import PreferencesActions from '../userpage/preferences/PreferencesActions'
import SignInButton from './SignInButton'
import CreateAccountButton from './CreateAccountButton'
import UserProfileButton from './UserProfileButton'
import ConfirmAccountCreateSnackbar from './ConfirmAccountCreateSnackbar'
import ItineraryButton from './ItineraryButton'
import AutoComplete from './AutoComplete'
import { LoginStates } from '../../utils/Utils'

const styles = theme => ({
  root: {
    width: '100%',
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
    this.state = { open: true, ...SearchAppBarStore.getState() } // prefererences will be open by default
  }

  componentDidMount () {
    SearchAppBarStore.on('change', this.updateState)
    PreferencesStore.on('change', this.updateState)
    this._isMounted = true
  }

  componentWillUnmount () {
    SearchAppBarStore.removeListener('change', this.updateState)
    PreferencesStore.removeListener('change', this.updateState)
    this._isMounted = false
  }

  toggleDrawer = () => {
    const { open, login } = this.state
    login.loggedInState === LoginStates.loggedIn && (open ? PreferencesActions.close() : PreferencesActions.open())
  }

  updateState = () => {
    const { login, searchQuery, open, createAccount: { snackbarOpen }, travelDate } = {...SearchAppBarStore.getState(), ...PreferencesStore.getState()}
    this._isMounted && this.setState({ login, searchQuery, open, snackbarOpen, travelDate })
  }

  render () {
    const { classes, page } = this.props
    const { login: { username, loggedInState }, open, userProfile, snackbarOpen, searchQuery, travelDate } = this.state
    const isLoggedIn = loggedInState === LoginStates.loggedIn
    if (page === 'userPage' && userProfile.open) return <Redirect to={`/${username}/profile`} push />
    if (page === 'userProfile' && !userProfile.open) return <Redirect to={`/${username}`} push />
    return (
      <div className={classes.root}>
        <AppBar position='static'>
          <Toolbar>
            {isLoggedIn && page === 'userPage'
              ? <IconButton
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
            {page === 'userPage'
              ? <div className={classes.grow}>
                  <AutoComplete page='userPage' searchQuery={searchQuery} travelDate={travelDate} />
                </div>
              : <div className={classes.grow} />
            }
            <div className={classes.buttonContainer}>
              <div className={classes.grow} />
              {isLoggedIn
                ? page === 'userProfile'
                  ? <ItineraryButton searchQuery={searchQuery} travelDate={travelDate}/>
                  : <UserProfileButton />
                : <CreateAccountButton />}
              <div className={classes.grow} />
              <SignInButton />
            </div>
          </Toolbar>
        </AppBar>
        <ConfirmAccountCreateSnackbar open={snackbarOpen} />
      </div>
    )
  }
}

export default withStyles(styles)(SearchAppBar)
