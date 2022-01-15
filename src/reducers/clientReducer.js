import {
  CLIENTS_LOADED,
  CLIENTS_LOADING,
  DELETE_CLIENT,
  ADD_CLIENT,
  // FILTER_CASE
} from '../actions/types';
// import history from '../components/history';

const initialState = {
  isLoading: true,
  clients:[]
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CLIENTS_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case CLIENTS_LOADED:
      // console.log(action.payload)
      return {
        isLoading: false,
        clients: action.payload
      };
    // case FILTER_CASE:
    //   return {
    //     ...state,
    //     // CLIENTS: CLIENTS.filter(CLIENTS => CLIENTS.caseWorker == action.payload)

    //   };
    case DELETE_CLIENT:
      return {
        ...state,
        // CLIENTS: CLIENTS.filter(CLIENTS => CLIENTS.id != action.payload)
        // isLoading: true
      };
    case ADD_CLIENT:
      return {
        ...state,
        clients: action.payload

        // CLIENTS: CLIENTS.push(action.payload)
        // isLoading: true
      };
    default:
      return state;
  }
}