import React from 'react'
import SearchAppBar from '../appbar/SearchAppBar'
import SigninDialog from '../appbar/SigninDialog'
import CreateAccountDialog from '../appbar/CreateAccountDialog'
import SearchBarCenter from './SearchBarCenter'
import { withStyles } from '@material-ui/core/styles'
import landingPageBg from '../../images/landingPageBg.jpg'

const styles = theme => ({
  landing: {
    minHeight: '100vh',
    backgroundImage: `url('${landingPageBg}')`,
    backgroundSize: 'cover'
  },

  signInButtonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: 8
  },

  landingCenterPanel: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 200
  }
})

class Landing extends React.Component {
  render () {
    const { classes } = this.props
    return (
      <div className={classes.landing}>
        <SearchAppBar page='landing' />
        <div className={classes.landingCenterPanel}>
          <SigninDialog />
          <CreateAccountDialog />
          <SearchBarCenter />
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Landing)
