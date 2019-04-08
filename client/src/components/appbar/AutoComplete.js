import React from 'react'
import deburr from 'lodash/deburr'
import Autosuggest from 'react-autosuggest'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import { fade } from '@material-ui/core/styles/colorManipulator'
import SearchIcon from '@material-ui/icons/Search'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'
import { withStyles } from '@material-ui/core/styles'
import cities from 'cities.json'

import SearchAppBarActions from './SearchAppBarActions'
import AdminActions from '../admin/AdminActions'
import UserProfileActions from '../userpage/profile/UserProfileActions'

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  container: {
    position: 'relative'
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1201,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  },
  suggestion: {
    display: 'block'
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: '100%',
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
  },
  inputRoot: {
    color: 'inherit',
    width: '100%'
  },
  inputRootDisabled: {
    color: 'rgba(0, 0, 0, 0.38)'
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    width: '100%',
  },
  noPaddingInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: 0,
    width: '100%',
  }
})

const suggestions = cities.map((suggestion) => ({
      value: `${suggestion.name}, ${suggestion.country}`,
      label: `${suggestion.name}, ${suggestion.country}`
  })
)

const renderInputComponent = (inputProps) => {
  const { classes, value, handleSubmit, page, disabled, ...other } = inputProps;
  const noPadding = page === 'admin' || page === 'userProfile'
  return (
    <div className={classes.search}>
      {!noPadding &&
      <div className={classes.searchIcon}>
        <IconButton component={() => <SearchIcon />} />
      </div>}
      <InputBase
        fullWidth
        value={value}
        classes={{
          root: disabled ? classes.inputRootDisabled : classes.inputRoot,
          input: noPadding ? classes.noPaddingInput : classes.inputInput
        }}
        {...other}
      />
    </div>
  )
}

const renderSuggestion = (suggestion, { query, isHighlighted }) => {
  const matches = match(suggestion.label, query);
  const parts = parse(suggestion.label, matches);

  return (
  <MenuItem selected={isHighlighted} component='div'>
    <div>
      {parts.map((part, index) =>
        part.highlight ? (
          <span key={String(index)} style={{ fontWeight: 500 }}>
            {part.text}
          </span>
        ) : (
          <strong key={String(index)} style={{ fontWeight: 300 }}>
            {part.text}
          </strong>
        )
        )}
    </div>
  </MenuItem>
  )
}

const getSuggestions = (value) => {
  const inputValue = deburr(value.trim()).toLowerCase()
  const inputLength = inputValue.length
  let count = 0

  return inputLength === 0
  ? []
  : suggestions.filter(suggestion => {
      const keep = count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue
      keep && count++
      return keep
  })
}

const getSuggestionValue = (suggestion) => {
  return suggestion.label
}

class AutoComplete extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      suggestions: [],
      searchQuery: this.props.searchQuery || '',
    }
  }

  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    })
  }

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    })
  }

  onSuggestionSelected = (event, { suggestionValue }) => {
    this.setState({ searchQuery: suggestionValue })
    const { page } = this.props
    const landingOpen = (suggestionValue) => {
      SearchAppBarActions.searchbarChange(suggestionValue)
      SearchAppBarActions.signinDialogOpen(suggestionValue)
    }
    page === 'landing' && landingOpen(suggestionValue)
    page === 'admin' && AdminActions.editUserLocation(suggestionValue)
    page === 'userPage' && SearchAppBarActions.searchbarSearch(suggestionValue, this.props.travelDate)
    page === 'userProfile' && UserProfileActions.editLocation(suggestionValue)
  }

  shouldRenderSuggestions = (value) => value.trim().length > 2

  handleChange = event => {
    this.setState({ searchQuery: event.target.value })
  }

  render () {
    const { classes, page, disabled } = this.props
    const value = this.state.searchQuery
    const autosuggestProps = { // built in props for the autosuggest component
      renderInputComponent,
      suggestions: this.state.suggestions,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      onSuggestionSelected: this.onSuggestionSelected,
      shouldRenderSuggestions: this.shouldRenderSuggestions,
      focusInputOnSuggestionClick: false,
      getSuggestionValue,
      renderSuggestion
    }

    return (
      <div className={classes.root}>
        <Autosuggest
          {...autosuggestProps}
          inputProps={{
            classes,
            placeholder: 'Which city do you want to visit?',
            value,
            onChange: this.handleChange,
            page,
            disabled
          }}
          theme={{
            container: classes.container,
            suggestionsContainerOpen: classes.suggestionsContainerOpen,
            suggestionsList: classes.suggestionsList,
            suggestion: classes.suggestion,
          }}
          renderSuggestionsContainer={options => (
            <Paper {...options.containerProps} square>
              {options.children}
            </Paper>
          )}
        />
      </div>
    )
  }
}

export default withStyles(styles)(AutoComplete);
