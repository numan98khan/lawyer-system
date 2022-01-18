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
          if (user) {
            console.log(user)
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
        }
        else {
          dispatch({
            type: LOGIN_FAIL
        })
        }
})
}


  // Register User
export const register = (user) => (
    dispatch
  ) => {
    
  };

const getUserData = (uid) => {
    return new Promise(async (resolve, reject)=>{
      var fb=fire.getFire();
      // var userData=[];
      fb.database().ref('/')
        .child('users/'+uid)
        // .orderByChild('')
        // .equalTo(uid)
        .once("value", function(snapshot) {
          const userData = snapshot.val()
          
          return resolve(userData)
      });
    })
 
  };
  // Login User
export const login = ({ email, password }) => (
  dispatch
) => {
  dispatch({ type: USER_LOADING });
  fire.getFire().auth().signInWithEmailAndPassword(email, password).then(
    (user)=> {
      if (user) {
        console.log("USER +> " + user.user.uid)
        getUserData(user.user.uid).then((userobj=>{
          user['type'] = userobj.type
          user['displayName'] = userobj.displayName
        }));
      //   dispatch({
      //     type: LOGIN_SUCCESS,
      //     payload: user
      // })

      } else {
        // No user is signed in.
        dispatch({
          type: LOGIN_FAIL
      })
      }
    });
  
};
  // Login Admin
export const loginAdmin = ({ email, password }) => (
  dispatch
) => {
  
};

// Logout User
export const logout = () => (dispatch, getState) => {
  return new Promise((res, rej) => {
    fire.getFire().auth().signOut().then(()=>{
      dispatch({
        type: LOGOUT_SUCCESS,
      })
  
      res()
    }).
    catch(()=>{
      console.log("error logging out")
    })
  })
};