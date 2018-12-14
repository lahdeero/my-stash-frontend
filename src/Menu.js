import React from 'react'

const Menu = ({ currentPage, handleSelect }) => {
	if (currentPage === undefined || currentPage === '' || currentPage === 0) 
		currentPage = 1 
	return(
		<Navbar brand='logo' right>
			<IndexLinkContainer to='/'>
		  	<NavItem href='get-started.html'><Icon>search</Icon></NavItem>
			</IndexLinkContainer>
			<IndexLinkContainer to='/'>
		  	<NavItem href='get-started.html'><Icon>view_module</Icon></NavItem>
			</IndexLinkContainer>
			<IndexLinkContainer to='/'>
		  	<NavItem href='get-started.html'><Icon>refresh</Icon></NavItem>
			</IndexLinkContainer>
			<IndexLinkContainer to='/'>
		  	<NavItem href='get-started.html'><Icon>more_vert</Icon></NavItem>
			</IndexLinkContainer>
		</Navbar>
	)
} 

export default Menu
