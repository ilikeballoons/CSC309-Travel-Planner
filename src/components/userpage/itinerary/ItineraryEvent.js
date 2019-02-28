import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import LocalActivity from '@material-ui/icons/LocalActivity'
import IconButton from '@material-ui/core/IconButton'
import InfoIcon from '@material-ui/icons/Info'

const styles = theme => ({
  root: {
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: theme.shape.borderRadius
  },
  icon: {
    color: theme.palette.primary.light
  }
})

class ItineraryEvent extends React.Component {
  render () {
    const { data, classes } = this.props
    return (
      <div className={classes.root}>
        <Button variant='text' color='primary'>
          <LocalActivity />
          {data.title}
        </Button>
        <IconButton className={classes.icon}>
          <InfoIcon />
        </IconButton>
      </div>
    )
  }
}

export default withStyles(styles)(ItineraryEvent)
  // info icon displays popup with address, price, and photo?
