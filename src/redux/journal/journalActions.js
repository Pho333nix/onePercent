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
