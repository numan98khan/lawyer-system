import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  TOGGLE_DRAWER,
} from "../actions/types";

// import history from '../components/history';

const initialState = {
  isLoading: false,
  user: null,
  privileges: [],
  isDrawerVisible: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
      };
    case TOGGLE_DRAWER:
      return {
        ...state,
        isDrawerVisible: !state.isDrawerVisible,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      //set user here
      return {
        ...state,
        isLoading: false,
        user: action.payload,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      return {
        ...state,
        user: null,
        isLoading: false,
      };
    default:
      return state;
  }
}
