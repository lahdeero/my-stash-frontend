import React from 'react'
import { connect } from 'react-redux'
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import { Input } from 'react-materialize'

import { modifyNote } from '../reducers/noteReducer'
import noteService from '../services/Notes.js'
import { notify, errormessage } from '../reducers/notificationReducer'

class ShowNote extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			isMounted: false,
			redirect: false,
			tagText: '',
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
				tags: oneNoteArr[0].tagit.filter(tag => tag !== null)
			})
		} catch (eception) {
			  this.props.errormessage(`Couldn't find note '${this.props.noteId}'`, 5)
				this.setState({
					redirect: true
				})
		}
	}
	async componentDidMount(): Promise<void> {
		this.setState({ isMounted: true })
	}
	async componentWillUnmount(): Promise<void> {
		this.setState({ isMounted: false })
	}

	handleSubmit = async (event) => {
		event.preventDefault()
		try {
			const noteObject = await {
				id: this.state.id,
				otsikko: this.state.title,
				sisalto: this.state.content,
				tagit: this.state.tags
			}
			await this.props.modifyNote(noteObject)
			await this.props.notify(`you modified '${noteObject.otsikko}'`, 10)
			//cant set id to empty 'cos of redirect
			this.setState({
				title: '',
				content: '',
				tags: []
			})
			await this.setState({ redirect: true })
		} catch(exception) {
			console.log(exception)
			this.props.errormessage('ERROR WHILE EDITING NOTE', 10)
		}
	}
	handleChange = (event) => {
		if(!this.state.isMounted) return
  	// console.log(event.target.name, event.target.value)
  	this.setState({ [event.target.name]: event.target.value })
  }
	handleContent = (event) => {
		this.setState({ content: event.target.value })
	}

	addTag = async (event) => {
		event.preventDefault()
		const maxTags = await 4
		if (this.state.tagText.length === 0 || this.state.tags.includes(this.state.tagText)) return
		let newTags = await this.state.tags
		await newTags.push(this.state.tagText)
		if (newTags.length > maxTags) {
			this.props.notify(`Maxium number of tags is '${maxTags}'`, 10)
		} else {
			try {
				await this.setState({
					tags: newTags,
					tagText: ''
				})
			} catch(exception) {
				this.props.errormessage('ERROR WHILE ADDING TAG', 10)
			}
		}
	}

	removeTag (name) {
		this.setState({
			tags: this.state.tags.filter(tag => tag !== name)
		})
	}

	render() {
		if (this.state.redirect) {
			const redirecturl = '/' //'notes/' + this.state.id
			return <div><Redirect to={redirecturl} /></div>
		}

		const tooltip = (
			<Tooltip id="tooltip">
				<strong>You have to EDIT NOTE(bottom of page) to save changes!</strong>
			</Tooltip>
		)
		const tagTooltip = (
			<Tooltip id="tooltip">
				<strong>Click to remove tag</strong>
			</Tooltip>
		)

		return(
    	<div>
				<div>
					<h3>Note tags&nbsp;
					<OverlayTrigger placement="top" overlay={tooltip}>
						<Button bsStyle="info">[?]</Button>
					</OverlayTrigger></h3>
				</div>
				<div>
					{this.state.tags.map(tag =>
						<OverlayTrigger key={tag} placement="top" overlay={tagTooltip}>
							<Button key={tag} onClick={() => { this.removeTag(tag) }}> {tag} </Button>
						</OverlayTrigger>
					)}
				</div>
				<div>
					<form id="tagform" onSubmit={this.addTag}>
						<div>
								<br />
								<input name='tagText' value={this.state.tagText} onChange={this.handleChange}/>
						</div>
						<br />
						<Button bsStyle="primary" type="submit" form="tagform">Add tag</Button> 
					</form>
				</div>
			 	<h2>Edit note</h2>
       	<form onSubmit={this.handleSubmit}>
       		<div>
           	Title<br />
           	<input name='title' value={this.state.title} onChange={this.handleChange} />
         	</div>
         	<div>
          	<label>
	 				 		Content<br />
							<Input type='textarea' value={this.state.content} onChange={this.handleContent} rows='20' cols='60'/>
       			</label>
         	</div>
	 				<br/>
         	<Button bsStyle="warning" type="submit">Edit Note</Button>
       </form>
     </div>  
   )
 }
}

const mapDispatchToProps = {
	modifyNote,
	notify,
	errormessage
}

const ConnectedEditNote = connect(
	null,
	mapDispatchToProps
)(ShowNote)

export default ConnectedEditNote
