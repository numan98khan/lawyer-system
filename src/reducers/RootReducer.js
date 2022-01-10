import { combineReducers } from 'redux';
// import msgReducer from './msgReducer';
// import authReducer from './authReducer';
// import plotReducer from './plotReducer';
// import bidReducer from './bidReducer';
// import messagesReducer from './messagesReducer';
// import socketReducer from './socketReducer';
// import notificationReducer from './notificationsReducer';
import userReducer from './userReducer';
import caseReducer from './caseReducer';

export default combineReducers({
//   msg: msgReducer,
//   auth: authReducer,
//   plot: plotReducer,
//   bid: bidReducer,
//   message: messagesReducer,
//   socket: socketReducer,
//   notification: notificationReducer,
  user: userReducer,
  cases: caseReducer
});