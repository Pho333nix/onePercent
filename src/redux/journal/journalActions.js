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
export const selectNote = (id, n) =>({
  type: 'SELECT_NOTE',
  payload: {id, n}
});

export const loadNotes = (notes) =>(
  {
        type: 'LOAD_NOTES',
          payload: notes
      })
