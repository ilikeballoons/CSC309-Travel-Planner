import React from 'react'
import { ObjectID } from 'mongodb'
import { format } from 'date-fns'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import UserProfileActions from '../UserProfileActions'
import DeleteItineraryButton from './DeleteItineraryButton'
import RenameItineraryButton from './RenameItineraryButton'


const styles = theme => ({
  root: {
    display: 'flex',
    width: '75%',
    padding: 20
  },
  list: {
    display: 'flex',
    flexFlow: 'column wrap',
    maxHeight: 650,
    width: '100%',
    alignContent: 'baseline'
  },
  itemRoot: {
    display: 'flex',
    flexDirection: 'column',
    flex: '0 0 auto',
    width: '30%',
  },
  panel: {
    minWidth: '100%'
  },
  panel2: {
    width: '100%',
    display: 'flex',
  },
  grow: {
    flexGrow: 1
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  details: {
    display: 'flex',
    flexDirection: 'column'
  }
})

class ItinerariesDisplay extends React.Component {
  handleChange = panel => (event, expanded) => {
    UserProfileActions.expandPanel(panel)
  }

  getItineraryComponent = ({ name, events, date, location, _id }) => {
    const dateModified = format(ObjectID(_id).getTimestamp(), 'MMMM do y, h:mma')
    const { expanded, classes } = this.props
    return (
      <ListItem className={classes.itemRoot} key={_id}>
        <div className={classes.panel}>
          <ExpansionPanel>
            <ExpansionPanelSummary>
              <Typography className={classes.heading}>Name</Typography>
              <Typography className={classes.secondaryHeading}>{name}</Typography>
            </ExpansionPanelSummary>
          </ExpansionPanel>
          <ExpansionPanel expanded={expanded === `details_${_id}`} onChange={this.handleChange(`details_${_id}`)}>
             <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
               <Typography className={classes.heading}>Details</Typography>
             </ExpansionPanelSummary>
             <ExpansionPanelDetails className={classes.details}>
               <div className={classes.panel2}>
                 <Typography className={classes.heading}>Location</Typography>
                 <div className={classes.grow} />
                 <Typography className={classes.secondaryHeading}>{location}</Typography>
               </div>
               <div className={classes.panel2}>
                 <Typography className={classes.heading}>Number of Events</Typography>
                 <div className={classes.grow} />
                 <Typography className={classes.secondaryHeading}>{events.length}</Typography>
               </div>
               <div className={classes.panel2}>
                 <Typography className={classes.heading}>Created on:</Typography>
                 <div className={classes.grow} />
                 <Typography className={classes.secondaryHeading}>{dateModified}</Typography>
               </div>
             </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel expanded={expanded === `action_${_id}`} onChange={this.handleChange(`action_${_id}`)}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Actions</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div className={classes.buttonContainer}>
              <DeleteItineraryButton id={_id} />
              <RenameItineraryButton id={_id} />
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        </div>
      </ListItem>
    )
  }
  render () {
    const { classes, itineraries } = this.props
    return (
      <div className={classes.root}>
        <List className={classes.list}>
          {itineraries && itineraries.map((itinerary) => this.getItineraryComponent(itinerary))}
        </List>
      </div>
    )
  }
}

export default withStyles(styles)(ItinerariesDisplay)
