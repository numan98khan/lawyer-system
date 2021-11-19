import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import Button from '@material-ui/core/Button';
import fire from '../fire'
import {Link} from "react-router-dom"
import { ProductConsumer } from "../contexts/context.js";
import {useState} from 'react'

import FileUploader from "react-firebase-file-uploader";

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
// import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

import CardActionArea from '@material-ui/core/CardActionArea';

// import uploadPlaceholder from  '../../assets/upload.png'

class SignUp extends React.Component {
constructor(props){
  super(props);
 }
 state={
    email:'',
    password:'',
    passRep:'',
    displayName:'',
    itemImage:''
    }

    handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
    handleProgress = progress => this.setState({ progress });
    handleUploadError = error => {
      this.setState({ isUploading: false });
      console.error(error);
    };
    handleUploadSuccess = filename => {
      console.log('filename ', filename)
      this.setState({ avatar: filename, progress: 100, isUploading: false });
      
  
      
      this.setState({ itemImage: filename  })
  
      var storageRef = fire.getFire()
        .storage()
        .ref("images/users/")
        .child(filename)
  
      storageRef
        .getDownloadURL()
        .then(url => this.setState({ itemImage: url }));
  
  
      // console.log()
  
        // .getDownloadURL()
        // .then(url => this.setState({ itemImage: url }));
    };

    handleEmailChange = (event) => {
      this.setState({email: event.target.value});
    };

    handleDispChange = (event) => {
      this.setState({displayName: event.target.value});
    };

    handlePassChange = (event) => {
      this.setState({password: event.target.value});
    };

    handlePassRepChange = (event) => {
      this.setState({passRep: event.target.value});
    };

render() {
    return (
      <div style={{display:'flex', justifyContent:'center', alignItems:'center', paddingTop:230}}>
        <MuiThemeProvider>
          <div 
          style={{
              position: 'absolute', left: '50%', top: '50%',
              transform: 'translate(-50%, -50%)'
          }}
          //className="container py-5"
          >
          <h1>Sign Up</h1>

          <Card style={{
            marginBottom: '5%',
            maxWidth: '100%',
          }}>
      
            {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
            {this.state.avatarURL && <img src={this.state.avatarURL} />}
            <FileUploader
              accept="image/*"
              name="avatar"
              randomizeFilename
              storageRef={fire.getFire().storage().ref("images/users/")}
              onUploadStart={this.handleUploadStart}
              onUploadError={this.handleUploadError}
              onUploadSuccess={this.handleUploadSuccess}
              onProgress={this.handleProgress}
            />
            <CardActionArea 
              // onClick={() => this.uploadImage}
            >
              <CardMedia
                style={{height: 0,
                  paddingTop: '56.25%', // 16:9
                  // height: 140,
                }}
              //   className={classes.media}
                // image={this.state.itemImage ? this.state.itemImage : uploadPlaceholder}
                title="Contemplative Reptile"
              />
            </CardActionArea>
          
          </Card>

          <TextField
            //  hintText="Display Name"
            //  floatingLabelText=" Display Name"
             id="standard-multiline-flexible"
            label="Display Name"
             value={this.state.displayName}
             onChange={this.handleDispChange}
             />
           <br/>
          <TextField
            //  hintText="Email"
            //  floatingLabelText="Email"
            id="standard-multiline-flexible"
            label="E-mail"
             value={this.state.email}
             onChange={this.handleEmailChange}
             />
           <br/>
           
             <TextField
                id="standard-multiline-flexible"
                label="Password"
                type="password"
              //  hintText="Password"
              //  floatingLabelText="Password"
               value={this.state.password}
               onChange={this.handlePassChange}
               //  style={{ marginBottom: '5%' }}
               />
               <br/>
               <TextField
                id="standard-multiline-flexible"
                label="Re-Type Password"
                type="password"
              //  hintText="Password"
              //  floatingLabelText="Password"
               value={this.state.passRep}
               onChange={this.handlePassRepChange}
               style={{ marginBottom: '5%' }}
               />

            <br></br>
            <ProductConsumer>
            {value => {
              var isDisabled = true;
              if (this.state.itemImage !== '' && this.state.password !== '' && this.state.email !== '' && this.state.displayName !== ''){
                if (this.state.password === this.state.passRep) {
                  isDisabled = false;
                }
              } 

              // console.log(isDisabled)
              // console.log('bih ', this.state.email, this.state.displayName, this.state.password)
              return (<div><div><Button disabled={isDisabled} variant="contained" color="primary" onClick={()=>{value.signUp(this.state.email,this.state.displayName,this.state.password, this.state.itemImage)}}>
              Sign Up
             </Button></div>
             <div style={{paddingTop:"15px"}}><Link to="/"><Button variant="contained" color="primary">
             Sign In
            </Button></Link></div></div>
             )
            }}
          </ProductConsumer>
         </div>
         </MuiThemeProvider>
      </div>
    );
  }
}

export default SignUp;