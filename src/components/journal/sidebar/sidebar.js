import React from 'react';
import { createNewNote } from '../../../redux/journal/journalActions'
import { loadNotes } from '../../../redux/journal/journalActions'
import SidebarItemComponent from '../sidebaritem/sidebarItem';
import {connect} from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
class SideBarComponent extends React.Component{
  constructor(){
    super();
    this.state={
      addingNote: false,
      title: null,
      body: ''
    }
  }
  newNoteBtnClick = () =>{
    console.log('newNoteBtnClick')
    this.setState({title: null, addingNote: !this.state.addingNote})
  }
  updateTitle = (txt) =>{
    this.setState({title: txt})
  }
  newNote = () =>{
    //this.props.newNote(this.state.title);
    const note = {
      title: this.state.title,
      body:''
    };
    this.props.createNewNote(note)
    this.setState({title: null, addingNote: false})
  }

  deleteNote=(note)=>{
    this.props.deleteNote(note);
  }


  render(){
   const {notes} = this.props;
   console.log('sidebarRender', notes)
    if(notes){
      return(<div className=''>
          <button className='btn'
          onClick={this.newNoteBtnClick}>{this.state.addingNote ? 'cancel': 'New Note'}
        </button>
        <br/>
          {
            this.state.addingNote ?
            <div>
              <input type='text' className=''
              placeholder='Enter title'
              onKeyUp={(e)=> this.updateTitle(e.target.value)}
              />
              <button className= 'btn'
              onClick={this.newNote}>Submit Note</button>
            </div>: null
          }
          <div className=' z-depth-3'>
           <ul className="collection with-header deep-purple lighten-5">
             <li className='collection-header'><h4>Journal</h4></li>{
            notes.map((note)=>{

              return(
                  <div key={note.id}>
                    <SidebarItemComponent note={note} id={note.id}
                    />
                  </div>
              )
            })
          }</ul>
          </div>

        </div>);
    }else{
      console.log(this.notes);
      return(
        <div className=''>
        error in sidebar

        </div>);
    }
  }

}
const mapStateToProps = (state) =>{
  console.log(state);
  return{
    notes: state.firestore.ordered.notes || state.journal.notes
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    createNewNote: (note) => dispatch(createNewNote(note))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(()=>[
    {collection: 'notes'}
  ])
)(SideBarComponent);

/*
<SidebarItemComponent _note={_note} _index={_index}
selectedNoteIndex={selectedNoteIndex}
selectNote={this.selectNote}
deleteNote={this.deleteNote}/>
</div>

*/
