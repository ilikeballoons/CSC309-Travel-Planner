import React from 'react'
import shortid from 'shortid'

import GridList from '@material-ui/core/GridList'
import { withStyles } from '@material-ui/core/styles'

import Recommendation from './Recommendation'
import RecommendationsStore from './RecommendationsStore'
import PreferencesStore from '../preferences/PreferencesStore'


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflowY: 'scroll',
    overflowX: 'hidden',
    borderRadius: theme.shape.borderRadius,
    maxHeight: 835,
    padding: '0 25px'
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
    RecommendationsStore.on('change', this.updateState)
  }

  componentWillUnmount () {
    PreferencesStore.removeListener('change', this.updateState)
    RecommendationsStore.removeListener('change', this.updateState)
  }

  updateState = () => {
    const { recommendations } = RecommendationsStore.getState()
    this.setState({ recommendations: recommendations })
  }

  filterRecommendations () { // note: not really flux-y
    const { preferences } = this.state
    if (!preferences) return RecommendationsStore.getState().recommendations
    return RecommendationsStore.getState().recommendations.filter(rec => (
      preferences[rec.category][rec.subcategory]
    ))
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
