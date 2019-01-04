import React from 'react'

/* Handlechange in App */
class Filter extends React.Component {
  render () {
    const style = {
      marginBottom: 10
    }

    return (
      <div style={style}>
         <input onChange={this.props.handleChange} />
      </div>
    )
  }
}

export default Filter

