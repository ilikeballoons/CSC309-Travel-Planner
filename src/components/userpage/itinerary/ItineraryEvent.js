import React from 'react'
import { DragSource } from 'react-dnd'
import { withStyles } from '@material-ui/core/styles'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import IconButton from '@material-ui/core/IconButton'
import InfoIcon from '@material-ui/icons/Info'

const IMAGE_DIR = process.env.PUBLIC_URL + '/res/'

const styles = {
  icon: {
    color: 'rgba(255, 255, 255, 0.54)'
  },
  image: {
    maxWidth: 240,
    maxHeight: 180
  }
}

const itineraryEventSource = {
  beginDrag (props) {
    return { eventId: props.data.title }
  }
}

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
})

class ItineraryEvent extends React.Component {
  render () {
    const { classes, data } = this.props
    const { connectDragSource, isDragging } = this.props
    return connectDragSource(
      <div>
        <GridListTile key={data.title} style={{ opacity: isDragging ? 0.1 : 1 }}>
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
      </div>
    )
  }
}

export default DragSource('inventoryEvent', itineraryEventSource, collect)(withStyles(styles)(ItineraryEvent))
