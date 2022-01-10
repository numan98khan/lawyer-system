import {
  CASES_LOADED,
  CASES_LOADING,
  DELETE_CASE,
  ADD_CASE,
  // FILTER_CASE
} from '../actions/types';
// import history from '../components/history';

const initialState = {
  isLoading: true,
  cases:[],
  files:[]
  // searchTerm:''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CASES_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case CASES_LOADED:
      // console.log(action.payload)
      return {
        isLoading: false,
        files: action.payload.files,
        cases: action.payload.cases
      };
    // case FILTER_CASE:
    //   return {
    //     ...state,
    //     // cases: cases.filter(cases => cases.caseWorker == action.payload)

    //   };
    case DELETE_CASE:
      return {
        ...state,
        // cases: cases.filter(cases => cases.id != action.payload)
        // isLoading: true
      };
    case ADD_CASE:
      return {
        ...state,
        cases: action.payload

        // cases: cases.push(action.payload)
        // isLoading: true
      };
    default:
      return state;
  }
}