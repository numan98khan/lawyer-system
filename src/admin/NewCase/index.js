import React, { Component, useState } from "react";
import { ProductConsumer } from "../../context";
import Button from "../../components/Button";
import {Link} from 'react-router-dom'


let styles = {

  content: {
    backgroundColor: 'white',
    width: '400px',
    height: 'auto',
    color:'black',
    alignItems:'center',
    padding:'13px',
    borderStyle:'solid',
    borderWidth:'2px',
    borderColor:'var(--mainPurple)'
  },
  container: {
      color:'white',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'space-evenly',
      width: '1000px',
  },
  newMatter:  {
      textAlign:'center',
      justifyContent:'center',
      height:'100%'
  },
  newClient:  {
      textAlign:'center',
      justifyContent:'center',
      height:'100%'
  }
}

function Box(props) {

  return (
      <div style={styles.content}>
          {props.content}
      </div>
  )
}

class NewCase extends Component {
  
    state={
        expanded: false
    }

    render() {
    const newClient = (
      <div style={styles.newClient}>
        <p>If you want to add a new client....</p>
      <Link to="/addclient"><Button variant="contained" color="primary">Add client</Button></Link>
      </div>
    )
    const newMatter = (
      <div style={styles.newMatter}>
          <p>Make case for existing client</p>
          <Link to="/casedetails"><Button variant="contained" color="primary">case details</Button></Link>
      </div>
    )

    return (
      <ProductConsumer>
        {value => {
          return (
            <div className="App-screen">
                <div style={styles.container}>
                <Box content={newClient}></Box>
                <Box content={newMatter}></Box>
                
                <ProductConsumer>
                    {value => {
                        // location.state.PaymentOptions = payload;
                        return (<div style={styles.newClient}>
                          <p>If you want to add a new client....</p>
                          <Button onClick={()=>{
                                  value.addClientUser('num@gmail.com');
                              }}
                          variant="contained" color="primary">Add User</Button>
                        </div>)
                
                    }}  
                </ProductConsumer>

                  
                </div>
            </div>
          );
        }}
      </ProductConsumer>
    );
  }
}
export default NewCase;




// <Paper elevation={3} >
                
//                     {/*<img src={img} className="img-fluid" alt="product" />*/}
//                 </Paper>