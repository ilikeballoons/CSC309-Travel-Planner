import React from 'react'
import shortid from 'shortid'

import GridList from '@material-ui/core/GridList'
import { withStyles } from '@material-ui/core/styles'

import { recommendations } from '../../../Fixtures'
import Recommendation from './Recommendation'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflowY: 'scroll',
    overflowX: 'hidden',
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    maxHeight: 835,
  },
  gridList: {
    width: 450,
    //height: 450,
    transform: 'translateZ(0)',
    overflow: 'auto',
    backgroundColor: '#E3F2FD',
  }
})

class Recommendations extends React.Component {
  render () {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <GridList
          cols={1}
          cellHeight={359}
          className={classes.gridList}
          spacing={10}>
          {recommendations.map(rec => (<Recommendation data={rec} key={shortid.generate()} />))}
        </GridList>
      </div>
    )
  }
}

export default withStyles(styles)(Recommendations)
