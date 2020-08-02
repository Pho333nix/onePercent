export const signIn = (data) =>{
  return(dispatch, getState, {getFirebase})=>{
    const firebase = getFirebase();

    firebase.auth().signInWithEmailAndPassword(
      data.email,
      data.password
    ).then(()=>{
      dispatch({type: 'LOGIN_SUCCESS'})
    }).catch((error)=>{
      dispatch({type: 'LOGIN_ERROR', error})
    })
  }
}

export const signOut = () => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();

    firebase.auth().signOut().then(() => {
      dispatch({ type: 'SIGNOUT_SUCCESS' })
    }).catch((error)=>{
      console.log('erooooorrr')
      dispatch({type: 'LOGOUT_ERROR', error})
    });
  }
}
