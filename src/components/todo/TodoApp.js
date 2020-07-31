import React from "react";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import VisibilityFilters from './visibilityFilters';

export default function TodoApp() {
	  return (
		      <div className='right yellow z-depth-3'>
			            <h5 className="center">Todo List</h5>
			            <AddTodo />
			            <TodoList />
			            <VisibilityFilters />
			          </div>
		    );
}
