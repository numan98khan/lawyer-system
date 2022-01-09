import {
    ADMIN_PLOTS_LOADING,
    ADMIN_PLOTS_LOADED
  } from '../actions/types';
//   import history from '../components/history';

  const initialState = {
    plots:[],
    isLoading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case ADMIN_PLOTS_LOADING:
        return {
          ...state,
          isLoading: true
        };
      case ADMIN_PLOTS_LOADED:
        return {
          plots: action.payload,
          isLoading: false
        };
      default:
        return state;
    }
  }