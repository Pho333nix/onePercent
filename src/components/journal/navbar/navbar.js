import { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React from 'react';
import M from  'materialize-css/dist/js/materialize.min.js';
import SignedInLinks from './signedInLinks';
import SignedOutLinks from './signedOutLinks';

class Navbar extends Component{
  componentDidMount(){
    let sidenav = document.querySelector('#mobile-links');
    M.Sidenav.init(sidenav, {});
  }
render(){
  const {auth} = this.props;
  const links = auth.uid ? <SignedInLinks/> : <SignedOutLinks/>
  return(
  <div className='navbar'>
  <nav className='nav-wrapper  deep-purple darken-4'>
    {links}
    </nav>

    </div>
  )
}
}

const mapStateToProps = state =>{
  return{
    auth: state.firebase.auth
  }
}
export default connect(mapStateToProps)(Navbar);
