import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import TextField from "@material-ui/core/TextField";
import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import fire from "../fire";
import { login } from "../actions/userActions";
import { connect } from "react-redux";
import { useState } from "react";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    email: "",
    password: "",
  };

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          // justifyContent: "center",
          alignItems: "center",
          // paddingTop: 10,
          height: "100vh",
          // backgroundColor: "blue",
        }}
      >
        <img src="./logo.jpeg" style={{ height: "30vh", width: "15vw" }}></img>
        <MuiThemeProvider>
          <div
            className="container p-4 d-flex flex-column"
            style={{
              width: "30vw",
              height: "50vh",
              display: "flex",
              justifyContent: "space-around",
              backgroundColor: "#D3D3D3",
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            }}
          >
            <h1>Sign In</h1>
            {/*<TextField
                hintText="Email"
                floatingLabelText="Email"
                value={this.state.email}
                onChange = {(event,newValue) => this.setState({email:newValue})}
              />*/}
            <eiv className="d-flex flex-column justify-content-around h-50">
              <TextField
                id="standard-multiline-flexible"
                label="E-mail"
                // multiline
                rowsMax={4}
                value={this.state.email}
                onChange={this.handleEmailChange}
              />
              {/* <br /> */}
              <TextField
                id="standard-multiline-flexible"
                label="Password"
                // multiline
                type="password"
                rowsMax={4}
                value={this.state.password}
                onChange={this.handlePasswordChange}
                style={{ marginBottom: "5%" }}
              />
            </eiv>

            {/* <br style={{ marginBottom: "5%" }}></br> */}
            <div className="d-flex justify-content-between w-50">
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    this.props.login({
                      email: this.state.email,
                      password: this.state.password,
                    });
                  }}
                >
                  Sign In
                </Button>
              </div>
              <div>
                <Link to="/SignUp">
                  <Button variant="contained" color="primary">
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, { login })(SignIn);
