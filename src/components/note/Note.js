import React from 'react'

const Note = ({ note, Link, key }) => {
	if (note === undefined || note.id === undefined) return ( <div></div> )
	let tags = note.tags
	if (tags === undefined) tags = ['EI TAGIA', 'HUOM']
	const text = note.content

	let css = "card-panel deep-purple lighten-4"

	return(
		<div className={css}>
			<h2><Link to={`/notes/${note.id}`}>{note.title}</Link> | {tags.join(', ')} |</h2> 
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
		</div>
	)
}
export default Note
