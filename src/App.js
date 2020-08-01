import React from 'react';

import TodoApp from "./components/todo/TodoApp";
import SignIn from './components/auth/signIn';
import SignUp from './components/auth/signUp';
import SideBarComponent from './components/journal/sidebar/sidebar';
import Journal from './components/journal/journalApp';
import Navbar from './components/journal/navbar/navbar';
import {BrowserRouter} from 'react-router-dom'

import './App.css'
function App() {
    return (
      <BrowserRouter>
	        <div className=" deep-purple darken-1 App">
            <Navbar/>
            <SignUp/>
            <SignIn/>
	       </div>
      </BrowserRouter>

	      );
}

export default App;
// <TodoApp/>
//<Journal/>
