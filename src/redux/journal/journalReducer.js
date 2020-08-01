
const initialState={
  notes: null,
  selectedNoteIndex: null,
  selectedNote: null
}

const journalReducer = (state=initialState,action) =>{
  switch (action.type){
    case 'ADD_NOTE':
      console.log('adding note', action.note)
      return state;
    case 'ADD_NOTE_ERROR':
     console.log('adding note error', action.error)
     return state;
     case 'SELECT_NOTE':
     const {id, n} = action.payload
      return{
        ...state,
        selectedNoteIndex: id,
        selectedNote: n,

      }
      case 'LOAD_NOTES':
      const {notes} = action.payload
      return{
        ...state,
        notes: notes
      }
    default:
      return state
  }
}

export default journalReducer
