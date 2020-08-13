import { Component } from 'react';
import { connect } from 'react-redux';
import {signOut} from'../../redux/auth/authActions'
import {NavLink} from 'react-router-dom'
import React from 'react';
import TodoApp from '../todo/TodoApp'
import M from  'materialize-css/dist/js/materialize.min.js';

class SignedInLinks extends Component{
  componentDidMount(){
    let sidenav = document.querySelector('#mobile-links');
    M.Sidenav.init(sidenav, {});
    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Collapsible.init(elems, {});
  }
  handleSignOut=()=>{
    this.props.signOut();
  }
render(){

return(  <div>
   <div className='container left'>
     <a href="#" className='brand-logo '>One percent</a>
     <a href="#" className='sidenav-trigger right' data-target='mobile-links'>
        <i className="material-icons">menu</i>
     </a>
    <ul className='right hide-on-med-and-down'>
      <li><a href="#">Home</a></li>
      <li><NavLink to='/Journal'>Journal</NavLink></li>
      <li><a href="#">Dash Board</a></li>
      <li><a onClick={this.handleSignOut}>Log Out</a></li>
      <li><a href="#" className='btn-floating deep-purple darken-4 z-depth-0'>
        <i className="large material-icons">account_circle</i>
      </a></li> {/* TODO: user/login make sure it is an icon when logged in
        but ehn not it should just say 'Login'  */}
        <li><a href="#" className='btn-floating deep-purple darken-4 z-depth-0'>
          <i className="large material-icons">notifications</i>
        </a></li>
      <li><span className={'badge white-text pink new'}>5</span></li>
    </ul>

   </div>



  <ul className='sidenav white' id='mobile-links'>
    <li><a href="#">Home</a></li>
    <li><NavLink to='/Journal'>Journal</NavLink></li>
    <li><a href="#">Dash Board</a></li>
    <li><a href="#">contact</a></li>
    <li><a onClick={this.handleSignOut}>Log Out</a></li>
    <li><a href="#" className='btn-floating white z-depth-0'>
      <i className="large material-icons">account_circle</i>
    </a></li> {/* TODO: user/login make sure it is an icon when logged in
      but ehn not it should just say 'Login' in the mobile view aswell. fix css  */}
      <li><a href="#" className='btn-floating white z-depth-0'>
        <i className="large material-icons">notifications</i>
      </a></li>
    <li><span className={'badge white-text pink new'}>5</span></li>
  </ul>
  </div>);
}
}
const mapDispatchToProps = (dispatch) =>{
  return{
    signOut: ()=> dispatch(signOut())
  }
}
export default connect(null, mapDispatchToProps)(SignedInLinks);
