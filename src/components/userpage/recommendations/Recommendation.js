import React from 'react'
import { findDOMNode } from 'react-dom' // to fix: https://github.com/react-dnd/react-dnd/issues/347
import { DragSource } from 'react-dnd'
import { withStyles } from '@material-ui/core/styles'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import IconButton from '@material-ui/core/IconButton'
import InfoIcon from '@material-ui/icons/Info'

const styles = theme => ({
  root: {
    borderRadius: theme.shape.borderRadius,
    cursor: 'move'
  },
  titleBar: {
    background:
     'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
     'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)'
  },
  image: {
    maxWidth: 270,
    maxHeight: 180
  }
})

const recommendationSource = {
  beginDrag (props) {
    return props.data
  }
}

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
})

class Recommendation extends React.Component {
  render () {
    const { classes, data } = this.props
    const { connectDragSource, isDragging } = this.props
    return (
      <GridListTile
        className={classes.root}
        style={{ opacity: isDragging ? 0.1 : 1 }}
        ref={instance => connectDragSource(findDOMNode(instance))}>
        <img src={data.image} alt={data.title} className={classes.image} />
        <GridListTileBar
          title={data.title}
          titlePosition='top'
          subtitle={<span>{data.address}</span>}
          actionIcon={
            <IconButton className={classes.icon}>
              <InfoIcon />
            </IconButton>
          }
          actionPosition='left'
          className={classes.titleBar}
        />
      </GridListTile>
    )
  }
}

export default DragSource('recommendation', recommendationSource, collect)(withStyles(styles)(Recommendation))
