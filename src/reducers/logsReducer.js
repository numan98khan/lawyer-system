import {
  LOGS_LOADED,
  LOGS_LOADING,
  ADD_LOG,
  DELETE_LOG
  // FILTER_CASE
} from '../actions/types';
// import history from '../components/history';

const initialState = {
  isLoading: true,
  hearingsLogs:[]
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGS_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case LOGS_LOADED:
      // console.log(action.payload)
      return {
        isLoading: false,
        hearingsLogs: action.payload
      };
    // case FILTER_CASE:
    //   return {
    //     ...state,
    //     // CLIENTS: CLIENTS.filter(CLIENTS => CLIENTS.caseWorker == action.payload)

    //   };
    case DELETE_LOG:
      return {
        ...state,
        // CLIENTS: CLIENTS.filter(CLIENTS => CLIENTS.id != action.payload)
        // isLoading: true
      };
    case ADD_LOG:
      return {
        ...state,
        hearingsLogs: action.payload

        // CLIENTS: CLIENTS.push(action.payload)
        // isLoading: true
      };
    default:
      return state;
  }
}