import React from 'react'
import { findDOMNode } from 'react-dom' // to fix: https://github.com/react-dnd/react-dnd/issues/347
import { DragSource } from 'react-dnd'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import InfoIcon from '@material-ui/icons/Info'

const styles = theme => ({
  root: {
    borderRadius: theme.shape.borderRadius,
    cursor: 'move',
    width: 450,
    height: 359,
    marginBottom: 20
  },
  titleBar: {
    background:
     'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
     'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
  },
  icon: {
    color: 'rgba(0, 0, 0, 0.54)'
  },
  image: {
    width: 450,
    height: 200
  },
  ignoreButton: {
    size: 'small',
    marginRight: 25
  },
  columns: {
  	 display: 'flex',
    justifyContent: 'space-between'
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
      <Card 
        className={classes.root}
        style={{ opacity: isDragging ? 0.1 : 1 }}
        ref={instance => connectDragSource(findDOMNode(instance))}>
        <CardHeader
          action={
            <IconButton className={classes.icon}>
              <InfoIcon />
            </IconButton>
          }
          title={data.title}
          subheader={data.opens + "  -->  " + data.closes}
        />
        <CardMedia
          className={classes.image}
          image={data.image}
          title={data.title}
        />
        <div className={classes.columns}>
          <CardContent>
            {data.address} <br/>
            {data.price}
          </CardContent>
          <CardActions>
            <Button className={classes.ignoreButton}>IGNORE</Button>
          </CardActions>
        </div>
      </Card>
    )
  }
}

export default DragSource('recommendation', recommendationSource, collect)(withStyles(styles)(Recommendation))
