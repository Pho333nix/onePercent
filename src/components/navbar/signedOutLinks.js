import { Component } from 'react';
import { connect } from 'react-redux';
import React from 'react';
import { NavLink } from 'react-router-dom'
import M from  'materialize-css/dist/js/materialize.min.js';

class SignedOutLinks extends Component{

  componentDidMount(){
    let sidenav = document.querySelector('#mobile-links');
    M.Sidenav.init(sidenav, {});
  }
render(){
return(  <div>
   <div className='container'>
     <a href="#" className='brand-logo '>One percent</a>
     <a href="#" className='sidenav-trigger right' data-target='mobile-links'>
        <i className="material-icons">menu</i>
     </a>
    <ul className='right hide-on-med-and-down'>
      <li><a href="#">Home</a></li>
      <li><a href="#">contact</a></li>
        <li><NavLink to='/signup'>Signup</NavLink></li>
        <li><NavLink to='/signin'>Login</NavLink></li>
      <li><a href="#" className='btn-floating deep-purple darken-4 z-depth-0'>
        <i class="large material-icons">account_circle</i>
      </a></li> {/* TODO: user/login make sure it is an icon when logged in
        but ehn not it should just say 'Login'  */}
        <li><a href="#" className='btn-floating deep-purple darken-4 z-depth-0'>
          <i class="large material-icons">notifications</i>
        </a></li>
      <li><span className={'badge white-text pink new'}>5</span></li>
    </ul>
   </div>
  <ul className='sidenav white' id='mobile-links'>
    <li><a href="#">Home</a></li>
    <li><a href="#">contact</a></li>
    <li><NavLink to='/signup'>Signup</NavLink></li>
    <li><NavLink to='/signin'>Login</NavLink></li>
    <li><a href="#" className='btn-floating white z-depth-0'>
      <i class="large material-icons">account_circle</i>
    </a></li> {/* TODO: user/login make sure it is an icon when logged in
      but ehn not it should just say 'Login' in the mobile view aswell. fix css  */}
      <li><a href="#" className='btn-floating white z-depth-0'>
        <i class="large material-icons">notifications</i>
      </a></li>
    <li><span className={'badge white-text pink new'}>5</span></li>
  </ul>
  </div>);
}
}
export default SignedOutLinks
