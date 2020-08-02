import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './redux/store.js';
import { Provider } from 'react-redux';
import 'materialize-css/dist/css/materialize.min.css';
import {createFirestoreInstance, reduxFirestore, getFirestore } from 'redux-firestore'
import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase';
import firebase from 'firebase/app';
import fbConfig from './fbConfig';
import { useSelector  } from 'react-redux'
import { isLoaded  } from 'react-redux-firebase';
import './App.css'

const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true,
    enableClaims: true
  }
const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance,
    userProfile: 'users', // where profiles are stored in database
    presence: 'presence', // where list of online users is stored in database
    sessions: 'sessions'
}

function AuthIsLoaded({ children }) {
    const auth = useSelector(state => state.firebase.auth)
    if (!isLoaded(auth)) return <div>Loading Screen...</div>;
        return children
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
       <ReactReduxFirebaseProvider {...rrfProps}>
          <AuthIsLoaded>
           <App />
          </AuthIsLoaded>
      </ReactReduxFirebaseProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
