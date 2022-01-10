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
    console.log("user loading");
    dispatch({ type: USER_LOADING });
    //set user
    // var data_ = null;
    fire.getFire().auth().onAuthStateChanged(function(user) {
        
          var data_ = null;
          if (user) {
            //get user from users table and set type property in user
            fire.getFire().database().ref('/')
              .child('users/'+user.uid)
              // .orderByChild('')
              // .equalTo(uid)
              .once("value", function(snapshot) {
                const userData = snapshot.val()
        
                // Loading needs to wait for type to get filled
                user.type = userData.type;
                // console.log(userData.type);
                // data_ = {user: user, type_:userData.type}
        
            }).then(()=>{
              dispatch({
                type: USER_LOADED,
                payload: user
            })
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