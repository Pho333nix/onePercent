import React from 'react';

import TodoApp from "./components/todo/TodoApp";
import SignIn from './components/auth/signIn';
import SignUp from './components/auth/signUp';
import SideBarComponent from './components/journal/sidebar/sidebar';
import Journal from './components/journal/journalApp';
import EditorComponent from './components/journal/editor/editor';
import Navbar from './components/navbar/navbar';
import {BrowserRouter, Switch, Route } from 'react-router-dom'

import './App.css'
function App() {
    return (
      <BrowserRouter>
	        <div className=" deep-purple darken-1 App">
            <Navbar/>
              <Switch>
                <Route path='/signin' component={SignIn} />
                <Route path='/signup' component={SignUp} />
                <Route path='/Journal' component={Journal} />
           </Switch>
	       </div>
      </BrowserRouter>

	      );
}

export default App;
//
//
/*
<SignUp/>
<SignIn/>
    //     <Route exact path='/'component={Home} />
<EditorComponent />
*/
