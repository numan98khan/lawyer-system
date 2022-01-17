import {
  CASEWORKERS_LOADED,
  CASEWORKERS_LOADING,
  ADD_CASEWORKER,
  DELETE_CASEWORKER
  // FILTER_CASE
} from '../actions/types';
// import history from '../components/history';

const initialState = {
  isLoading: false,
  caseWorkers:[]
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CASEWORKERS_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case CASEWORKERS_LOADED:
      // console.log(action.payload)
      return {
        isLoading: false,
        caseWorkers: action.payload
      };
    // case FILTER_CASE:
    //   return {
    //     ...state,
    //     // CLIENTS: CLIENTS.filter(CLIENTS => CLIENTS.caseWorker == action.payload)

    //   };
    case DELETE_CASEWORKER:
      return {
        ...state,
        // CLIENTS: CLIENTS.filter(CLIENTS => CLIENTS.id != action.payload)
        // isLoading: true
      };
    case ADD_CASEWORKER:
      return {
        ...state,
        caseWorkers: action.payload

        // CLIENTS: CLIENTS.push(action.payload)
        // isLoading: true
      };
    default:
      return state;
  }
}