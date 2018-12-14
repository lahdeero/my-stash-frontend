import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import './App.css'
import Menu from './components/Menu'
import NoteList from './components/NoteList'
import ShowNote from './components/ShowNote'
import EditNote from './components/EditNote'
import NoteForm from './components/NoteForm'
import About from './components/About'
import Notification from './components/Notification'
import {noteInitialization} from './reducers/noteReducer'

class App extends Component {
	static propTypes = {
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
			document.title = 'mystash'
		}
  }

	componentWillUnmount() {
		this.setState({
			isMounted: false
		})
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
						<Menu currentPage={this.state.navigation} handleSelect={this.handleSelect} />
            <Route exact path="/" render={() => <NoteList Link={Link} Route={Route}/>} />
		 				<Route path="/create" render={() => <NoteForm />} />
		 				<Route path="/about" render={() => <About />} />
		 				<br />
			 			<Route exact path="/notes/:id" render={({match}) => 
								<ShowNote noteId={match.params.id} Redirect={Redirect} />
			 			}/>
		 				<Route exact path="/notes/edit/:id" render={({match}) => 
								<EditNote noteId={match.params.id} Redirect={Redirect} />
			 			}/>
		 		</div>
		 	</Router>
		 </div>
    )
  }
}


export default connect( 
	null, {noteInitialization}
)(App)
