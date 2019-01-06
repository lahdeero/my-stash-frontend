import React from 'react'

const ListNote = ({ note, Link, key }) => {
	if (note === undefined || note.id === undefined) return ( <div></div> )
	let tags = note.tags
	if (tags === undefined) tags = ['EI TAGIA', 'HUOM']
	const text = note.content

	let css = "card-panel deep-purple lighten-4"

	return(
		<div className={css}>
			<h2><Link to={`/notes/${note.id}`}>{note.title}</Link> | {tags.join(', ')} |</h2> 
			<div>
				{text.split('\n').map(function(row, key) {
				  return (
				    <span key={key}>
				      {row}
				      <br/>
				    </span>
				  )
				})}
			</div>
		</div>
	)
}
export default ListNote
