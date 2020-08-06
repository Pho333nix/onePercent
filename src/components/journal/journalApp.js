import { Component } from 'react';
import { connect } from 'react-redux';
import React from 'react';
import SidebarComponent from './sidebar/sidebar';
import EditorComponent from './editor/editor';
import TodoApp from '../todo/TodoApp';
import {updateTitle} from '../../redux/journal/journalActions'
import {updateBody} from '../../redux/journal/journalActions'
import {loadNote} from '../../redux/journal/journalActions'
import {noteUpdate} from '../../redux/journal/journalActions'
import {debounce} from 'lodash';
import './journalApp.css'
import M from  'materialize-css/dist/js/materialize.min.js';
const firebase = require('firebase');


class Journal  extends Component{
  constructor() {
    super();
    this.state = {
      selectedNoteIndex: null,
      selectedNote: null,
      notes: null
    };
  }
  componentDidMount = () =>{
      firebase
      .firestore()
      .collection('notes')
      .onSnapshot( serverUpdate =>{
        const notes = serverUpdate.docs.map(_doc =>{
          const data = _doc.data();
          data['id'] = _doc.id
          return data;
        });
    //  this.setState({notes: notes})
      console.log('notes', this.state)


  //
      });


  }


  //TODO: deleteNote, fix selected note 1:43
    deleteNote = async (note) =>{
    const noteIndex = this.state.notes.indexOf(note);
    await this.setState({ notes: this.state.notes.filter(_note => _note !== note) });
    if(this.state.selectedNoteIndex === noteIndex) {
      this.setState({ selectedNoteIndex: null, selectedNote: null });
    } else {
      this.state.notes.length > 1 ?
      this.selectNote(this.state.notes[this.state.selectedNoteIndex - 1], this.state.selectedNoteIndex - 1) :
      this.setState({ selectedNoteIndex: null, selectedNote: null });
    }
    firebase
    .firestore()
    .collection('notes')
    .doc(note.id)
    .delete();
  }
  //newNote
  newNote = async (title) =>{
    const note = {
      title: title,
      body:''
    };
    const newFromDB= await firebase
    .firestore()
    .collection('notes')
    .add({
      title: note.title,
      body: note.body,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    const newID= newFromDB.id;
    await this.setState({ notes: [...this.state.notes, note]});
    const newNoteIndex = this.state.notes.indexOf(this.state.notes.filter(_note => _note.id === newID)[0]);
    this.setState({selectedNote: this.state.notes[newNoteIndex], selectedNoteIndex: newNoteIndex});
  }

  render(){
        const {selectedNoteIndex, selectedNote} = this.props.journals;
        //this.setState({selectedNoteIndex: selectedNoteIndexR})
        //TODO: add TodoApp as a <li>. part of the navbar
        console.log('journals', selectedNoteIndex)
    return(
  <div className='Journal'>
    <div className='row'>
        <div className='col s12 m4 l3'>
          <SidebarComponent />
        </div>
          <br/>
          <br/>
        <div className='col s12 m8 l9'>
          {
            console.log('selected',selectedNote),
            selectedNote ?
            <EditorComponent /> : null
          }
        </div>
      </div>

      </div>)
  }


}
const mapDispatchToProps = dispatch =>{
  return{
    updateTitle: (title) => dispatch(updateTitle(title)),
    updateBody: (body) => dispatch(updateBody(body)),
    loadNote: (title, body, id) => dispatch(loadNote(title, body, id))
    //noteUpdate: (id, obj) => dispatch(noteUpdate(id, obj))
  }
}

const mapStateToProps =(state)=>{
  return{
    journals: state.journal
  }
}
  export default connect(mapStateToProps)(Journal)

  /*class Journal  extends Component{
    constructor() {
      super();
      this.state = {
        selectedNoteIndex: null,
        selectedNote: null,
        notes: null
      };
    }
    componentDidMount = () =>{
        firebase
        .firestore()
        .collection('notes')
        .onSnapshot( serverUpdate =>{
          const notes = serverUpdate.docs.map(_doc =>{
            const data = _doc.data();
            data['id'] = _doc.id
            return data;
          });
          console.log('notes')
          this.setState({notes: notes})
        });
      let sidenav = document.querySelector('#mobile-links');
      M.Sidenav.init(sidenav, {});
    }

    selectNote =(note, index)=>{
      this.setState({selectedNoteIndex: index, selectedNote: note})
    }

    noteUpdate =(id, noteObj) =>{
      firebase
      .firestore()
      .collection('notes')
      .doc(id)
      .update({
        title: noteObj.title,
        body: noteObj.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
    }
    //TODO: deleteNote, fix selected note 1:43
      deleteNote = async (note) =>{
      const noteIndex = this.state.notes.indexOf(note);
      await this.setState({ notes: this.state.notes.filter(_note => _note !== note) });
      if(this.state.selectedNoteIndex === noteIndex) {
        this.setState({ selectedNoteIndex: null, selectedNote: null });
      } else {
        this.state.notes.length > 1 ?
        this.selectNote(this.state.notes[this.state.selectedNoteIndex - 1], this.state.selectedNoteIndex - 1) :
        this.setState({ selectedNoteIndex: null, selectedNote: null });
      }
      firebase
      .firestore()
      .collection('notes')
      .doc(note.id)
      .delete();
    }
    //newNote
    newNote = async (title) =>{
      const note = {
        title: title,
        body:''
      };
      const newFromDB= await firebase
      .firestore()
      .collection('notes')
      .add({
        title: note.title,
        body: note.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
      const newID= newFromDB.id;
      await this.setState({ notes: [...this.state.notes, note]});
      const newNoteIndex = this.state.notes.indexOf(this.state.notes.filter(_note => _note.id === newID)[0]);
      this.setState({selectedNote: this.state.notes[newNoteIndex], selectedNoteIndex: newNoteIndex});
    }

    render(){
          //TODO: add TodoApp as a <li>. part of the navbar
      return(
    <div className='Journal'>
      <nav className='nav-wrapper  deep-purple darken-4'>
       <div className='container'>
         <a href="#" className='brand-logo '>One percent</a>
         <a href="#" className='sidenav-trigger right' data-target='mobile-links'>
            <i className="material-icons">menu</i>
         </a>
        <ul className='right hide-on-med-and-down'>
          <li><a href="#">Home</a></li>
          <li><a href="#">Journal</a></li>
          <li><a href="#">Dash Board</a></li>
          <li><a href="#">contact</a></li>
          <li><a href="#" className='btn-floating deep-purple darken-4 z-depth-0'>
            <i class="large material-icons">account_circle</i>
          </a></li> //TODO: user/login make sure it is an icon when logged in
            //but ehn not it should just say 'Login'
            <li><a href="#" className='btn-floating deep-purple darken-4 z-depth-0'>
              <i class="large material-icons">notifications</i>
            </a></li>
          <li><span className={'badge white-text pink new'}>5</span></li>
        </ul>
       </div>
      </nav>
      <ul className='sidenav white' id='mobile-links'>
        <li><a href="#">Home</a></li>
        <li><a href="#">Journal</a></li>
        <li><a href="#">Dash Board</a></li>
        <li><a href="#">contact</a></li>
        <li><a href="#" className='btn-floating white z-depth-0'>
          <i class="large material-icons">account_circle</i>
        </a></li> {/* TODO: user/login make sure it is an icon when logged in
          but ehn not it should just say 'Login' in the mobile view aswell. fix css
          <li><a href="#" className='btn-floating white z-depth-0'>
            <i class="large material-icons">notifications</i>
          </a></li>
        <li><span className={'badge white-text pink new'}>5</span></li>
      </ul>
      <div className='row'>
          <div className='col s12 m4 l3'>
            <SidebarComponent selectedNoteIndex={this.state.selectedNoteIndex}
            notes={this.state.notes}
            deleteNote={this.deleteNote}
            selectNote={this.selectNote}
            newNote={this.newNote}
            />
          </div>
            <br/>
            <br/>
          <div className='col s12 m8 l9'>
            {
              this.state.selectedNote ?
              <EditorComponent selectedNote={this.state.selectedNote}
              selectedNoteIndex={this.state.selectedNoteIndex}
              notes={this.state.notes}
              noteUpdate={this.noteUpdate}/> : null
            }
          </div>
        </div>

        </div>)
    }


  }
  */
