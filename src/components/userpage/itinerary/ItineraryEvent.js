import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Popover from '@material-ui/core/Popover'
import Typography from '@material-ui/core/Typography'
import LocalActivity from '@material-ui/icons/LocalActivity'
import InfoIcon from '@material-ui/icons/Info'

import { findWithAttribute } from '../../../Utils'
import UserActions from '../UserActions'
import ItineraryStore from './ItineraryStore'

const styles = theme => ({
  root: {
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: theme.shape.borderRadius
  },
  icon: {
    color: theme.palette.primary.light
  },
  typography: {
    margin: theme.spacing.unit * 2
  }
})

class ItineraryEvent extends React.Component {
  constructor (props) {
    super(props)
    this.state = { anchorEl: null }
  }

  componentDidMount () {
    ItineraryStore.on('change', this.updateState)
  }

  componentWillUnmount () {
    ItineraryStore.removeListener('change', this.updateState)
  }

  updateState = () => {
    this.setState({ anchorEl: this.getAnchorEl()})
  }

  getAnchorEl = () => {
    const { id } = this.props
    const eventIndex = findWithAttribute(ItineraryStore.getState().events, 'id', id)
    if(!isNaN(eventIndex)) {
      const anchorEl = ItineraryStore.getState().events[eventIndex].anchorEl
      return anchorEl
    }
  }

  handleClick = (e) => UserActions.infoOpen({
    anchorEl: e.currentTarget,
    id: this.props.id
  })
  handleClose = () => UserActions.infoClose({
    anchorEl: null,
    id: this.props.id
  })

  render () {
    const { data, classes, id } = this.props
    const { anchorEl } = this.state
    const open = Boolean(anchorEl)

    return (
      <div className={classes.root}>
        <Button variant='text' color='primary'>
          <LocalActivity />
          {data.title}
        </Button>
        <IconButton
          className={classes.icon}
          aria-owns={open ? id : undefined}
          aria-haspopup='true'
          onClick={this.handleClick}
          >
          <InfoIcon />
        </IconButton>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
        >
          <Typography className={classes.typography}>Content</Typography>
        </Popover>
      </div>
    )
  }
}

export default withStyles(styles)(ItineraryEvent)
  // info icon displays popup with address, price, and photo?
