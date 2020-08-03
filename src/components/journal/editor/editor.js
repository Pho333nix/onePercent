import React from 'react';
import ReactQuill from 'react-quill';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import {updateTitle} from '../../../redux/journal/journalActions'
import {updateBody} from '../../../redux/journal/journalActions'
import {loadNote} from '../../../redux/journal/journalActions'
import {noteUpdate} from '../../../redux/journal/journalActions'
import {debounce} from 'lodash';
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
      this.setState({
        text: selectedNote.body,
        title: selectedNote.title,
        id: selectedNote.id
      });

      // console.log('compUpeditor', selectedNote.title, selectedNote.body, selectedNote.id )
       this.props.loadNote(selectedNote.title, selectedNote.body, selectedNote.id)
  }

 componentDidUpdate = () =>{
     const {id, selectedNote} = this.props.journals;
/*   if(selectedNote.id !== this.state.id){
      this.setState({
        text: selectedNote.body,
        title: selectedNote.title,
        id: selectedNote.id
      });
    }
    */

    if(selectedNote.id !== this.state.id){
      this.setState({
        text: selectedNote.body,
        title: selectedNote.title,
        id: selectedNote.id
      });
 this.props.loadNote(selectedNote.title, selectedNote.body, selectedNote.id)
 }
}



  updateBody = async(val) =>{
    //  await this.setState({ text: val });
    //await this.props.updateBody(val)
    console.log('updateBody', val)
   this.update(val);
  };

  update =  debounce(async (val)=>{
  //  const { title, body, id } = this.props.journals;
  //  console.log('deb', title, id, body)
  await this.setState({ text: val });
     this.props.noteUpdate(this.state.id, {
      title: this.state.title,
      body: this.state.text
    })
  }, 2500);

  updateTitle = async (title) =>{
    await this.props.journals.updateTitle(title);
  this.update();
  }
/*  quillBody = async (val) =>{
    await this.setState({text: val})
    console.log('quillbod', val)
    this.updateQuill()
  }
  updateQuill = debounce(() => {
    console.log('quill update', this.state.text)
}, 1500);
*/

  render(){
    const { title, body, id } = this.props.journals;
    console.log('render', title, body, id)
    console.log('render state,', this.props.journals)
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
    journals: state.journal
  //  firestore: state.firestore.ordered.notes
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
