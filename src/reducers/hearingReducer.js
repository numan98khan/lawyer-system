import {
  HEARINGS_LOADED,
  HEARINGS_LOADING,
  ADD_HEARING,
  DELETE_HEARING
  // FILTER_CASE
} from '../actions/types';
// import history from '../components/history';

const initialState = {
  isLoading: true,
  hearings:[]
};

export default function(state = initialState, action) {
  switch (action.type) {
    case HEARINGS_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case HEARINGS_LOADED:
      // console.log(action.payload)
      return {
        isLoading: false,
        hearings: action.payload
      };
    // case FILTER_CASE:
    //   return {
    //     ...state,
    //     // CLIENTS: CLIENTS.filter(CLIENTS => CLIENTS.caseWorker == action.payload)

    //   };
    case DELETE_HEARING:
      return {
        ...state,
        // CLIENTS: CLIENTS.filter(CLIENTS => CLIENTS.id != action.payload)
        // isLoading: true
      };
    case ADD_HEARING:
      return {
        ...state,
        hearings: action.payload

        // CLIENTS: CLIENTS.push(action.payload)
        // isLoading: true
      };
    default:
      return state;
  }
}