// import axios from 'axios';
// import { returnMsg } from './msgActions';
// import history from '../components/history';
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from './types';
import fire from  '../fire';


export const loadUser = () => (dispatch, getState) => {
    // User loading
    dispatch({ type: USER_LOADING });
    //set user
    fire.getFire().auth().onAuthStateChanged(function(user) {
        if (user) {
            //get user from users table and set type property in user
            fire.getFire().database().ref('/')
              .child('users/'+user.uid)
              // .orderByChild('')
              // .equalTo(uid)
              .once("value", function(snapshot) {
                const userData = snapshot.val()
        
                user.type = userData.type;
        
            })
            dispatch({
                type: USER_LOADED,
                payload: user
            })
        };
        // else {}
})
}


  // Register User
export const register = (user) => (
    dispatch
  ) => {
    
  };

  // Login User
export const login = ({ email, password }) => (
  dispatch
) => {
  
};
  // Login Admin
export const loginAdmin = ({ email, password }) => (
  dispatch
) => {
  
};

// Logout User
export const logout = () => (dispatch, getState) => {
  dispatch({
    type: LOGOUT_SUCCESS,
  })
};