import React from 'react'
import shortid from 'shortid'

import GridList from '@material-ui/core/GridList'
import { withStyles } from '@material-ui/core/styles'

import Recommendation from './Recommendation'
import RecommendationsActions from './RecommendationsActions'
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
    this.state = {
      loading: true,
      recommendations: []
    }
    RecommendationsActions.startLoad()
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
    const { recommendations, loading } = RecommendationsStore.getState()
    const { preferences } = PreferencesStore.getState()
    this.setState({ recommendations, loading, preferences })
  }

  filterRecommendations () {
    const { preferences, recommendations } = this.state
    if (!preferences) return RecommendationsStore.getState().recommendations
    console.log(recommendations);
    return recommendations.filter(rec => preferences[rec.category])//[rec.subcategory])
  }



  render () {
    const { classes } = this.props
    const { loading } = this.state

    return loading
    ? <h5>Loading...</h5>
    : <div className={classes.root}>
        <GridList
          cols={1}
          cellHeight={359}
          className={classes.gridList}
          spacing={10}>
          {this.filterRecommendations().map((venue) => {
            const short = shortid.generate()
            venue.id = short
            return <Recommendation data={venue} key={short} />
          })
        }
        </GridList>
      </div>
  }
}

export default withStyles(styles)(Recommendations)
