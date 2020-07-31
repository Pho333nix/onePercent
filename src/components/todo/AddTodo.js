import React from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../../redux/todo/todoAction';

class AddTodo extends React.Component{
  constructor(props){
    super(props);
    this.state = { input: ''};
  }
  updateInput = input =>{
    this.setState({ input });
  };

  handleAddTodo = () =>{
    this.props.addTodo(this.state.input);
    this.setState({ input: '' });
  };

//if enter key is pressed item is added
  _handleKeyDown = (e) => {
   if (e.key === 'Enter') {
    this.handleAddTodo();
   }
 }

  render(){
    return(
	<div >

	  <input onChange={e => this.updateInput(e.target.value)}
		  value={this.state.input}
      onKeyDown={this._handleKeyDown}
	  /> <br/>
	 <button className='btn-floating right waves-effect waves-light red'
		 onClick={this.handleAddTodo} >
     <i className="large material-icons">add</i>
	 </button>
	</div>
    );
  }
}

export default connect(null, { addTodo })(AddTodo)
