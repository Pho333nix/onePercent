export const createNewNote = (note) =>{
  return (dispatch, getState, { getFirebase, getFirestore })=>{
    // TODO: make async call to db
    const firestore = getFirestore();
    firestore.collection('notes').add({
      ...note,
      authFirstName: 'Phoenix',
      authLastName: 'Rising',
      authId: 1234,
      createdAt: new Date()
    }).then(() =>{
      dispatch({type: 'ADD_NOTE', note: note});

    }).catch((error) =>{
      dispatch({ type: 'ADD_NOTE_ERROR', error})
    })
  }
};

export const selectNote = (id, n) =>({
  type: 'SELECT_NOTE',
  payload: {id, n}
});

export const updateTitle = (title) =>(
  {
        type: 'UPDATE_TITLE',
          payload: title
});
export const updateBody = (body) =>(
  {
        type: 'UPDATE_BODY',
          payload: body
});

export const loadNote = (qtitle, qbody, quillid) =>({
  type: 'LOAD_NOTE',
  payload: {qtitle, qbody, quillid}
})


export const noteUpdate = (id, noteObj) =>{
  console.log('whhy', id, noteObj)
  return(dispatch, getState,{ getFirebase, getFirestore })=>{
    const firestore = getFirestore();

    firestore.collection('notes')
    .doc(id)
    .update({
      title: noteObj.title,
      body: noteObj.body,
      timestamp: new Date()
    }).then(()=>{
      dispatch({type: 'UPDATE_SUCESS'})
    }).catch((error)=>{
      dispatch({type: 'LOGIN_ERROR', error})
    })
  }
}
      /*
      //TODO: deleteNote, fix selected note 1:43
      export  deleteNote = (note) =>{
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
      */
