import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from "react-router-dom";
import { ProductProvider } from "./contexts/context.js";
import { Provider } from 'react-redux';
import store from './store';
// import { MapProvider } from "./contexts/mapContext.js";


// import { Provider } from "react-redux";
// import configureStore from "./configureStore";

// const store = configureStore();


ReactDOM.render(
  // <MapProvider>
    <ProductProvider>
      <Router>
      <Provider store={store}>
        <App />
      </Provider>
      </Router>
    </ProductProvider>
    // </MapProvider>
  ,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
