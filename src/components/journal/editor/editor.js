import React from 'react';
import ReactQuill from 'react-quill';
import debounce from '../helpers';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { withStyles } from '@material-ui/core/styles';
//import styles from './styles';

class EditorComponent extends React.Component{
  constructor(){
    super();
    this.state = {
     text: '',
     title: '',
     id: ''
   };
  }

  componentDidMount =() =>{
      this.setState({
        text: this.props.selectedNote.body,
        title: this.props.selectedNote.title,
        id: this.props.selectedNote.id
      });
  }

  componentDidUpdate = () =>{
    if(this.props.selectedNote.id !== this.state.id){
      this.setState({
        text: this.props.selectedNote.body,
        title: this.props.selectedNote.title,
        id: this.props.selectedNote.id
      });
    }
  }

  updateBody = async(val) =>{
    await this.setState({text: val});
    this.update();
  };

  update = debounce(()=>{
    this.props.noteUpdate(this.state.id, {
      title: this.state.title,
      body: this.state.text
    })
  }, 1500);

  updateTitle = async (title) =>{
    await this.setState({title: title});
    this.update();
  }

  render(){
    const { classes } = this.props;

    return(
      <div className=' deep-purple lighten-5 z-depth-3'>
        <input className=''
          placeholder='Note title ...'
          value={this.state.title ? this.state.title : ''}
          onChange={(e)=> this.updateTitle(e.target.value)}></input>
            <ReactQuill
            value={this.state.text} onChange={this.updateBody}/>
      </div>);
  }

}

export default EditorComponent;