import React, { Component } from 'react';
import { connect } from 'react-redux'
import { loginAction } from '../reducers/userReducer'

class Login extends Component {
	constructor() {
		super()
		this.state = {
			username: '',
			password: '',
			user: null,
			error: null
		}
	}
	handleLogin = async (event) => {
		event.preventDefault()
		try {
			const user = await this.props.loginAction({
				username: this.state.username,
				password: this.state.password
			})
			await window.localStorage.setItem('loggedMystashappUser', JSON.stringify(user))
			// await this.setState({ username: '', password: '', user })
		} catch(exception) {
			this.setState({
				error: 'Bad credentials'
			})
			setTimeout(() => {
				this.setState({ error: null })
			}, 5000)
		}
	}
	handleLoginFieldChange = (event) => {
		this.setState({ [event.target.name]: event.target.value })
	} 

	render() {
		return (
			<div>
				<div>
					{this.state.error}
				</div>
				<form onSubmit={this.handleLogin}>
  				<div>
  				  username: 
  				  <input
  				    type="text"
  				    name="username"
  				    value={this.state.username}
  				    onChange={this.handleLoginFieldChange}
  				  />
  				</div>
  				<div>
  				  password: 
  				  <input
  				    type="password"
  				    name="password"
  				    value={this.state.password}
  				    onChange={this.handleLoginFieldChange}
  				  />
  				</div>
  				<button type="submit">kirjaudu</button>
				</form>
			</div>
		)
	}
}

const mapDispatchToProps = {
	loginAction
}

const ConnectedLogin = connect(
	null,
	mapDispatchToProps
)(Login)

export default ConnectedLogin