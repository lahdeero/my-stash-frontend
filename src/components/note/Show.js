import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-materialize'
import { Redirect, Link } from 'react-router-dom'

import noteService from '../../services/Note.js'
import { removeNote } from '../../reducers/note'
import { notify, errormessage } from '../../reducers/notification'

class Show extends React.Component {
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

	async componentWillMount() {
		try {
			const oneNoteArr = await noteService.getOne(this.props.noteId)
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
				<div>
					<Link to={editaddress}>
						<Button>EDIT</Button>&nbsp;
					</Link>
					<Button onClick={this.deleteNote} >DELETE</Button>
				</div>
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
)(Show)

export default ConnectedShowNote