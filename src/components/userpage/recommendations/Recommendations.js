import React from 'react'
import shortid from 'shortid'

import GridList from '@material-ui/core/GridList'
import { withStyles } from '@material-ui/core/styles'

import { recommendations } from '../../../utils/Fixtures'
import Recommendation from './Recommendation'
import PreferencesStore from '../preferences/PreferencesStore'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflowY: 'scroll',
    overflowX: 'hidden',
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    maxHeight: 835
  },
  gridList: {
    width: 450,
    transform: 'translateZ(0)',
    overflow: 'auto',
    backgroundColor: '#E3F2FD'
  }
})

class Recommendations extends React.Component {
  constructor () {
    super()
    this.state = {}
  }

  componentDidMount () {
    PreferencesStore.on('change', this.updateState)
  }

  componentWillUnmount () {
    PreferencesStore.removeListener('change', this.updateState)
  }

  updateState = () => {
    const { preferences } = PreferencesStore.getState()
    this.setState({ preferences: preferences })
  }

  filterRecommendations () { // note: not really flux-y
    const { preferences } = this.state
    if (!preferences) return recommendations
    return recommendations.filter(rec => preferences[rec.category][rec.subcategory])
  }
  
  render () {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <GridList
          cols={1}
          cellHeight={359}
          className={classes.gridList}
          spacing={10}>
          {this.filterRecommendations().map(rec => (<Recommendation data={rec} key={shortid.generate()} />))}
        </GridList>
      </div>
    )
  }
}

export default withStyles(styles)(Recommendations)
