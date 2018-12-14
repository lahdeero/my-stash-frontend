import React from 'react'
import { Navbar,NavItem,Icon } from 'react-materialize'
import { IndexLinkContainer } from 'react-router-bootstrap'

import Filter from './Filter'

class Menu extends React.Component { 
	constructor(props) {
		super(props)
		this.state = {
			currentPage: 1,
			handleSelect: props.handleSelect
		}
	}
	render() {
		return(
			<div>
			<Navbar className="indigo" brand='mystash' right>
				<IndexLinkContainer to='/create'>
					<NavItem eventkey={2}><Icon>note_add</Icon></NavItem>
				</IndexLinkContainer>
				<IndexLinkContainer to='/about'>
						<NavItem eventkey={3}><Icon>settings</Icon></NavItem> 
				</IndexLinkContainer>
			</Navbar>
			<Filter />
		</div>
		)
	}
} 

export default Menu
