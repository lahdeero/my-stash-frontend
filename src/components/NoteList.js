import React from 'react'
import { connect } from 'react-redux'
import { Pagination } from 'react-materialize'

import Note from './Note'

class NoteList extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			page: 1,
			notesPerPage: 10
		}
	}

	handleSelect = async (selectedKey) => {
		if (selectedKey !== undefined || selectedKey !== null) {
			return this.setState({ page: selectedKey })
		}
		return this.setState({  })
	}

	render() {
		let key = 1
		const filter = this.props.filter
		const start = (this.state.page-1)*this.state.notesPerPage
		const end = start+this.state.notesPerPage

		let notesToShow = this.props.notes.slice(start, end)
		if (filter) {
			notesToShow = this.props.notes.filter(note => note.otsikko.toLowerCase().includes(filter.toLowerCase())).slice(0,10)
		}
		return (
			<div className="container">
					<div className="center">
						<Pagination items={Math.ceil(this.props.notes.length/this.state.notesPerPage)} activePage={this.state.page} maxButtons={10} onSelect={this.handleSelect} />
					</div>
					<ul>
						{notesToShow.map(note => <li key={key++}>
						<div>
							<Note note={note} Link={this.props.Link} Key={key}/>
							</div></li>
						)}
					</ul>
					<div className="center">
						<Pagination items={Math.ceil(this.props.notes.length/this.state.notesPerPage)} activePage={this.state.page} maxButtons={10} onSelect={this.handleSelect} />
					</div>
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


const ConnectedNoteList = connect(
	mapStateToProps
)(NoteList)

export default ConnectedNoteList
