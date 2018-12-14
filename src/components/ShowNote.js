import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-materialize'
import { Redirect, Link } from 'react-router-dom'

import noteService from '../services/Notes.js'
import { removeNote } from '../reducers/noteReducer'
import { notify, errormessage } from '../reducers/notificationReducer'

class ShowNote extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			redirect: false,
			id: '',
			title: '',
			content: '',
			tags: []
		}
	}

	async componentWillMount(): Promise<void> {
		const oneNoteArr = await noteService.getOne(this.props.noteId)
		try {
			await this.setState({
				id: oneNoteArr[0].id,
				title: oneNoteArr[0].otsikko,
				content: oneNoteArr[0].sisalto,
				tags: oneNoteArr[0].tagit
			})
		} catch (eception) {
			  this.props.errormessage(`Couldn't find note '${this.props.noteId}'`, 5)
				this.setState({
					redirect: true
				})
		}
	}

	deleteNote = async (event) => {
		event.preventDefault()
		const returned_id = await this.state.id
		const del_title = await this.state.title
		if (!window.confirm(`Are you sure you want to delete '${this.state.title}' ?`)) return
		else {
			await this.props.removeNote(returned_id)
			await this.props.notify(`you deleted '${del_title}'`, 10)
			await this.setState({ redirect: true })
		}
	}

	render() {
		if (this.state.redirect) {
			return (
				<div><Redirect to='/' /></div>
			)
		}
		const tags = this.state.tags.join()
		const text = this.state.content
		const editaddress = '/notes/edit/' + this.state.id

		return (
			<div>
				<h2>{this.state.title}</h2>
				<p>[{tags}]</p>
				<div>
					{text.split('\n').map(function(item, key) {
					  return (
					    <span key={key}>
					      {item}
					      <br/>
					    </span>
					  )
					})}
				</div>
				<Link to={editaddress}>
					<Button bsStyle="warning">EDIT</Button>&nbsp;
				</Link>
				<Button onClick={this.deleteNote} bsStyle="danger">DELETE</Button>
			</div>
		)
	}
}

const mapDispatchToProps = {
	removeNote,
	notify,
	errormessage
}

const ConnectedShowNote = connect(
	null,
	mapDispatchToProps
)(ShowNote)

export default ConnectedShowNote
