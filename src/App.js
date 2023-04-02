import { Switch, Route, withRouter } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./App.css";
import { navbarTitleKeyValueMap } from "./admin/NewCase/lists";
import "bootstrap/dist/css/bootstrap.min.css";
import store from "./store";
import { loadUser } from "./actions/userActions";
import { loadClients } from "./actions/clientActions";
import { loadCase } from "./actions/caseActions";
import { loadCaseWorkers, loadWorkers } from "./actions/caseWorkersActions";

import { connect } from "react-redux";
import AuthNav from "./navigation/AuthNav";
import ClientDrawer from "./navigation/ClientDrawer";
import Navbar from "./navigation/Navbar";
import AdminDrawer from "./navigation/AdminDrawer";
import WorkerDrawer from "./navigation/WorkerDrawer";

import ClientNav from "./navigation/ClientNav";
import AdminNav from "./navigation/AdminNav";
import WorkerNav from "./navigation/WorkerNav";

function App({ user }) {
  const [route, setRoute] = useState("");

  useEffect(() => {
    console.log("App.js mounting");
    store.dispatch(loadUser());
    store.dispatch(loadClients());
    store.dispatch(loadCase());
    store.dispatch(loadCaseWorkers());

    //// TODO: CHECK WHY ADDING THIS BREAKS CODE
    store.dispatch(loadWorkers());
  }, []);

  useEffect(() => {
    let url = window.location.href.split("localhost:3000");
    let route = url.pop();
    if (route !== setRoute) {
      setRoute(route);
    }
  }, [window.location.href]);

  const isLoading = user.isLoading;
  const userType = user.user?.type;

  const renderNavigation = () => {
    if (isLoading) {
      return <div className="d-flex loader"></div>;
    } else if (!user.user) {
      return <AuthNav />;
    } else if (userType === "admin") {
      return <AdminNav />;
    } else if (userType === "worker") {
      return <WorkerNav />;
    } else if (userType === "client") {
      return <ClientNav />;
    } else {
      return null;
    }
  };

  const renderDrawer = () => {
    if (isLoading || !user.user) {
      return null;
    } else if (userType === "admin") {
      return <AdminDrawer />;
    } else if (userType === "worker") {
      return <WorkerDrawer />;
    } else if (userType === "client") {
      return <ClientDrawer />;
    } else {
      return null;
    }
  };

  return (
    <div 
    // className="d-flex flex-column"
    >
      {user.user && !isLoading && (
        <Navbar title={navbarTitleKeyValueMap[route]} />
      )}
      {renderNavigation()}
      {renderDrawer()}
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const WithRouterApp = withRouter(App);
export default connect(mapStateToProps, {})(WithRouterApp);
