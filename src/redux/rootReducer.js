import { combineReducers } from 'redux';
import visibilityFilterReducer from './todo/visibilityFilterReducer'
import todos from './todo/todosReducer'
import authReducer from './auth/authReducer';
import journalReducer from './journal/journalReducer';
import { firestoreReducer } from 'redux-firestore'; //for syncing with firestore

const rootReducer = combineReducers({
  todos: todos,
  visibility: visibilityFilterReducer,
  auth: authReducer,
  journal: journalReducer,
  firestore: firestoreReducer
});

export default rootReducer;
