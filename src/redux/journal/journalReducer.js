
const initialState={
  notes: null,
  selectedNoteIndex: null,
  selectedNote: null,
  title: '',
  body: '',
  id: ''
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
      case 'UPDATE_TITLE':
      const {title} = action.payload
      return{
        ...state,
        title: title
      }
      case 'UPDATE_BODY':
      const {body} = action.payload
      return{
        ...state,
        body: body
      }
      case 'LOAD_NOTE':
      const {qtitle, qbody, quillid} = action.payload
       return{
         ...state,
         title: qtitle,
         body: qbody,
         id: quillid

       }
       case 'UPDATE_SUCCESS':
       console.log('update SUCCESS')
       return state;
       case 'UPDATE_ERROR':
       console.log('update error;')
       return state;

    default:
      return state
  }
}

export default journalReducer
