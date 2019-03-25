import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'

import UserActions from '../UserActions'

const styles = theme => ({
  card: {
    minWidth: 275
  },
  cost: {
    color: theme.palette.primary.main
  },
  remove: {
    color: theme.palette.secondary.main
  }
})
class ItineraryEventInfo extends React.Component {
  handleClick = () => {
    UserActions.removeEvent(this.props.id)
    UserActions.addRecommendation(this.props.data)
  }

  render () {
    const { classes, data } = this.props
    const { pluralName, address, price, opens, closes } = data
    const hours = opens === closes ? 'Open 24 hours' : `Open from ${opens} until ${closes}`
    const cost = price > 0 ? '$'.repeat(price) : 'Free'
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography gutterBottom variant='h5'>{address}</Typography>
          <Typography variant='subtitle2'>{pluralName}</Typography>
          <Typography variant='body1'>{hours}</Typography>
          <Typography className={classes.cost} variant='body1'>{cost}</Typography>
        </CardContent>
        <CardActions>
          <Button
            className={classes.remove}
            onClick={this.handleClick}
            size='small'>
            Remove
          </Button>
        </CardActions>
      </Card>
    )
  }
}

export default withStyles(styles)(ItineraryEventInfo)
