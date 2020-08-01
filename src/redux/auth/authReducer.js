

const initialState={
  authError: null
}

const authReducer = (state=initialState,action) =>{
  switch(action.type){
    case 'LOGIN_ERROR':
    console.log('login error')
    return {
      ...state,
      authError: 'Login failed'
    }
    case 'LOGIN_SUCCESS':
    console.log('login sucess')
    return {
      ...state,
      authError: null
    }
    default: return state
  }
};

export default authReducer
