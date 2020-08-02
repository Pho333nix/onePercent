import React from 'react';
import ReactQuill from 'react-quill';
import debounce from '../helpers';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import {updateTitle} from '../../../redux/journal/journalActions'
import {updateBody} from '../../../redux/journal/journalActions'
import {loadNote} from '../../../redux/journal/journalActions'
import {noteUpdate} from '../../../redux/journal/journalActions'
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
   const {selectedNoteIndex, selectedNote} = this.props.journals;
    /*  this.setState({
        text: this.props.selectedNote.body,
        title: this.props.selectedNote.title,
        id: this.props.selectedNote.id
      });
      */
      console.log('compUpeditor', selectedNote.title, selectedNote.body, selectedNote.id )
      this.props.loadNote(selectedNote.title, selectedNote.body, selectedNote.id)
  }

  componentDidUpdate = () =>{
     const {id, selectedNote} = this.props.journals;
  /*  if(this.props.selectedNote.id !== this.state.id){
      this.setState({
        text: this.props.selectedNote.body,
        title: this.props.selectedNote.title,
        id: this.props.selectedNote.id
      });
    }
    */
    if(selectedNote.id !== id){
      this.props.loadNote(selectedNote.title, selectedNote.body, selectedNote.id)
    }

  }

  updateBody = async(val) =>{
    await this.props.updateBody(val)
    console.log('updateBody', val)
   //this.update();
  };

  update =  debounce(async()=>{
    const { title, body, id } = this.props.journals;
    console.log('deb', title, id, body)
    await this.props.noteUpdate(id, {
      title: title,
      body: body
    })
  }, 1500);

  updateTitle = async (title) =>{
    await this.props.journals.updateTitle(title);
  this.update();
  }

  render(){
    const { title, body, id } = this.props.journals;
    return(
      <div className=' deep-purple lighten-5 z-depth-3'>
        <input className=''
          placeholder='Note title ...'
          value={title ? title : ''}
          onChange={(e)=> this.updateTitle(e.target.value)}></input>
            <ReactQuill
            value={body} onChange={this.updateBody}/>
      </div>);
  }
    logChange = ()=>{console.log('change')}

}
const mapStateToProps =(state)=>{
  return{
    journals: state.journal,
  }
}
const mapDispatchToProps = dispatch =>{
  return{
    updateTitle: (title) => dispatch(updateTitle(title)),
    updateBody: (body) => dispatch(updateBody(body)),
    loadNote: (title, body, id) => dispatch(loadNote(title, body, id)),
    noteUpdate: (id, obj) => dispatch(noteUpdate(id, obj))
  }
}
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(()=>[
    {collection: 'notes'}
  ])
)(EditorComponent);
