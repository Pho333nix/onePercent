import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './rootReducer';
import thunk from 'redux-thunk';
import { getFirestore, reduxFirestore } from 'redux-firestore';
import { getFirebase, reactReduxFirebase } from 'react-redux-firebase';
import fbConfig from '../fbConfig'
import firebase from "../fbConfig";
import { composeWithDevTools } from 'redux-devtools-extension';


const store = createStore(rootReducer,
  compose(
    composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
    reduxFirestore(firebase, fbConfig))
  )
);
export default store;
