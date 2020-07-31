import React from 'react';
import { connect } from 'react-redux';
import { toggleTodo } from '../../redux/todo/todoAction';
import cx from 'classnames';

let check='\u2714';
let unchecked ='\u2610';
const Todo = ({ todo, toggleTodo})=>(
  <li className='todo-item' onClick={()=> toggleTodo(todo.id)}>
	  {todo && todo.completed ? check : unchecked }{ " " }
    <span
       className={cx(
         "todo-item__text",
         todo && todo.completed && "todo-item__text--completed"
       )}
     >
       {todo.content}
     </span>
  </li>
);

// export default Todo;
 export default connect(
   null,
     { toggleTodo }
     )(Todo);
