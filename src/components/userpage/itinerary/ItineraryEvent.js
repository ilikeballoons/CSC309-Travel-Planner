import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Popover from '@material-ui/core/Popover'
import InfoIcon from '@material-ui/icons/Info'

import { findWithAttribute } from '../../../utils/Utils'
import UserActions from '../UserActions'
import ItineraryStore from './ItineraryStore'
import ItineraryEventInfo from './ItineraryEventInfo'
import Icons from '../../../utils/Icons'

const styles = theme => ({
  root: {
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: theme.shape.borderRadius,
    maxWidth: 425,
    marginLeft: 10

  },
  title: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: 298
  },
  icon: {
    color: theme.palette.primary.light,
    padding: '10px 5px 10px 5px'
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
          {Icons[data.category]}
          <span className={classes.title}>{data.title}</span>
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
          <ItineraryEventInfo data={data} id={id} />
        </Popover>
      </div>
    )
  }
}

export default withStyles(styles)(ItineraryEvent)
