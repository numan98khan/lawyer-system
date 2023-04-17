import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';


import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


// import { Provider } from "react-redux";
// import configureStore from "./configureStore";
// e754e4
// const store = configureStore();
// Or Create your Own theme:
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#18ab1b'
    },
    secondary: {
      main: '#e754e4'
    }
  }
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
      </Router>
      </MuiThemeProvider>
  ,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
