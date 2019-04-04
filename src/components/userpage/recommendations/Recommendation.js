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
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography'

import RecommendationActions from './RecommendationActions'
import RecommendationsStore from './RecommendationsStore'

const styles = theme => ({
  root: {
    borderRadius: theme.shape.borderRadius,
    cursor: 'move',
    width: 450,
    marginBottom: 20
  },
  titleBar: {
    background:
     'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
     'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
  },
  title: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    width: '90%'
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
    marginRight: 25,
    color: theme.palette.secondary.main
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

 constructor () {
    super()
    this.state = { expanded: false }
  }

  toggleInfo = () => this.setState(state => ({expanded: !state.expanded}))
  handleRemove = (() => {
    const { fetchedRecommendations } = RecommendationsStore.getState()
    RecommendationActions.removeRecommendation(this.props.data.title, fetchedRecommendations)
  })

  render () {
    const { classes, data } = this.props
    const { title, address, price, opens, closes, image, description, pluralName } = data
    const hours = opens === closes ? 'Business hours not found.' : `Open from ${opens} until ${closes}`
    const cost = price > 0 ? '$'.repeat(price) : 'Price not found.'

    const { connectDragSource, isDragging } = this.props
    return (
      <Card
        className={classes.root}
        style={{ opacity: isDragging ? 0.1 : 1 }}
        ref={instance => connectDragSource(findDOMNode(instance))}>
        <CardHeader
          titleTypographyProps={{
            className: classes.title
          }}
          action={
            <IconButton
              className={classes.icon}
              onClick={this.toggleInfo}
              >
              <InfoIcon />
            </IconButton>
          }
          title={title}
          subheader={hours}
        />
        <CardMedia
          className={classes.image}
          image={image}
          title={title}
        />
        <Collapse in={this.state.expanded} timeout='auto' unmountOnExit>
          <CardContent>
            <Typography variant="h5" component="h2">{pluralName}</Typography>
            <Typography paragraph><i>{description}</i></Typography>
          </CardContent>
        </Collapse>
        <div className={classes.columns}>
          <CardContent>
            {address} <br/>
            {cost}
          </CardContent>
          <CardActions>
            <Button
              className={classes.ignoreButton}
              onClick={this.handleRemove}>
              IGNORE
            </Button>
          </CardActions>
        </div>
      </Card>
    )
  }
}

const StyledRecommendation = withStyles(styles)(Recommendation)
export default DragSource('recommendation', recommendationSource, collect)(StyledRecommendation)
