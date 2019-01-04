import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import './App.css'
import Menu from './components/Menu'
import List from './components/note/List'
import Show from './components/note/Show'
import Edit from './components/note/Edit'
import Form from './components/note/Form'
import About from './components/About'
import Notification from './components/Notification'
import {noteInitialization} from './reducers/note'
import { actionForFilter } from './reducers/filter'

class App extends Component {
	static propTypes = {
    	actionForFilter: PropTypes.func.isRequired,
		noteInitialization: PropTypes.func.isRequired
	}
	constructor() {
		super()
		this.state = {
			isMounted: false,
			navigation: 1
		}
	}

  componentDidMount() {
		if (!this.state.isMounted) {
			this.props.noteInitialization()
			this.setState({ 
				isMounted: true 
			})
			document.title = 'my-stash'
		}
  }

	componentWillUnmount() {
		this.setState({
			isMounted: false
		})
	}
	handleChange = (event) => {
    	event.preventDefault()
    	const filter = event.target.value
    	this.props.actionForFilter(filter)
	}

	handleSelect = (selectedKey) => () => {
		switch(selectedKey) {
			case 1:
				return this.setState({ navigation: 1 })
			case 2:
				return this.setState({ navigation: 2 })
			case 3:
				return this.setState({ navigation: 3 })
			default:
				return this.state
		}
	}

  render() {
   return (
      <div>
		<Notification />
        <Router>
        <div>
			<Menu currentPage={this.state.navigation} handleSelect={this.handleSelect} handleChange={this.handleChange} />
            <Route exact path="/" render={() => <List Link={Link} Route={Route}/>} />
				<Route path="/create" render={() => <Form />} />
				<Route path="/about" render={() => <About />} />
				<Route exact path="/notes/:id" component={Show} />
				<Route exact path="/notes/edit/:id" component={Edit} />
		</div>
		</Router>
	  </div>
    )
  }
}


const mapStateToProps = (store) => {
	return {
		notes: store.notes,
		filter: store.filter
	}
}
const mapDispatchToProps = {
	noteInitialization,
	actionForFilter
}
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App)
