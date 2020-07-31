
const initialState={
  journals: [
   {id: '1', title: 'help me find peach', content: 'blah blah blah'},
   {id: '2', title: 'collect all the stars', content: 'blah blah blah'},
   {id: '3', title: 'egg hunt with yoshi', content: 'blah blah blah'}
 ]
}

const journalReducer = (state=initialState,action) =>{
  switch (action.type){
    case 'ADD_NOTE':
      console.log('adding note', action.note)
      return state;
    case 'ADD_NOTE_ERROR':
     console.log('adding note error', action.error)
     return state;
    default:
      return state
  }
}

export default journalReducer
