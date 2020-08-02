import React, { Component } from 'react'
import {connect} from 'react-redux';
import {signIn} from '../../redux/auth/authActions'
//TODO: add functionality, hook sign in page with firebase

class SignIn extends Component{

  state = {
    email: '',
    password: ''
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault(); // prevents default of pressing submit (loading/refreshing page)
  this.props.signIn(this.state)
  }
  render () {
    const {authError} = this.props;
    return (
      <div className="container">
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Log In</h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id='email' onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" id='password' onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Login</button>
            {authError ? <p>{authError}</p> : null}
        </div>
        </form>
      </div>
    )
  }
}
const mapStateToProps = (state) =>{
  return{
    authError: state.auth.authError
  }
}
const mapDispatchToProps = dispatch =>{
  return{
    signIn: (data) => dispatch(signIn(data))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(SignIn)
