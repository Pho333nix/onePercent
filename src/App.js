import React from 'react';

import TodoApp from "./components/todo/TodoApp";
import SignIn from './components/auth/signIn';
import SignUp from './components/auth/signUp';
import SideBarComponent from './components/journal/sidebar/sidebar';

import './App.css'
function App() {
    return (
	        <div className=" deep-purple darken-1 App">
          <SideBarComponent />

	       </div>
	      );
}

export default App;
// <TodoApp/>
