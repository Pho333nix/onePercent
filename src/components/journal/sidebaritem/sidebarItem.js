import React from 'react';
import {connect} from 'react-redux'
import { removeHTMLTags } from '../helpers';
import {selectNote} from '../../../redux/journal/journalActions'


class SidebarItemComponent extends React.Component{

  handleSelectNote =(id, n)=> this.props.selectNote(id, n);
  deleteNote = (note) =>{
    if(window.confirm(`Are you sure you want to delete ${note.title} ? `)){
      this.props.deleteNote(note);
    }
  }


  render(){
    const {id, note, selectedNoteIndex}= this.props;
    console.log('sidebarItemRender', note)

    return(<div key={id} onClick={() => this.handleSelectNote(id, note)}>
     <li className={selectedNoteIndex === id ? "collection-item active" :  "collection-item "}>
        {console.log(selectedNoteIndex)}
          <i className="material-icons purple-text ">book</i>
          <span className="title">{note.title}</span>
            <a href="#" className="secondary-content ">
              <i className="material-icons deep-purple-text right" onClick={() => this.deleteNote(note)} >delete</i>
            </a>
          <p className="grey-text">{removeHTMLTags(note.body.substring(0, 30)) + '...'}</p>
     </li>
      </div>);
  }

}
/*
const mapStateToProps = (state) =>{
  return{
    id: state.firestore.data.notes.id,

  }
} */
const mapDispatchToProps = (dispatch) =>{
  return{
    selectNote: (id, n) => dispatch(selectNote(id, n))
  }
}



export default connect(null,mapDispatchToProps)(SidebarItemComponent)
