import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const IMAGE_DIR = '../../images/'

const toHHMM = function (string) {
  let hours = string.slice(0, 2)
  let minutes = string.slice(2, 4)
  return (hours + ':' + minutes)
}

const styles = {
  card: {
    maxWidth: 345
  },

  media: {
    height: 140
  }
}

class ItineraryEvent extends React.Component {
  render () {
    return (
      <Card className='card'>
        <CardActionArea>
          <CardMedia className='media'
            component='img'
            alt={this.props.data.title}
            height='140'
            image={IMAGE_DIR + this.props.data.image}
            title={this.props.data.title}
          />
          <CardContent>
            <Typography gutterBottom variant='h5' component='h2'>
              {this.props.data.title}
            </Typography>
            <Typography component='p'>
              Opens at: {toHHMM(this.props.data.opens)}. <br />
              Closes at: {toHHMM(this.props.data.closes)}. <br />
            Cost: {<span className='red'>{'$'.repeat(this.props.data.price)}</span>}.
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    )
  }
}

export default withStyles(styles)(ItineraryEvent)
