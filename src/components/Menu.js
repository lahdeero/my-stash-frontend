import React from 'react'
import { connect } from 'react-redux'
import { Navbar,NavItem,Icon } from 'react-materialize'
import { IndexLinkContainer } from 'react-router-bootstrap'
import { Redirect } from 'react-router-dom'

import {logoutAction} from '../reducers/userReducer'
import Filter from './Filter'

class Menu extends React.Component { 
	constructor(props) {
		super(props)
		this.state = {
			currentPage: 1,
			handleSelect: props.handleSelect,
			redirect: false
		}
	}

	logout = async (event) => {
		await event.preventDefault()
		await window.localStorage.removeItem('loggedMystashappUser')
		await this.props.logoutAction()
		// await this.setState({
		// 	redirect: true
		// })
	}

	render() {
		if (this.state.redirect) {
			return <div><Redirect to='/login' /></div>
		}

		return(
			<div>
			<Navbar className="indigo" brand='my-stash' right>
				<IndexLinkContainer to='/create'>
					<NavItem eventkey={2}><Icon>note_add</Icon></NavItem>
				</IndexLinkContainer>
				<IndexLinkContainer to='/about'>
					<NavItem eventkey={3}><Icon>settings</Icon></NavItem> 
				</IndexLinkContainer>
				<IndexLinkContainer to='/logout'>
					<NavItem onClick={this.logout}><Icon>logout</Icon></NavItem> 
				</IndexLinkContainer>
			</Navbar>
			<Filter handleChange={this.props.handleChange} />
			</div>
		)
	}
} 

const mapStateToProps = (store) => {
	return {
		user: store.user
	}
}
const mapDispatchToProps = {
	logoutAction
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Menu)
