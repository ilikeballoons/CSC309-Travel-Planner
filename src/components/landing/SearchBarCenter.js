import React from 'react'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import IntegrationReactSelect from './IntegrationReactSelect'

const styles = theme => ({
  root : {
    width: '100%',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  input: {
    width: '100%',
    margin: theme.spacing.unit,
  }
});

class Inputs extends React.Component {
    
    handleSubmit = event => {
        // if ((event.keyCode && event.keyCode === 13) || event.type === 'click') {
        //     LandingActions.searchbarSearch(this.state.searchQuery)
        // }
        // TODO: redirect to the user page
        console.log("search button clicked")
    }

    render () {
        const { classes } = this.props
        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <TextField
                        id="date"
                        label="Date of Trip"
                        type="date"
                        defaultValue="2018-03-01"
                        className={classes.textField}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                </div>
                <div className={classes.container}>
                        <IntegrationReactSelect />
                </div>
                <div className={classes.container}>
                    <Button variant="contained" color="primary" className={classes.button} onClick={(e) => this.handleSubmit(e)}>
                        Search
                    </Button>
                </div>
            </div>
        )
}
}

export default withStyles(styles)(Inputs);