import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button';
import fire from '../fire'
import {login} from "../actions/userActions";
import { connect } from 'react-redux';
import { ProductConsumer } from "../contexts/context.js";
import {useState} from 'react'

class SignIn extends React.Component {
constructor(props){
  super(props);
 }
    state={
      email:'',
      password:''
    }

    handleEmailChange = (event) => {
      this.setState({email: event.target.value});
    };

    handlePasswordChange = (event) => {
      this.setState({password: event.target.value});
    };

render() {
    return (
      <div style={{display:'flex', justifyContent:'center', alignItems:'center', paddingTop:230}}>
        <MuiThemeProvider>
          <div>
          <h1>Sign In</h1>
              {/*<TextField
                hintText="Email"
                floatingLabelText="Email"
                value={this.state.email}
                onChange = {(event,newValue) => this.setState({email:newValue})}
              />*/}

            <TextField
              id="standard-multiline-flexible"
              label="E-mail"
              // multiline
              rowsMax={4}
              value={this.state.email}
              onChange={this.handleEmailChange}
            />
           <br/>
            <TextField
              id="standard-multiline-flexible"
              label="Password"
              // multiline
              type='password'
              rowsMax={4}
              value={this.state.password}
              onChange={this.handlePasswordChange}
              style={{marginBottom: '5%'}}
            />
            <br style={{marginBottom: '5%'}}></br>
            <div><div><Button variant="contained" color="primary" onClick={()=>{
              this.props.login({
                email: this.state.email,
                password: this.state.password
              })
            }}>
              Sign In
             </Button></div>
             <div style={{paddingTop:"15px"}}><Link to="/SignUp"><Button variant="contained" color="primary">
             Sign Up
            </Button></Link></div></div>
            
         </div>
         </MuiThemeProvider>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({

});
export default connect(mapStateToProps, { login })(
  SignIn
);