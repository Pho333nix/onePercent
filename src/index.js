import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './redux/store.js';
import { Provider } from 'react-redux';
import 'materialize-css/dist/css/materialize.min.css';
import {createFirestoreInstance, reduxFirestore, getFirestore } from 'redux-firestore'
import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase';
import firebase from 'firebase/app'

import './App.css'

const rrfConfig = {
    userProfile: 'users',
  }
const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance,
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
       <ReactReduxFirebaseProvider {...rrfProps}>
      <App />
      </ReactReduxFirebaseProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA