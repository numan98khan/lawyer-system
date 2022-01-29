import { Switch, Route, withRouter } from "react-router-dom";
import React, { Component, Fragment } from "react";
import "./App.css";
import { navbarTitleKeyValueMap } from "./admin/NewCase/lists";
import "bootstrap/dist/css/bootstrap.min.css";
import store from "./store";
import { loadUser } from "./actions/userActions";
import { loadClients } from "./actions/clientActions";
import { loadCase } from "./actions/caseActions";
import { loadCaseWorkers } from "./actions/caseWorkersActions";

import { connect } from "react-redux";
import AuthNav from "./navigation/AuthNav";
import ClientDrawer from "./navigation/ClientDrawer";
import Navbar from "./navigation/Navbar";
import AdminDrawer from "./navigation/AdminDrawer";
import WorkerDrawer from "./navigation/WorkerDrawer";

import ClientNav from "./navigation/ClientNav";
import AdminNav from "./navigation/AdminNav";
import WorkerNav from "./navigation/WorkerNav";

// import Tracker from "./admin/Tracker";

// class App extends Component {
//   render() {
//     // const { isAuthenticated, isVerifying } = this.props;
//     // // console.log("isAuthenticated +++ " + isAuthenticated)
//     return (
//       <Tracker/>
//     );
//   }
// }

class App extends Component {
  state = {
    route: "",
  };
  componentDidMount() {
    console.log("App.js mounting");
    store.dispatch(loadUser());
    store.dispatch(loadClients());
    store.dispatch(loadCase());
    store.dispatch(loadCaseWorkers());
  }
  componentDidUpdate() {
    let url = window.location.href.split("localhost:3000");
    let route = url.pop();
    if (route !== this.state.route) {
      this.setState({
        route: route,
      });
    }
  }

  render() {
    // const { isAuthenticated, isVerifying } = this.props;

    return (
      <div className="d-flex flex-column">
        {this.props.user.user && this.props.user.isLoading === false ? (
          <Navbar title={navbarTitleKeyValueMap[this.state.route]} />
        ) : null}
        {this.props.user.isLoading === true ? (
          <div className="d-flex loader"></div>
        ) : this.props.user.user && this.props.user.isLoading === false ? (
          this.props.user.user.type === "admin" ? (
            <AdminNav />
          ) : this.props.user.user.type === "worker" ? (
            <WorkerNav />
          ) : this.props.user.user.type === "client" ? (
            <ClientNav />
          ) : // <ClientDrawer/>
          null
        ) : (
          // console.log(this.props.user.user.type )
          //auth nav here
          <AuthNav />
        )}

        {this.props.user.user && this.props.user.isLoading === false ? (
          this.props.user.user.type === "admin" ? (
            <AdminDrawer />
          ) : this.props.user.user.type === "worker" ? (
            <WorkerDrawer />
          ) : this.props.user.user.type === "client" ? (
            <ClientDrawer />
          ) : // <ClientDrawer/>
          null
        ) : null}

        {/* {this.props.user.user && this.props.user.isLoading === false ? (
          this.props.user.user.type === "admin" ? (
            <AdminNav />
          ) : this.props.user.user.type === "worker" ? (
            <WorkerNav />
          ) : this.props.user.user.type === "client" ? (
            <ClientNav />
          ) : // <ClientDrawer/>
          null
          // console.log(this.props.user.user.type )
        ) : (
          //auth nav here
          <AuthNav />
        )} */}
        {/* </MapConsumer> */}
        {/* <Modal /> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  type: state.type,
  // caseWorkers
});
const WithRouterApp = withRouter(App);
export default connect(mapStateToProps, {})(WithRouterApp);
