import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import IconButton from '@material-ui/core/IconButton'
import InfoIcon from '@material-ui/icons/Info'

const IMAGE_DIR = process.env.PUBLIC_URL + '/res/'

const toHHMM = function (string) {
  let hours = string.slice(0, 2)
  let minutes = string.slice(2, 4)
  return (hours + ':' + minutes)
}

const styles = {
  icon: {
    color: 'rgba(255, 255, 255, 0.54)'
  },
  image: {
    maxWidth: 240,
    maxHeight: 180
  }
}

class ItineraryEvent extends React.Component {
  render () {
    const { classes, data } = this.props
    return (
      <GridListTile key={data.title}>
        <img src={IMAGE_DIR + data.image} alt={data.title} className={classes.image} />
        <GridListTileBar
          title={data.title}
          subtitle={<span>{data.address}</span>}
          actionIcon={
            <IconButton className={classes.icon}>
              <InfoIcon />
            </IconButton>
          }
        />
      </GridListTile>
    )
  }
}

export default withStyles(styles)(ItineraryEvent)
