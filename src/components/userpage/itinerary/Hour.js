import React from 'react'
import { DropTarget } from 'react-dnd'
import { withStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography'

const hourTarget = {
  drop (props) {
    console.log(props)
    // dispatch an action here
  }
}

const styles = theme => ({
  isOver: {
    backgroundColor: theme.palette.primary.light
  }
})

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver()
})

class Hour extends React.Component {
  render () {
    const { time, connectDropTarget, isOver, classes } = this.props
    const getHourString = (time) => {
      if (time.length === 1) return `0${time}:00`
      return `${time}:00`
    }
    return connectDropTarget(
      <div className={isOver ? classes.isOver : undefined}>
        <ListItem key={`${time}`}>
          <Typography variant='h4' gutterBottom>{getHourString(time)}</Typography>
        </ListItem>
      </div>
    )
  }
}

export default DropTarget('recommendation', hourTarget, collect)(withStyles(styles)(Hour))
