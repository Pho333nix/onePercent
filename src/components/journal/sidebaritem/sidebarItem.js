import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import { removeHTMLTags } from '../helpers';


class SidebarItemComponent extends React.Component{

  selectNote =(n, i)=> this.props.selectNote(n,i);
  deleteNote = (note) =>{
    if(window.confirm(`Are you sure you want to delete ${note.title} ? `)){
      this.props.deleteNote(note);
    }
  }

  render(){
    const {_index, _note, selectedNoteIndex}= this.props;
    return(<div key={_index} onClick={() => this.selectNote(_note, _index)}>
     <li className={selectedNoteIndex === _index ? "collection-item active" :  "collection-item "}>
          <i className="material-icons purple-text ">book</i>
          <span className="title">{_note.title}</span>
            <a href="#" className="secondary-content ">
              <i className="material-icons deep-purple-text right" onClick={() => this.deleteNote(_note)} >delete</i>
            </a>
          <p className="grey-text">{removeHTMLTags(_note.body.substring(0, 30)) + '...'}</p>
     </li>
      </div>);
  }

}

export default SidebarItemComponent;
