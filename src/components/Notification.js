import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Alert } from 'react-bootstrap'

class Notification extends React.Component {
  static propTypes = {
    notification: PropTypes.oneOfType([ PropTypes.string, PropTypes.array ])
		// notification: PropTypes.string.isRequired
		// notification: PropTypes.array.isRequired
  }
  render () {
    const notification = this.props.notification[0]
		if (notification === undefined || notification.length <= 1) 
			return (<div></div>)
    return (
      <div>
				<Alert bsStyle="info">
					<strong>{notification}</strong>
				</Alert>
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    notification: store.notification
  }
}

const ConnectedNotification = connect(
  mapStateToProps
)(Notification)

export default ConnectedNotification
